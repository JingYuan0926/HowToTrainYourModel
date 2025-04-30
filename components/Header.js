import { Button } from "@heroui/react";
import Link from "next/link";
import { useWallet } from "./ConnectWallet";
import { useState } from "react";

export default function Header() {
  const { accountId, balance, connectWallet, disconnectWallet, callContractMethod, networkId } = useWallet();
  const [showNetworkOptions, setShowNetworkOptions] = useState(false);

  const handleConnectWallet = (network) => {
    if (accountId) {
      disconnectWallet();
    } else {
      connectWallet(network);
    }
    setShowNetworkOptions(false);
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
          Your App Name
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
                Network: <span className={networkId === 'mainnet' ? 'text-green-500' : 'text-blue-500'}>
                  {networkId === 'mainnet' ? 'Mainnet' : 'Testnet'}
                </span>
              </div>
            )}
          </div>
        )}
        
        {accountId ? (
          <Button color="primary" onPress={() => disconnectWallet()} className="mr-2">
            Disconnect
          </Button>
        ) : (
          <div className="relative">
            <Button 
              color="primary" 
              onPress={() => setShowNetworkOptions(!showNetworkOptions)} 
              className="mr-2"
            >
              Connect Wallet
            </Button>
            
            {showNetworkOptions && (
              <div className="absolute right-0 mt-2 z-10 bg-white shadow-lg rounded-md overflow-hidden w-40 border border-gray-200">
                <button 
                  onClick={() => handleConnectWallet('mainnet')}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm font-medium text-green-600 border-b border-gray-100"
                >
                  Connect to Mainnet
                </button>
                <button 
                  onClick={() => handleConnectWallet('testnet')}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm font-medium text-blue-600"
                >
                  Connect to Testnet
                </button>
              </div>
            )}
          </div>
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