import { useState, useEffect } from 'react';

const TokenSwapPage = () => {
  const [ethAmount, setEthAmount] = useState('');
  const [tokenAmount, setTokenAmount] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  // Calculate token amount based on ETH input (0.002 ETH = 100,000 tokens)
  // Note: This calculation is kept from the original example but might need adjustment
  // depending on the actual token conversion logic you want to implement later.
  useEffect(() => {
    if (ethAmount && !isNaN(parseFloat(ethAmount))) {
      // Using a simple placeholder conversion rate
      const calculatedTokens = (parseFloat(ethAmount) / 0.002) * 100000;
      setTokenAmount(calculatedTokens.toLocaleString());
    } else {
      setTokenAmount('');
    }
  }, [ethAmount]);

  // Handle ETH input change
  const handleEthChange = (e) => {
    const value = e.target.value;
    // Allow empty string or valid numbers (including decimals)
    if (value === '' || /^[0-9]*\.?[0-9]*$/.test(value)) {
       setEthAmount(value);
    }
  };

  return (
    // Centering container - ensures the swap box is in the middle of the page
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md overflow-hidden">
        {/* Simple token swap UI */}
        <div className="p-6 flex flex-col space-y-4">
          <h2 className="text-xl font-semibold text-center text-gray-700 mb-4">Swap Tokens</h2>

          {/* ETH Section */}
          <div className="p-4 border rounded-lg bg-gray-50">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm text-gray-500">You Pay</span>
              {/* Placeholder for ETH balance if needed later */}
              {/* <span className="text-sm text-gray-500">Balance: 0 ETH</span> */}
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="bg-blue-100 rounded-full p-2 flex-shrink-0">
                  <svg className="w-6 h-6 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11.944 17.97L4.58 13.62 11.943 24l7.37-10.38-7.372 4.35h.003zM12.056 0L4.69 12.223l7.365 4.354 7.365-4.35L12.056 0z" />
                  </svg>
                </div>
                <span className="font-bold text-lg">ETH</span>
              </div>
              <div className="relative text-right">
                <input
                  type="text"
                  className="w-full text-right text-xl font-bold bg-transparent border-none focus:outline-none focus:ring-0 pr-1" // Added pr-1 to avoid overlap with cursor
                  value={ethAmount}
                  onChange={handleEthChange}
                  placeholder="0"
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  inputMode="decimal" // Helps mobile keyboards show appropriate layout
                  pattern="^[0-9]*\.?[0-9]*$" // Pattern for HTML5 validation
                />
                {/* Basic blinking cursor imitation */}
                {isFocused && ethAmount === '' && ( // Show cursor only when focused and empty
                  <div className="absolute right-0 top-0 bottom-0 flex items-center pointer-events-none">
                    <div className="w-[1px] h-6 bg-blue-500 animate-pulse"></div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Arrow between tokens */}
          <div className="flex justify-center my-2">
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center border hover:bg-gray-200 transition-colors duration-150 cursor-pointer">
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 17l-4 4m0 0l-4-4m4 4V3" />
              </svg>
            </div>
          </div>

          {/* TOKEN Section */}
          <div className="p-4 border rounded-lg bg-gray-50">
            <div className="flex items-center justify-between mb-1">
               <span className="text-sm text-gray-500">You Receive (Estimated)</span>
               {/* Placeholder for Token balance if needed later */}
               {/* <span className="text-sm text-gray-500">Balance: 0 TOKEN</span> */}
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                 {/* Generic Token Icon */}
                <div className="bg-gray-800 rounded-full p-2 flex-shrink-0">
                  <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                     <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                  </svg>
                </div>
                <span className="font-bold text-lg">TOKEN</span>
              </div>
              <div className="text-xl font-bold text-right min-h-[28px] flex items-center justify-end pl-2 break-all"> {/* Added padding and break-all */}
                {/* Display calculated token amount */}
                {tokenAmount || '0'}
              </div>
            </div>
           </div>

          {/* Placeholder for action button (e.g., connect wallet, swap) */}
          {/* You'll need to add wallet connection logic (like Wagmi or Ethers) to enable this */}
          <div className="pt-4">
             <button
              className="w-full py-3 px-4 rounded-lg text-lg font-medium bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
              // disabled={!ethAmount || parseFloat(ethAmount) <= 0} // Basic validation - enable when wallet is connected
              disabled={true} // Keep disabled until wallet/contract logic is added
            >
              Connect Wallet to Swap
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default TokenSwapPage;