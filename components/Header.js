import { Button, Tabs, Tab } from "@heroui/react";
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

  return (
    <header className="w-full py-4 px-6 flex justify-between items-center border-b border-gray-200 bg-white">
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

      {/* Middle - Navigation with Tabs */}
      <nav className="flex-grow flex justify-center">
        <Tabs 
          aria-label="Navigation" 
          radius="full"
          selectedKey={selectedNav}
          onSelectionChange={setSelectedNav}
          classNames={{
            base: "mx-auto bg-white",
            tabList: "gap-6 bg-white",
            tab: "px-5 py-2 text-gray-600 data-[hover=true]:text-black data-[selected=true]:font-bold transition-colors",
            cursor: "bg-white shadow-sm border border-gray-200",
            panel: "bg-white"
          }}
          variant="light"
        >
          <Tab key="Home" title="Home" />
          <Tab key="How it Works" title="How it Works" />
          <Tab key="Features" title="Features" />
          <Tab key="Pricing" title="Pricing" />
        </Tabs>
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