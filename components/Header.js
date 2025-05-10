import { Button } from "@heroui/react";
import Link from "next/link";
import { useWallet } from "./ConnectWallet";
import { useState } from "react";

export default function Header() {
  const { accountId, balance, connectWallet, disconnectWallet, callContractMethod, networkId } = useWallet();
  
  const handleConnectWallet = () => {
    if (accountId) {
      disconnectWallet();
    } else {
      connectWallet();
    }
  };

  // Example of calling a contract method
  const handleCallContract = () => {
    callContractMethod(
      "set_greeting", 
      { message: "Hello from NEAR!" }
    );
  };

  return (
    <header className="w-full py-4 px-6 flex justify-between items-center border-b border-gray-200">
      <div className="flex items-center">
        <Link href="/" className="text-xl font-bold">
          HowToTrainYourModel
        </Link>
        <nav className="ml-8">
          <ul className="flex gap-6">
            <li><Link href="/" className="hover:text-primary">Home</Link></li>
            <li><Link href="/about" className="hover:text-primary">About</Link></li>
            <li><Link href="/model" className="hover:text-primary">Model</Link></li>
            {/* Add more navigation links as needed */}
          </ul>
        </nav>
      </div>
      <div className="flex items-center">
        {accountId && (
          <div className="mr-4 text-sm">
            <div className="font-medium">{accountId}</div>
            <div className="text-sm text-gray-600">
              {balance !== null ? `${balance} NEAR` : 'Loading balance...'}
            </div>
            {networkId && (
              <div className="text-xs text-gray-500">
                Network: <span className="text-green-500">Mainnet</span>
              </div>
            )}
          </div>
        )}
        
        {accountId ? (
          <Button color="primary" onPress={() => disconnectWallet()} className="mr-2">
            Disconnect
          </Button>
        ) : (
          <Button 
            color="primary" 
            onPress={handleConnectWallet} 
            className="mr-2"
          >
            Connect Wallet
          </Button>
        )}
        
        {accountId && (
          <Button color="secondary" onPress={handleCallContract}>
            Call Contract
          </Button>
        )}
      </div>
    </header>
  );
} 