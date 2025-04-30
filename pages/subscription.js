import { useState, useEffect } from 'react';
import { connect, Contract, keyStores, utils, WalletConnection } from 'near-api-js';
import { parseNearAmount, formatNearAmount } from 'near-api-js/lib/utils/format';

// Configuration for connecting to NEAR mainnet
const config = {
  networkId: 'mainnet',
  keyStore: new keyStores.BrowserLocalStorageKeyStore(),
  nodeUrl: 'https://rpc.mainnet.near.org',
  walletUrl: 'https://wallet.mainnet.near.org',
  helperUrl: 'https://helper.mainnet.near.org',
  explorerUrl: 'https://explorer.mainnet.near.org',
};

// Contract ID on mainnet
const CONTRACT_ID = 'ilovetofu.near';

export default function ModelPage() {
  const [nearConnection, setNearConnection] = useState(null);
  const [walletConnection, setWalletConnection] = useState(null);
  const [accountId, setAccountId] = useState('');
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [contract, setContract] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Subscription related states
  const [subscriptionStatus, setSubscriptionStatus] = useState(false);
  const [subscriptionExpiry, setSubscriptionExpiry] = useState(null);
  const [subscriptionPrice, setSubscriptionPrice] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const [accountToCheck, setAccountToCheck] = useState('');
  const [accountsToCleanup, setAccountsToCleanup] = useState('');
  const [newPrice, setNewPrice] = useState('');

  // Initialize NEAR connection
  useEffect(() => {
    const initNear = async () => {
      try {
        setIsLoading(true);
        // Connect to NEAR
        const near = await connect(config);
        setNearConnection(near);
        
        // Create wallet connection
        const wallet = new WalletConnection(near, 'ilovetofu-model-app');
        setWalletConnection(wallet);
        
        // Check if user is signed in
        const signedIn = wallet.isSignedIn();
        setIsSignedIn(signedIn);
        
        if (signedIn) {
          const id = wallet.getAccountId();
          setAccountId(id);
          
          // Check if the user is the contract owner
          // This would typically require querying the contract for owner info
          
          // Create contract interface
          const contractObj = new Contract(wallet.account(), CONTRACT_ID, {
            viewMethods: ['isSubscribed', 'getSubscriptionExpiry', 'getSubscriptionPrice'],
            changeMethods: ['subscribe', 'updateSubscriptionPrice', 'cleanupExpiredSubscriptions', 'repairContract', 'useModel'],
          });
          
          setContract(contractObj);
          
          // Load subscription data
          await loadSubscriptionData(contractObj, id);
        }
      } catch (err) {
        console.error('Error initializing NEAR:', err);
        setError('Failed to connect to NEAR. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    
    initNear();
  }, []);
  
  const loadSubscriptionData = async (contractObj, userId) => {
    try {
      // Get subscription status
      const status = await contractObj.isSubscribed({ accountId: userId });
      setSubscriptionStatus(status);
      
      // Get subscription expiry if subscribed
      if (status) {
        const expiry = await contractObj.getSubscriptionExpiry({ accountId: userId });
        if (expiry) {
          // Convert nanoseconds to milliseconds and format date
          const expiryDate = new Date(Number(expiry) / 1000000);
          setSubscriptionExpiry(expiryDate.toLocaleString());
        }
      }
      
      // Get subscription price
      const price = await contractObj.getSubscriptionPrice();
      setSubscriptionPrice(formatNearAmount(price, 5));
    } catch (err) {
      console.error('Error loading subscription data:', err);
      setError('Failed to load subscription data. Please try again later.');
    }
  };
  
  const handleSignIn = () => {
    if (walletConnection) {
      walletConnection.requestSignIn({
        contractId: CONTRACT_ID,
        methodNames: ['subscribe', 'updateSubscriptionPrice', 'cleanupExpiredSubscriptions', 'repairContract', 'useModel'],
      });
    }
  };
  
  const handleSignOut = () => {
    if (walletConnection) {
      walletConnection.signOut();
      setIsSignedIn(false);
      setAccountId('');
      setSubscriptionStatus(false);
      setSubscriptionExpiry(null);
    }
  };
  
  const handleSubscribe = async () => {
    if (!contract || !isSignedIn) return;
    
    try {
      // Convert NEAR to yoctoNEAR
      const amountInYocto = parseNearAmount(subscriptionPrice);
      
      // Call the contract's subscribe method
      await contract.subscribe({}, "300000000000000", amountInYocto);
      
      // Reload subscription data after subscribing
      await loadSubscriptionData(contract, accountId);
    } catch (err) {
      console.error('Error subscribing:', err);
      setError('Failed to subscribe. Please try again.');
    }
  };
  
  const handleCheckSubscription = async () => {
    if (!contract || !accountToCheck) return;
    
    try {
      const status = await contract.isSubscribed({ accountId: accountToCheck });
      alert(`Account ${accountToCheck} subscription status: ${status ? 'Active' : 'Inactive'}`);
      
      if (status) {
        const expiry = await contract.getSubscriptionExpiry({ accountId: accountToCheck });
        if (expiry) {
          const expiryDate = new Date(Number(expiry) / 1000000);
          alert(`Subscription expires: ${expiryDate.toLocaleString()}`);
        }
      }
    } catch (err) {
      console.error('Error checking subscription:', err);
      setError('Failed to check subscription status.');
    }
  };
  
  const handleUpdatePrice = async () => {
    if (!contract || !isSignedIn || !newPrice) return;
    
    try {
      // Convert NEAR to yoctoNEAR
      const priceInYocto = parseNearAmount(newPrice);
      
      // Call the contract's updateSubscriptionPrice method
      await contract.updateSubscriptionPrice({ newPrice: priceInYocto });
      
      // Reload subscription price
      const price = await contract.getSubscriptionPrice();
      setSubscriptionPrice(formatNearAmount(price, 5));
      setNewPrice('');
      alert('Subscription price updated successfully');
    } catch (err) {
      console.error('Error updating price:', err);
      setError('Failed to update subscription price. Only the contract owner can update the price.');
    }
  };
  
  const handleCleanupExpiredSubscriptions = async () => {
    if (!contract || !isSignedIn || !accountsToCleanup) return;
    
    try {
      // Split accounts string by comma and trim whitespace
      const accounts = accountsToCleanup.split(',').map(acc => acc.trim());
      
      // Call the contract's cleanupExpiredSubscriptions method
      await contract.cleanupExpiredSubscriptions({ accountIds: accounts });
      
      setAccountsToCleanup('');
      alert('Cleanup of expired subscriptions completed');
    } catch (err) {
      console.error('Error cleaning up subscriptions:', err);
      setError('Failed to clean up expired subscriptions.');
    }
  };
  
  const handleRepairContract = async () => {
    if (!contract || !isSignedIn) return;
    
    try {
      // Call the contract's repairContract method
      await contract.repairContract();
      alert('Contract repaired successfully');
    } catch (err) {
      console.error('Error repairing contract:', err);
      setError('Failed to repair contract. Only the contract owner can repair the contract.');
    }
  };
  
  const handleUseModel = async () => {
    if (!contract || !isSignedIn) return;
    
    try {
      // Call the contract's useModel method
      const canUse = await contract.useModel();
      alert(canUse ? 'You can use the model. Your subscription is active.' : 'You cannot use the model. Please subscribe first.');
    } catch (err) {
      console.error('Error checking model usage:', err);
      setError('Failed to check if you can use the model.');
    }
  };

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <header className="max-w-4xl mx-auto mb-8">
        <h1 className="text-3xl font-bold mb-2">Model Subscription</h1>
        <div className="flex justify-between items-center">
          <p className="text-gray-600">
            {isSignedIn ? `Connected: ${accountId}` : 'Not connected'}
          </p>
          <button
            onClick={isSignedIn ? handleSignOut : handleSignIn}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            {isSignedIn ? 'Sign Out' : 'Connect NEAR Wallet'}
          </button>
        </div>
      </header>

      {error && (
        <div className="max-w-4xl mx-auto mb-8 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
          <button 
            className="ml-4 text-red-700 font-bold"
            onClick={() => setError(null)}
          >
            ✕
          </button>
        </div>
      )}

      <main className="max-w-4xl mx-auto">
        {isSignedIn ? (
          <div className="space-y-8">
            {/* Subscription Status */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Your Subscription</h2>
              <div className="space-y-4">
                <p>
                  <span className="font-medium">Status:</span>{' '}
                  <span className={subscriptionStatus ? 'text-green-600' : 'text-red-600'}>
                    {subscriptionStatus ? 'Active' : 'Inactive'}
                  </span>
                </p>
                {subscriptionExpiry && (
                  <p>
                    <span className="font-medium">Expires:</span> {subscriptionExpiry}
                  </p>
                )}
                <p>
                  <span className="font-medium">Subscription Price:</span> {subscriptionPrice} NEAR
                </p>
                <button
                  onClick={handleSubscribe}
                  className="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                  disabled={isLoading}
                >
                  {subscriptionStatus ? 'Extend Subscription' : 'Subscribe Now'}
                </button>
              </div>
            </div>

            {/* Check Subscription Status */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Check Subscription Status</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Account ID
                  </label>
                  <input
                    type="text"
                    value={accountToCheck}
                    onChange={(e) => setAccountToCheck(e.target.value)}
                    placeholder="account.near"
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <button
                  onClick={handleCheckSubscription}
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  disabled={!accountToCheck}
                >
                  Check Status
                </button>
              </div>
            </div>

            {/* Use Model */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Use Model</h2>
              <button
                onClick={handleUseModel}
                className="w-full px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
              >
                Check Access & Use Model
              </button>
            </div>

            {/* Admin Functions */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Administrative Functions</h2>
              <p className="text-sm text-gray-600 mb-4">
                Note: These functions are only available to the contract owner.
              </p>
              
              <div className="space-y-6">
                {/* Update Price */}
                <div>
                  <h3 className="font-medium mb-2">Update Subscription Price</h3>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={newPrice}
                      onChange={(e) => setNewPrice(e.target.value)}
                      placeholder="Price in NEAR"
                      className="flex-1 p-2 border border-gray-300 rounded"
                    />
                    <button
                      onClick={handleUpdatePrice}
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                      disabled={!newPrice}
                    >
                      Update
                    </button>
                  </div>
                </div>
                
                {/* Cleanup Expired Subscriptions */}
                <div>
                  <h3 className="font-medium mb-2">Cleanup Expired Subscriptions</h3>
                  <div className="space-y-2">
                    <textarea
                      value={accountsToCleanup}
                      onChange={(e) => setAccountsToCleanup(e.target.value)}
                      placeholder="Enter account IDs separated by commas"
                      className="w-full p-2 border border-gray-300 rounded"
                      rows={3}
                    />
                    <button
                      onClick={handleCleanupExpiredSubscriptions}
                      className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                      disabled={!accountsToCleanup}
                    >
                      Cleanup Expired
                    </button>
                  </div>
                </div>
                
                {/* Repair Contract */}
                <div>
                  <h3 className="font-medium mb-2">Repair Contract</h3>
                  <button
                    onClick={handleRepairContract}
                    className="w-full px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Repair Contract
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h2 className="text-xl font-semibold mb-4">Connect Your NEAR Wallet</h2>
            <p className="mb-6 text-gray-600">
              Please connect your NEAR wallet to subscribe to the model and access all features.
            </p>
            <button
              onClick={handleSignIn}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Connect NEAR Wallet
            </button>
          </div>
        )}
      </main>
    </div>
  );
} 