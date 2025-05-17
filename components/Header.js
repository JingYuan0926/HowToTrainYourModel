import { Button, Tabs, Tab, Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@heroui/react";
import Link from "next/link";
import { useWallet } from "./ConnectWallet";
import React, { useState, useEffect } from "react";

export default function Header() {
  const { accountId, connectWallet, disconnectWallet } = useWallet();
  const [selectedNav, setSelectedNav] = useState("Home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  
  // Handle scroll events with smoother transition
  useEffect(() => {
    const handleScroll = () => {
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
    // Start with 100% and reduce to medium size based on scroll progress
    if (!isScrolled) return "100%";
    
    // When scrolled, set width based on the predefined size
    return "var(--navbar-width-md)";
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
      {/* Container with fixed position and width for the navigation tabs */}
      <div className="absolute top-0 left-0 right-0 flex justify-center pointer-events-none" style={{ zIndex: 51 }}>
        <div className="w-full max-w-screen-xl mx-auto px-6 flex justify-center">
          {/* Fixed position navigation tabs */}
          <div className="pointer-events-auto pt-4">
            <Tabs 
              aria-label="Navigation" 
              radius="full"
              selectedKey={selectedNav}
              onSelectionChange={setSelectedNav}
              classNames={{
                base: "bg-transparent mt-2",
                tabList: "gap-6 bg-transparent",
                tab: "px-5 py-2 text-gray-600 data-[hover=true]:text-black data-[selected=true]:font-bold transition-colors",
                cursor: "bg-transparent shadow-sm border border-gray-200",
                panel: "bg-transparent"
              }}
              variant="light"
            >
              <Tab key="Home" title="Home" />
              <Tab key="How it Works" title="How it Works" />
              <Tab key="Features" title="Features" />
              <Tab key="Pricing" title="Pricing" />
            </Tabs>
          </div>
        </div>
      </div>

      <Navbar 
        position="relative" 
        maxWidth={isScrolled ? "md" : "full"} 
        height="3rem"
        className={`py-4 px-6 transition-all duration-420 ease-in-out bg-transparent ${
          isScrolled ? "mx-auto rounded-lg shadow-md mt-2 transform scale-98" : "w-full"
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
        {/* Left side - Logo */}
        <NavbarBrand className="transition-all duration-420">
          <Link href="/" className="flex items-center">
            {/* Logo placeholder */}
            <div className="h-10 w-10 bg-blue-600 rounded-md flex items-center justify-center text-white mr-2">
              Logo
            </div>
            <span className="text-xl font-bold">HTTYM</span>
          </Link>
        </NavbarBrand>

        {/* Middle - Invisible placeholder for navigation to maintain spacing */}
        <NavbarContent className="flex justify-center invisible" justify="center">
          <div style={{ width: "500px", height: "40px" }}></div>
        </NavbarContent>

        {/* Right side - Connect Wallet button */}
        <NavbarContent justify="end" className="transition-all duration-420">
          <NavbarItem>
            <Button 
              color="primary" 
              onPress={handleConnectWallet} 
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full"
            >
              {accountId ? "Disconnect" : "Try for free"}
            </Button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
    </div>
  );
} 