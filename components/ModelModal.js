import React, { useState } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Tabs,
  Tab,
} from "@heroui/react";
import { useModel } from "@/hooks/useModel";

export default function ModelModal({ isOpen, onOpenChange, model }) {
  const { runModel, isProcessing, error, success, result } = useModel();
  const [input, setInput] = useState('');
  const [bitcoinData, setBitcoinData] = useState({
    open: '',
    high: '',
    low: ''
  });
  const [selectedTab, setSelectedTab] = useState('platform');
  const [isCopied, setIsCopied] = useState(false);

  if (!model) return null;

  const isBitcoinModel = ['linear-regression', 'decision-tree', 'random-forest'].includes(model.id);

  const handleRunModel = async () => {
    if (isBitcoinModel) {
      const modelInput = {
        open: parseFloat(bitcoinData.open),
        high: parseFloat(bitcoinData.high),
        low: parseFloat(bitcoinData.low)
      };
      await runModel(model.id, modelInput);
    } else {
      await runModel(model.id, input);
    }
  };

  const handleBitcoinInputChange = (field, value) => {
    setBitcoinData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const isFormValid = () => {
    if (isBitcoinModel) {
      return bitcoinData.open && bitcoinData.high && bitcoinData.low && 
             !isNaN(parseFloat(bitcoinData.open)) && 
             !isNaN(parseFloat(bitcoinData.high)) && 
             !isNaN(parseFloat(bitcoinData.low));
    }
    return input.trim();
  };

  const handleCopyCode = async () => {
    const inputExample = isBitcoinModel 
      ? `{
        "open": 45000.50,
        "high": 46200.00,
        "low": 44800.25
      }`
      : `"Your input here"`;

    const codeString = `const response = await fetch(
  'https://e3c329acf714051138becd9199470e6d1ae0cabd-5050.dstack-prod5.phala.network/predict',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      modelId: "${model.id}",
      input: ${inputExample}
    })
  }
);

const result = await response.json();`;

    try {
      await navigator.clipboard.writeText(codeString);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="md">
      <ModalContent className="max-h-[90vh] overflow-hidden">
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{model.icon}</span>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">{model.name}</h2>
                  <p className="text-sm text-gray-600">{model.description}</p>
                </div>
              </div>
            </ModalHeader>
            <ModalBody className="overflow-y-auto">
              <div className="space-y-4">
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-md p-3">
                    <p className="text-red-700 text-sm">{error}</p>
                  </div>
                )}
                
                {success && result && (
                  <div className="bg-green-50 border border-green-200 rounded-md p-3">
                    <p className="text-green-700 text-sm font-medium mb-2">Prediction Results:</p>
                    <pre className="bg-white p-3 rounded border border-green-100 text-sm overflow-x-auto">
                      {JSON.stringify(result, null, 2)}
                    </pre>
                  </div>
                )}

                <Tabs 
                  selectedKey={selectedTab} 
                  onSelectionChange={setSelectedTab}
                  className="w-full"
                >
                  <Tab key="platform" title="Use Platform">
                    <div>
                      {isBitcoinModel ? (
                        <>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Open
                          </label>
                          <input
                            type="number"
                            value={bitcoinData.open}
                            onChange={(e) => handleBitcoinInputChange('open', e.target.value)}
                            placeholder="Enter opening price"
                            className="w-full h-10 px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
                          />
                          <label className="block text-sm font-medium text-gray-700 mb-2 mt-4">
                            High
                          </label>
                          <input
                            type="number"
                            value={bitcoinData.high}
                            onChange={(e) => handleBitcoinInputChange('high', e.target.value)}
                            placeholder="Enter high price"
                            className="w-full h-10 px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
                          />
                          <label className="block text-sm font-medium text-gray-700 mb-2 mt-4">
                            Low
                          </label>
                          <input
                            type="number"
                            value={bitcoinData.low}
                            onChange={(e) => handleBitcoinInputChange('low', e.target.value)}
                            placeholder="Enter low price"
                            className="w-full h-10 px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
                          />
                        </>
                      ) : (
                        <>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Input Text
                          </label>
                          <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Enter your text here..."
                            className="w-full h-24 px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
                          />
                        </>
                      )}
                      <div className="mt-4">
                        <button
                          onClick={handleRunModel}
                          disabled={isProcessing || !isFormValid()}
                          className={`w-full py-2 px-4 rounded-lg font-medium transition duration-200 ${
                            isProcessing || !isFormValid()
                              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                              : `bg-${model.color}-100 text-${model.color}-700 hover:bg-${model.color}-200`
                          }`}
                        >
                          {isProcessing ? 'Processing...' : 'Run Model'}
                        </button>
                      </div>
                    </div>
                  </Tab>
                  <Tab key="code" title="Code Example">
                    <div className="mt-4">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="text-sm font-medium text-gray-900">Example Code</h3>
                          <button
                            onClick={handleCopyCode}
                            className="flex items-center gap-1 px-2 py-1 text-sm text-gray-600 hover:text-gray-900 transition-colors"
                          >
                            {isCopied ? (
                              <>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                                </svg>
                                <span>Copied!</span>
                              </>
                            ) : (
                              <>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                                <span>Copy</span>
                              </>
                            )}
                          </button>
                        </div>
                        <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto max-h-[300px]">
                          <code>{`const response = await fetch(
  'https://e3c329acf714051138becd9199470e6d1ae0cabd-5050.dstack-prod5.phala.network/predict',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      modelId: "${model.id}",
      input: ${isBitcoinModel 
        ? `{
        "open": 45000.50,
        "high": 46200.00,
        "low": 44800.25
      }`
        : `"Your input here"`}
    })
  }
);

const result = await response.json();`}</code>
                        </pre>
                      </div>
                      <p className="text-sm text-gray-600 mt-4">
                        You can integrate this model directly in your code using our API. 
                        Check out the <a href="#" className="text-blue-600 hover:underline">documentation</a> for more details.
                      </p>
                    </div>
                  </Tab>
                </Tabs>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" onPress={onClose}>
                Close
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}