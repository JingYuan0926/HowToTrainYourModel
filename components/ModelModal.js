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
  const { runModel, isProcessing, error, success } = useModel();
  const [input, setInput] = useState('');
  const [selectedTab, setSelectedTab] = useState('platform');

  if (!model) return null;

  const handleRunModel = async () => {
    await runModel(model.id, input);
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="2xl">
      <ModalContent>
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
            <ModalBody>
              <div className="space-y-4">
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-md p-3">
                    <p className="text-red-700 text-sm">{error}</p>
                  </div>
                )}
                
                {success && (
                  <div className="bg-green-50 border border-green-200 rounded-md p-3">
                    <p className="text-green-700 text-sm">Model used successfully!</p>
                  </div>
                )}

                <Tabs 
                  selectedKey={selectedTab} 
                  onSelectionChange={setSelectedTab}
                  className="w-full"
                >
                  <Tab key="platform" title="Use Platform">
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Input Text
                      </label>
                      <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Enter your text here..."
                        className="w-full h-32 px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
                      />
                      <div className="mt-4">
                        <button
                          onClick={handleRunModel}
                          disabled={isProcessing || !input.trim()}
                          className={`w-full py-2 px-4 rounded-lg font-medium transition duration-200 ${
                            isProcessing || !input.trim()
                              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                              : `bg-${model.color}-100 text-${model.color}-700 hover:bg-${model.color}-200`
                          }`}
                        >
                          {isProcessing ? 'Processing...' : 'Run Model'}
                        </button>
                      </div>
                    </div>
                  </Tab>
                  <Tab key="code" title="Use Code">
                    <div className="mt-4">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="text-sm font-medium text-gray-900 mb-2">Example Code</h3>
                        <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                          <code>{`const result = await contract.useModel({
  modelId: "${model.id}",
  input: "Your input here"
});`}</code>
                        </pre>
                      </div>
                      <p className="text-sm text-gray-600 mt-4">
                        You can integrate this model directly in your code using our SDK. 
                        Check out the <a href="#" className="text-blue-600 hover:underline">documentation</a> for more details.
                      </p>
                    </div>
                  </Tab>
                </Tabs>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" variant="light" onPress={onClose}>
                Close
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
} 