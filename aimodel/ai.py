import torch
from transformers import AutoTokenizer, AutoModelForCausalLM
from flask import Flask, request, jsonify
import logging
import time
import traceback
import gc
import os
import hashlib
import json
import subprocess
import sys
import gdown

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger('complete_model')

app = Flask(__name__)

# For storing the model verification hash
model_hash = None
model_info = {}
latest_ra_data = None

def get_ra_data(custom_data):
    """
    Call the Node script with custom data and return the RA report.
    """
    try:
        result = subprocess.run(
            ["node", "generate_ra.js", custom_data],
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            check=True,
            text=True
        )
        ra_report = json.loads(result.stdout)
        return {"ra_report": ra_report, "custom_data_used": custom_data}
    except subprocess.CalledProcessError as e:
        return {"error": "Error generating RA report", "details": e.stderr}
    except json.JSONDecodeError as je:
        return {"error": "Invalid JSON returned from Node script", "details": str(je)}

def generate_model_hash(model):
    """Generate a SHA-256 hash of model parameters and architecture"""
    logger.info("Generating model verification hash...")
    
    # Get model architecture info
    model_arch = {
        "model_type": model.config.model_type,
        "hidden_size": model.config.hidden_size,
        "num_attention_heads": model.config.num_attention_heads,
        "num_hidden_layers": model.config.num_hidden_layers,
        "vocab_size": model.config.vocab_size
    }
    
    # Get a sample of model weights (first layer weights)
    param_sample = None
    for name, param in model.named_parameters():
        if 'layers.0' in name and param_sample is None:
            param_sample = param.data.flatten()[:1000].cpu().numpy().tolist()
            break
    
    # Combine architecture and weights sample
    hash_data = {
        "architecture": model_arch,
        "parameters_sample": param_sample,
        "model_name": "TinyLlama-1.1B-Chat-v1.0",
        "total_layers": len(model.model.layers),
        "node": "complete"
    }
    
    # Convert to JSON string and hash with SHA-256
    hash_str = json.dumps(hash_data, sort_keys=True)
    hash_result = hashlib.sha256(hash_str.encode()).hexdigest()
    
    return hash_result, hash_data

def download_model_from_gdrive():
    """Download model files from Google Drive"""
    logger.info("Downloading model files from Google Drive")
    
    model_dir = "./models/tinyllama-1b"  # Changed to relative path
    os.makedirs(model_dir, exist_ok=True)
    
    try:
        import gdown
    except ImportError:
        logger.info("Installing gdown for Google Drive downloads...")
        subprocess.check_call([sys.executable, "-m", "pip", "install", "gdown"])
        import gdown
    
    success = True
    try:
        logger.info(f"Downloading entire model folder from Google Drive...")
        gdown.download_folder(
            id="1TRSdk2Z6UnhhDtdvhCDHuWB3RIYVtK3m",
            output=model_dir,
            quiet=False
        )
        logger.info("Model folder download complete")
    except Exception as e:
        logger.error(f"Failed to download model folder: {str(e)}")
        success = False
    
    return success

# Initialize model
logger.info("Initializing Complete TinyLlama Model...")
model_name = "./models/tinyllama-1b"  # Changed to relative path

# Try to download model files first
if not download_model_from_gdrive():
    logger.error("Failed to download model files. Trying to use local files if available.")

try:
    logger.info("Loading tokenizer from local directory...")
    tokenizer = AutoTokenizer.from_pretrained(model_name, local_files_only=True)
    logger.info("Tokenizer loaded successfully")
    
    # Force garbage collection
    gc.collect()
    if torch.cuda.is_available():
        torch.cuda.empty_cache()
    
    logger.info("Loading complete model from local directory...")
    model = AutoModelForCausalLM.from_pretrained(
        model_name,
        torch_dtype=torch.float16,
        device_map="auto",  # Automatically distribute across available devices
        low_cpu_mem_usage=True,
        local_files_only=True
    )
    logger.info("Complete model loaded successfully")
    
    # Generate and store model hash
    model_hash, model_info = generate_model_hash(model)
    logger.info(f"Model verification hash: {model_hash}")
    
    # Log model information
    total_layers = len(model.model.layers)
    logger.info(f"Model has {total_layers} total layers")
    
    if torch.cuda.is_available():
        memory_allocated = torch.cuda.memory_allocated() / (1024 ** 3)
        logger.info(f"Model loaded. GPU Memory used: {memory_allocated:.2f} GB")
    
except Exception as e:
    logger.error(f"Error loading model: {str(e)}")
    logger.error(traceback.format_exc())
    raise  # This will cause the container to exit on model load failure

@app.route('/verify', methods=['GET'])
def verify_model():
    """Endpoint to verify the model's identity and integrity"""
    if model_hash:
        response = {
            "model_hash": model_hash,
            "model_info": {
                "total_layers": len(model.model.layers),
                "model_type": "TinyLlama-1.1B-Chat-v1.0 (Complete Model)"
            }
        }
        return jsonify(response)
    else:
        return jsonify({"error": "Model hash not available", "status": "error"}), 500

@app.route('/generate', methods=['POST'])
def generate():
    """Generate text completion using the complete model"""
    try:
        data = request.get_json()
        prompt = data.get("prompt", "")
        max_new_tokens = data.get("max_new_tokens", 128)
        temperature = data.get("temperature", 0.7)
        top_p = data.get("top_p", 0.9)
        do_sample = data.get("do_sample", True)
        
        logger.info(f"Processing prompt: {prompt[:50]}..." if len(prompt) > 50 else f"Processing prompt: {prompt}")
        start_time = time.time()
        
        # Format prompt with chat template
        chat_prompt = tokenizer.apply_chat_template([{"role": "user", "content": prompt}], tokenize=False)
        
        # Tokenize the input
        input_ids = tokenizer.encode(chat_prompt, return_tensors="pt")
        
        # Move to the same device as the model
        if hasattr(model, 'device'):
            input_ids = input_ids.to(model.device)
        elif torch.cuda.is_available():
            input_ids = input_ids.to("cuda")
        
        logger.info(f"Input shape: {input_ids.shape}")
        
        with torch.no_grad():
            # Generate response
            outputs = model.generate(
                input_ids,
                max_new_tokens=max_new_tokens,
                temperature=temperature,
                top_p=top_p,
                do_sample=do_sample,
                pad_token_id=tokenizer.eos_token_id,
                eos_token_id=tokenizer.eos_token_id,
                repetition_penalty=1.1
            )
            
            # Decode the generated tokens
            generated_text = tokenizer.decode(outputs[0], skip_special_tokens=True)
            
            # Extract just the assistant's response by removing the prompt
            response_text = generated_text.split("assistant")[-1].strip()
            
            # Clean up memory
            del outputs, input_ids
            if torch.cuda.is_available():
                torch.cuda.empty_cache()
        
        generation_time = time.time() - start_time
        logger.info(f"Generation completed in {generation_time:.2f}s")
        logger.info(f"Generated {len(response_text)} characters")
        
        # Generate RA data using the processed data as custom data
        logger.info("Generating remote attestation data for generated output...")
        ra_custom_data = f"complete_model_generate:prompt={prompt[:50]}...,output_preview={response_text[:50]}...,time:{time.time()},total_layers:{len(model.model.layers)},generation_time:{generation_time:.2f}s"
        ra_data = get_ra_data(ra_custom_data)
        
        # Store the RA data in the global variable for the ra_report endpoint
        global latest_ra_data
        latest_ra_data = ra_data
        
        # Return the response with RA data
        return jsonify({
            "output": response_text,
            "attestation": ra_data,
            "generation_info": {
                "generation_time_ms": int(generation_time * 1000),
                "total_layers": len(model.model.layers),
                "max_new_tokens": max_new_tokens,
                "temperature": temperature,
                "top_p": top_p
            }
        })
        
    except Exception as e:
        logger.error(f"Error generating response: {str(e)}")
        logger.error(traceback.format_exc())
        return jsonify({"output": f"Error: {str(e)}"})

@app.route('/health', methods=['GET'])
def health():
    """Health check endpoint"""
    memory_info = "CPU only"
    if torch.cuda.is_available():
        memory_info = f"{torch.cuda.memory_allocated() / (1024 ** 3):.2f} GB"
    
    return jsonify({
        "status": "ok",
        "model_type": "TinyLlama-1.1B-Chat-v1.0 (Complete Model)",
        "total_layers": len(model.model.layers),
        "memory_usage": memory_info
    })

@app.route('/ra_report', methods=['GET'])
def get_ra_report():
    """Get the latest RA report"""
    if latest_ra_data:
        return jsonify({
            "status": "success",
            "attestation": latest_ra_data
        })
    else:
        return jsonify({
            "status": "not_ready", 
            "message": "No RA report has been generated yet"
        })

@app.route('/generate_ra', methods=['POST'])
def generate_ra_manual():
    """Generate RA report manually with custom data"""
    try:
        data = request.get_json()
        custom_data = data.get("custom_data", f"manual_ra_request:time:{time.time()}")
        
        logger.info(f"Generating manual RA report with custom data: {custom_data}")
        ra_data = get_ra_data(custom_data)
        
        # Store as latest RA data
        global latest_ra_data
        latest_ra_data = ra_data
        
        return jsonify({
            "status": "success",
            "attestation": ra_data
        })
        
    except Exception as e:
        logger.error(f"Error generating manual RA report: {str(e)}")
        return jsonify({
            "status": "error",
            "message": f"Failed to generate RA report: {str(e)}"
        }), 500

if __name__ == "__main__":
    logger.info("Starting complete model server on port 3001...")
    app.run(host="0.0.0.0", port=3001) 