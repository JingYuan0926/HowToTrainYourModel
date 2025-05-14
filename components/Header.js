import { Button } from "@heroui/react";
import Link from "next/link";
import { useWallet } from "./ConnectWallet";
import React from "react";

export default function Header() {
  const { accountId, connectWallet, disconnectWallet } = useWallet();
  
  const handleConnectWallet = () => {
    if (accountId) {
      disconnectWallet();
    } else {
      connectWallet();
    }
  };

  return (
    <header className="w-full py-4 px-6 flex justify-between items-center border-b border-gray-200">
      {/* Left side - Logo */}
      <div className="flex-shrink-0">
        <Link href="/" className="flex items-center">
          {/* Logo placeholder */}
          <div className="h-10 w-10 bg-blue-600 rounded-md flex items-center justify-center text-white mr-2">
            Logo
          </div>
          <span className="text-xl font-bold">SkyAgent</span>
        </Link>
      </div>

      {/* Middle - Navigation */}
      <nav className="flex-grow flex justify-center">
        <ul className="flex gap-6">
          <li><Link href="/" className="hover:text-blue-600 font-medium">Home</Link></li>
          <li><Link href="/how-it-works" className="hover:text-blue-600 text-gray-600">How it Works</Link></li>
          <li><Link href="/features" className="hover:text-blue-600 text-gray-600">Features</Link></li>
          <li><Link href="/pricing" className="hover:text-blue-600 text-gray-600">Pricing</Link></li>
        </ul>
      </nav>

      {/* Right side - Connect Wallet button */}
      <div className="flex-shrink-0">
        <Button 
          color="primary" 
          onPress={handleConnectWallet} 
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full"
        >
          {accountId ? "Disconnect" : "Try for free"}
        </Button>
      </div>
    </header>
  );
} 