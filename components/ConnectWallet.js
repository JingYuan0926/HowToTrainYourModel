import { useEffect, useState } from "react";
import { setupWalletSelector } from "@near-wallet-selector/core";
import { setupModal } from "@near-wallet-selector/modal-ui";
import { setupMyNearWallet } from "@near-wallet-selector/my-near-wallet";

// Define contract ID - you can replace this with your actual contract ID
const CONTRACT_ID = process.env.NEXT_PUBLIC_CONTRACT_ID || "test.testnet";

export function useWallet() {
  const [selector, setSelector] = useState(null);
  const [modal, setModal] = useState(null);
  const [accountId, setAccountId] = useState(null);

  useEffect(() => {
    // Initialize the wallet selector
    const init = async () => {
      const walletSelector = await setupWalletSelector({
        network: "testnet",
        modules: [setupMyNearWallet()],
      });

      const walletModal = setupModal(walletSelector, {
        contractId: CONTRACT_ID,
      });

      // Get the account if already signed in
      const accounts = await walletSelector.store.getState().accounts;
      if (accounts.length > 0) {
        setAccountId(accounts[0].accountId);
      }

      // Subscribe to changes
      const subscription = walletSelector.store.observable.subscribe((state) => {
        if (state.accounts.length > 0) {
          setAccountId(state.accounts[0].accountId);
        } else {
          setAccountId(null);
        }
      });

      setSelector(walletSelector);
      setModal(walletModal);

      return () => subscription.unsubscribe();
    };

    init().catch(console.error);
  }, []);

  const connectWallet = () => {
    if (!accountId && modal) {
      modal.show();
    }
  };

  const disconnectWallet = async () => {
    if (accountId && selector) {
      try {
        const wallet = await selector.wallet();
        await wallet.signOut();
      } catch (err) {
        console.error("Failed to sign out:", err);
      }
    }
  };

  // Example function to call a contract method
  const callContractMethod = async (methodName, args = {}, gas = "30000000000000", deposit = "0") => {
    if (!accountId || !selector) return;

    try {
      const wallet = await selector.wallet();
      
      await wallet.signAndSendTransaction({
        signerId: accountId,
        receiverId: CONTRACT_ID,
        actions: [
          {
            type: "FunctionCall",
            params: {
              methodName,
              args,
              gas,
              deposit,
            },
          },
        ],
      });
      
      console.log("Transaction sent successfully");
      return true;
    } catch (err) {
      console.error("Failed to call contract:", err);
      return false;
    }
  };

  // Function to call a view method
  const viewMethod = async (methodName, args = {}) => {
    if (!selector) return null;

    try {
      const wallet = await selector.wallet();
      const result = await wallet.viewMethod({
        contractId: CONTRACT_ID,
        method: methodName,
        args,
      });
      return result;
    } catch (err) {
      console.error("Failed to call view method:", err);
      return null;
    }
  };

  return {
    accountId,
    selector,
    connectWallet,
    disconnectWallet,
    callContractMethod,
    viewMethod,
  };
} 