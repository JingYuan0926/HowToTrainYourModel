import { useEffect, useState } from "react";
import { setupWalletSelector } from "@near-wallet-selector/core";
import { setupModal } from "@near-wallet-selector/modal-ui";
import { setupMyNearWallet } from "@near-wallet-selector/my-near-wallet";

import { setupMeteorWallet } from "@near-wallet-selector/meteor-wallet";

import { providers } from "near-api-js";

// Define contract ID - you can replace this with your actual contract ID
const CONTRACT_ID = "test.testnet";
const NETWORK_ID = "testnet";
const PROVIDER_URL = `https://rpc.${NETWORK_ID}.near.org`;

export function useWallet() {
  const [selector, setSelector] = useState(null);
  const [modal, setModal] = useState(null);
  const [accountId, setAccountId] = useState(null);
  const [balance, setBalance] = useState(null);

  // Simplified function to fetch account balance
  const fetchBalance = async (id) => {
    if (!id) return;
    
    try {
      // Create a direct connection to the NEAR RPC
      const provider = new providers.JsonRpcProvider({ url: PROVIDER_URL });
      
      // Make a simple RPC call to get account details
      const account = await provider.query({
        request_type: "view_account",
        account_id: id,
        finality: "final"
      });
      
      // Convert yoctoNEAR to NEAR (1 NEAR = 10^24 yoctoNEAR)
      if (account && account.amount) {
        const nearBalance = parseFloat(account.amount) / 1e24;
        setBalance(nearBalance.toFixed(2));
      }
    } catch (error) {
      console.error("Failed to fetch balance:", error);
      setBalance("0.00");
    }
  };

  useEffect(() => {
    // Initialize the wallet selector
    const init = async () => {
      const walletSelector = await setupWalletSelector({
        network: NETWORK_ID,
        modules: [
          setupMyNearWallet(),     // My NEAR Wallet (web wallet)
          setupMeteorWallet(),     // Meteor Wallet
        ],
      });

      const walletModal = setupModal(walletSelector, {
        contractId: CONTRACT_ID,
        description: "Connect to use this dApp with your NEAR wallet",
      });

      // Get the account if already signed in
      const accounts = await walletSelector.store.getState().accounts;
      if (accounts.length > 0) {
        const id = accounts[0].accountId;
        setAccountId(id);
        fetchBalance(id);
      }

      // Subscribe to changes
      const subscription = walletSelector.store.observable.subscribe((state) => {
        if (state.accounts.length > 0) {
          const id = state.accounts[0].accountId;
          setAccountId(id);
          fetchBalance(id);
        } else {
          setAccountId(null);
          setBalance(null);
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
        setBalance(null);
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
      // Refresh balance after transaction
      fetchBalance(accountId);
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

  // Manually refresh balance
  const refreshBalance = () => {
    if (accountId) {
      fetchBalance(accountId);
    }
  };

  return {
    accountId,
    balance,
    selector,
    connectWallet,
    disconnectWallet,
    callContractMethod,
    viewMethod,
    refreshBalance,
  };
} 