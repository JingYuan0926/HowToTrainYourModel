import React from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@heroui/react";
import { useSubscribe } from "@/hooks/useSubscribe";

export default function SubscriptionModal({ isOpen, onOpenChange, formattedExpiry }) {
  const { subscribe, isSubscribing, subscribeError, subscribeSuccess } = useSubscribe();

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <div className="text-xl font-semibold text-gray-900">
                Subscription Status
              </div>
            </ModalHeader>
            <ModalBody>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-green-600 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Subscribed
                  </h3>
                  <p className="text-gray-600 mt-1">You have access to all HTTYM features!</p>
                  {formattedExpiry && (
                    <p className="text-sm text-gray-500 mt-2">
                      Subscription expires: {formattedExpiry}
                    </p>
                  )}
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Extend Your Subscription</h4>
                  {subscribeError && (
                    <div className="bg-red-50 border border-red-200 rounded-md p-3 mb-4">
                      <p className="text-red-700 text-sm">{subscribeError}</p>
                    </div>
                  )}
                  
                  {subscribeSuccess && (
                    <div className="bg-green-50 border border-green-200 rounded-md p-3 mb-4">
                      <p className="text-green-700 text-sm">Successfully extended! The expiry date will update shortly.</p>
                    </div>
                  )}
                  
                  <button
                    onClick={subscribe}
                    disabled={isSubscribing}
                    className={`w-full text-sm font-semibold py-2 px-4 rounded-lg transition duration-200 ease-in-out transform hover:scale-105 ${
                      isSubscribing 
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                        : 'bg-green-50 text-green-700 hover:bg-green-100 border border-green-200'
                    }`}
                  >
                    {isSubscribing ? 'Processing...' : 'Add Another Month (1 NEAR)'}
                  </button>
                  <p className="text-xs text-gray-500 mt-2">
                    Extending your subscription will add one month from your current expiry date.
                  </p>
                </div>
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