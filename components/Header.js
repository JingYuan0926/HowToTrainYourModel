import { Button } from "@heroui/react";
import Link from "next/link";
import { useWallet } from "./ConnectWallet";

export default function Header() {
  const { accountId, connectWallet, disconnectWallet, callContractMethod } = useWallet();

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
          <Button color="secondary" onClick={handleCallContract}>
            Call Contract
          </Button>
        )}
      </div>
    </header>
  );
} 