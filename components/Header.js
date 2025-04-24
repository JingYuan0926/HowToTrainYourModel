import { Button } from "@heroui/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { setupWalletSelector } from "@near-wallet-selector/core";
import { setupModal } from "@near-wallet-selector/modal-ui";
import { setupMyNearWallet } from "@near-wallet-selector/my-near-wallet";

// Define contract ID - you can replace this with your actual contract ID
const CONTRACT_ID = process.env.NEXT_PUBLIC_CONTRACT_ID || "test.testnet";

export default function Header() {
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

  const handleConnectWallet = () => {
    if (!accountId && modal) {
      modal.show();
    } else if (accountId && selector) {
      (async () => {
        try {
          const wallet = await selector.wallet();
          await wallet.signOut();
        } catch (err) {
          console.error("Failed to sign out:", err);
        }
      })();
    }
  };

  // Example function to call a contract method
  const callContractMethod = async () => {
    if (!accountId || !selector) return;

    try {
      const wallet = await selector.wallet();
      
      // Example of calling a view method (doesn't require signing)
      // Replace with your actual contract method
      // const result = await wallet.viewMethod({
      //   contractId: CONTRACT_ID,
      //   method: "get_greeting",
      //   args: {},
      // });
      // console.log("View method result:", result);
      
      // Example of calling a change method (requires signing)
      await wallet.signAndSendTransaction({
        signerId: accountId,
        receiverId: CONTRACT_ID,
        actions: [
          {
            type: "FunctionCall",
            params: {
              methodName: "set_greeting", // Replace with your actual method
              args: { message: "Hello from NEAR!" },
              gas: "30000000000000",
              deposit: "0",
            },
          },
        ],
      });
      
      console.log("Transaction sent successfully");
    } catch (err) {
      console.error("Failed to call contract:", err);
    }
  };

  return (
    <header className="w-full py-4 px-6 flex justify-between items-center border-b border-gray-200">
      <div className="flex items-center">
        <Link href="/" className="text-xl font-bold">
          Your App Name
        </Link>
        <nav className="ml-8">
          <ul className="flex gap-6">
            <li><Link href="/" className="hover:text-primary">Home</Link></li>
            <li><Link href="/about" className="hover:text-primary">About</Link></li>
            {/* Add more navigation links as needed */}
          </ul>
        </nav>
      </div>
      <div className="flex items-center">
        {accountId && (
          <div className="mr-4 text-sm">
            <span className="font-medium">{accountId}</span>
          </div>
        )}
        <Button color="primary" onClick={handleConnectWallet} className="mr-2">
          {accountId ? "Disconnect" : "Connect Wallet"}
        </Button>
        {accountId && (
          <Button color="secondary" onClick={callContractMethod}>
            Call Contract
          </Button>
        )}
      </div>
    </header>
  );
} 