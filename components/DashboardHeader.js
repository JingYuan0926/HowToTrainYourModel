import { Button, Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@heroui/react";
import Link from "next/link";
import { useWallet } from "./ConnectWallet";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

export default function DashboardHeader() {
  const { accountId, connectWallet, disconnectWallet } = useWallet();
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [balance, setBalance] = useState(null);
  const router = useRouter();
  const isManualScrolling = useRef(false);
  
  // Determine if header should be shrunk (only when scrolled for dashboard)
  const shouldShrink = isScrolled;
  
  // Fetch NEAR balance when accountId changes
  useEffect(() => {
    const fetchBalance = async () => {
      if (!accountId) {
        setBalance(null);
        return;
      }
      
      try {
        // Using NEAR RPC API to fetch balance
        const response = await fetch('https://rpc.mainnet.near.org', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            jsonrpc: '2.0',
            id: 'dontcare',
            method: 'query',
            params: {
              request_type: 'view_account',
              finality: 'final',
              account_id: accountId
            }
          })
        });

        const data = await response.json();
        if (data.result && data.result.amount) {
          // Convert yoctoNEAR to NEAR (1 NEAR = 10^24 yoctoNEAR)
          const nearBalance = parseFloat(data.result.amount) / Math.pow(10, 24);
          setBalance(nearBalance.toFixed(2));
        }
      } catch (error) {
        console.error('Error fetching NEAR balance:', error);
        setBalance(null);
      }
    };

    fetchBalance();
  }, [accountId]);
  
  // Handle scroll events with smoother transition
  useEffect(() => {
    const handleScroll = () => {
      // Skip processing if manual scrolling is in progress
      if (isManualScrolling.current) return;
      
      // Check if scrolled past a threshold (e.g., 50px)
      const scrolled = window.scrollY > 50;
      setIsScrolled(scrolled);
      
      // Calculate scroll progress for smoother transition (0 to 1)
      const progress = Math.min(1, window.scrollY / 100);
      setScrollProgress(progress);
    };
    
    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);
    
    // Clean up
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  
  // Calculate dynamic width based on scroll progress
  const getNavbarWidth = () => {
    // Shrink when scrolled down
    if (shouldShrink) return "var(--navbar-width-md)";
    
    // Otherwise stay at full width (only at top)
    return "100%";
  };
  
  const handleConnectWallet = () => {
    if (accountId) {
      disconnectWallet();
    } else {
      connectWallet();
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center w-full">
      <Navbar 
        position="relative" 
        maxWidth={shouldShrink ? "md" : "full"}
        height="3rem"
        className={`py-4 px-6 transition-all duration-420 ease-in-out bg-transparent ${
          shouldShrink ? "mx-auto rounded-lg shadow-md mt-2 transform scale-98" : "w-full"
        }`}
        style={{
          width: getNavbarWidth(),
          "--navbar-width-md": "80%", // Custom property for medium width
          transitionProperty: "width, border-radius, box-shadow, margin, transform",
          transitionDuration: "420ms",
          transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
          backgroundColor: "transparent"
        }}
        isBordered={false}
      >
        {/* Left side - Logo with fixed width to maintain consistent spacing */}
        <NavbarBrand className="transition-all duration-420 w-[130px]">
          <Link href="/dashboard" className="flex items-center">
            {/* Logo */}
            <Image
              src="/HTTYMLogo.png"
              alt="HTTYM Logo"
              width={40}
              height={40}
              className="mr-2"
            />
            <span className="text-xl font-bold">HTTYM</span>
          </Link>
        </NavbarBrand>

        {/* Middle - Invisible placeholder for navigation with exact width for consistency */}
        <NavbarContent className="flex justify-center invisible" justify="center">
          <div style={{ width: "470px", height: "40px" }}></div>
        </NavbarContent>

        {/* Right side - Balance and Connect Wallet button */}
        <NavbarContent justify="end" className="transition-all duration-420 w-[200px] flex items-center gap-4">
          {accountId && balance !== null && (
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700">
                Balance: {balance}Ⓝ
              </span>
            </div>
          )}
          <NavbarItem>
            <Button 
              color="primary"
              onClick={handleConnectWallet}
              className="w-28 px-4 py-2 h-10 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium"
            >
              {accountId ? "Disconnect" : "Connect Wallet"}
            </Button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
    </div>
  );
} 