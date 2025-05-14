import { Button } from "@heroui/react";
import Link from "next/link";
import { useWallet } from "./ConnectWallet";
import React, { useState } from "react";

export default function Header() {
  const { accountId, connectWallet, disconnectWallet } = useWallet();
  const [selectedNav, setSelectedNav] = useState("Home");
  
  const handleConnectWallet = () => {
    if (accountId) {
      disconnectWallet();
    } else {
      connectWallet();
    }
  };

  const navItems = ["Home", "How it Works", "Features", "Pricing"];

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
        <ul className="flex gap-6 items-center">
          {navItems.map((item) => (
            <li key={item}>
              <span 
                className={`${
                  selectedNav === item 
                    ? "bg-white border border-gray-200 rounded-full px-5 py-2 shadow-sm font-medium" 
                    : "text-gray-600 hover:text-black"
                } cursor-pointer inline-block`}
                onClick={() => setSelectedNav(item)}
              >
                {item}
              </span>
            </li>
          ))}
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