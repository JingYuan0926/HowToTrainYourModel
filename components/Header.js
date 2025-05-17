import { Button, Tabs, Tab, Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@heroui/react";
import Link from "next/link";
import { useWallet } from "./ConnectWallet";
import React, { useState, useEffect } from "react";
import { AnimatedSubscribeButton } from "@/components/magicui/animated-subscribe-button";
import { CheckIcon, ChevronRightIcon } from "lucide-react";
import Image from "next/image";

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
          {/* Fixed position navigation tabs - moved slightly right with ml-8 */}
          <div 
            className={`pointer-events-auto pt-4 ml-8 transition-transform duration-420 ease-in-out ${
              isScrolled ? "transform translate-y-[5px]" : ""
            }`}
          >
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
        {/* Left side - Logo with fixed width to maintain consistent spacing */}
        <NavbarBrand className="transition-all duration-420 w-[130px]">
          <Link href="/" className="flex items-center">
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

        {/* Right side - Connect Wallet button with fixed width to maintain spacing */}
        <NavbarContent justify="end" className="transition-all duration-420 w-[130px]">
          <NavbarItem>
            <AnimatedSubscribeButton 
              onClick={handleConnectWallet}
              className="w-28 px-4 py-2 h-10 bg-blue-600 hover:bg-blue-700 text-white"
              subscribeStatus={!!accountId}
            >
              <span className="group inline-flex items-center text-sm font-medium">
                Try Now
                <ChevronRightIcon className="ml-2 size-3 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
              <span className="group inline-flex items-center text-sm font-medium">
                <CheckIcon className="mr-1 size-3" />
                Active
              </span>
            </AnimatedSubscribeButton>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
    </div>
  );
} 