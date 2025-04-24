import { Button } from "@heroui/react";
import Link from "next/link";

export default function Header() {
  const handleConnectWallet = () => {
    // Implement wallet connection logic here
    console.log("Connecting wallet...");
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
      <Button color="primary" onClick={handleConnectWallet}>
        Connect Wallet
      </Button>
    </header>
  );
} 