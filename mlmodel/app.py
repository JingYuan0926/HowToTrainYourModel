from flask import Flask, jsonify, request
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.tree import DecisionTreeRegressor
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline
import os

app = Flask(__name__)

# --- Data Loading and Preparation ---
DATA_FILE_PATH = os.path.join(os.path.dirname(__file__), 'bitcoin_prices.csv')

def load_data():
    try:
        df = pd.read_csv(DATA_FILE_PATH, parse_dates=['Date'], index_col='Date')
        # Ensure essential columns are present
        required_cols = ['Open', 'High', 'Low', 'Close']
        if not all(col in df.columns for col in required_cols):
            raise ValueError(f"CSV must contain columns: {required_cols}")
        df.dropna(subset=required_cols, inplace=True) # Drop rows where these are NaN
        return df
    except FileNotFoundError:
        print(f"Error: {DATA_FILE_PATH} not found. Please generate it first.")
        return None
    except Exception as e:
        print(f"Error loading data: {e}")
        return None

df_bitcoin = load_data()

def prepare_features_target(df):
    if df is None or df.empty:
        return None, None, None

    features = ['Open', 'High', 'Low']
    target = 'Close'
    
    if not all(feat in df.columns for feat in features) or target not in df.columns:
        print("Error: Required feature/target columns not in DataFrame after loading.")
        return None, None, None
        
    X = df[features]
    y = df[target]
    return X, y, features

# --- Model Training Helper ---
def train_and_predict(model_name, model_instance, X_train, y_train, X_predict_input_df, feature_names):
    if X_train is None or y_train is None or X_predict_input_df is None:
        return {"error": "Data not loaded or prepared correctly for training or prediction."}, 500
    if X_train.empty or y_train.empty:
        return {"error": "Not enough data to train the model after preparation."}, 500
    if X_predict_input_df.empty:
        return {"error": "No input features provided for prediction."}, 400

    try:
        pipeline = Pipeline([
            ('scaler', StandardScaler()),
            ('model', model_instance)
        ])
        
        pipeline.fit(X_train, y_train)
        
        # Ensure X_predict_input_df has the correct feature order for the pipeline
        X_predict_processed = X_predict_input_df[feature_names] 
        prediction = pipeline.predict(X_predict_processed)
        
        input_features_dict = X_predict_input_df.iloc[0].to_dict()
        
        return {
            "model": model_name,
            "input_features": input_features_dict,
            "predicted_close": round(prediction[0], 2), # Prediction for the single input row
            "status": "success"
        }, 200
    except KeyError as ke:
        return {"error": f"Missing feature in input data for {model_name}: {str(ke)}. Required: {feature_names}"}, 400
    except Exception as e:
        return {"error": f"Error during model {model_name} training/prediction: {str(e)}"}, 500

# --- Endpoints ---
@app.route('/health', methods=['GET'])
def health():
    return jsonify({"status": "ok", "data_loaded": df_bitcoin is not None and not df_bitcoin.empty})

@app.route('/predict/<model_type>', methods=['GET', 'POST'])
def predict(model_type):
    if df_bitcoin is None or df_bitcoin.empty:
        return jsonify({"error": "Bitcoin data not loaded. Please run generate_data.py and restart server."}), 500

    historical_X, historical_y, feature_names = prepare_features_target(df_bitcoin.copy())
    if historical_X is None or historical_y is None:
        return jsonify({"error": "Failed to prepare features and target from the historical data."}), 500

    if len(historical_X) < 2:
        return jsonify({"error": "Not enough historical data to train a model."}), 500

    X_train = historical_X # Train on all historical data
    y_train = historical_y
    
    X_to_predict_df = None

    if request.method == 'POST':
        try:
            input_data = request.get_json()
            if not input_data:
                return jsonify({"error": "No JSON input data provided for POST request."}), 400
            
            # Validate and extract features from input_data
            # Ensure all required features are present
            if not all(feat in input_data for feat in feature_names):
                missing = [feat for feat in feature_names if feat not in input_data]
                return jsonify({"error": f"Missing features in input: {missing}. Required: {feature_names}"}), 400
            
            # Create a DataFrame from the input data for prediction
            predict_features = {feat: [input_data[feat]] for feat in feature_names}
            X_to_predict_df = pd.DataFrame(predict_features)
            
        except Exception as e:
            return jsonify({"error": f"Invalid JSON input: {str(e)}"}), 400
    
    elif request.method == 'GET':
        # Fallback for GET: use the last row of historical data for prediction (as before)
        if historical_X.empty:
             return jsonify({"error": "No historical data available to use for GET request prediction."}), 500
        X_to_predict_df = historical_X.iloc[-1:]
        print("GET request: Predicting using the last row of historical data.")
    
    else:
        return jsonify({"error": "Unsupported request method."}), 405

    if X_to_predict_df is None or X_to_predict_df.empty:
         return jsonify({"error": "Could not determine features to predict. For POST, provide JSON body."}), 400

    model_instance = None
    model_name = ""

    if model_type == 'linear_regression':
        model_instance = LinearRegression()
        model_name = "Linear Regression"
    elif model_type == 'decision_tree':
        model_instance = DecisionTreeRegressor(random_state=42)
        model_name = "Decision Tree Regressor"
    elif model_type == 'random_forest':
        model_instance = RandomForestRegressor(random_state=42, n_estimators=10) # Small n_estimators for speed
        model_name = "Random Forest Regressor"
    else:
        return jsonify({"error": "Invalid model type specified. Use 'linear_regression', 'decision_tree', or 'random_forest'."}), 400

    result, status_code = train_and_predict(model_name, model_instance, X_train, y_train, X_to_predict_df, feature_names)
    return jsonify(result), status_code

if __name__ == '__main__':
    if df_bitcoin is None:
        print("Failed to load data. Exiting Flask app.")
    else:
        print(f"Loaded {len(df_bitcoin)} rows of Bitcoin data.")
        print("Starting Flask server on port 5003...")
        app.run(host='0.0.0.0', port=5003, debug=True) 