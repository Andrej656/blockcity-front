// components/stacks/StacksConnection.js
import React from 'react';
import { useConnect, generateSecretKey, generateWallet, restoreWalletAccounts, makeAuthResponse } from '@stacks/wallet-sdk';
import { StacksMainnet } from '@stacks/network';

const StacksConnection = ({ children }) => {
  const { userSession } = useConnect();

  const handleGenerateWallet = async () => {
    try {
      const password = 'your-password'; // Change this to a secure password
      const secretKey = generateSecretKey();
      const wallet = await generateWallet({ secretKey, password });

      // Use the wallet as needed, for example, save it to state or context
      console.log('Generated Wallet:', wallet);
    } catch (error) {
      console.error('Error generating wallet:', error);
    }
  };

  const handleRestoreWallet = async () => {
    try {
      if (!userSession) {
        console.error('userSession is not available.');
        return;
      }

      // Retrieve the baseWallet object from userSession
      const baseWallet = userSession.loadUserData().profile.wallet;

      if (!baseWallet) {
        console.error('baseWallet is not available.');
        return;
      }

      const restoredWallet = await restoreWalletAccounts({
        wallet: baseWallet,
        gaiaHubUrl: 'https://hub.blockstack.org',
        network: new StacksMainnet(),
      });

      // Use the restored wallet as needed
      console.log('Restored Wallet:', restoredWallet);
    } catch (error) {
      console.error('Error restoring wallet:', error);
    }
  };

  const handleMakeAuthResponse = async () => {
    try {
      if (!userSession) {
        console.error('userSession is not available.');
        return;
      }

      const transitPublicKey = 'xxxx'; // Replace with the actual transit public key
      const authResponse = await makeAuthResponse({
        gaiaHubUrl: 'https://hub.blockstack.org',
        appDomain: 'https://example-app.com',
        transitPublicKey,
        scopes: ['publish_data'],
        account: userSession.loadUserData().profile.account,
      });

      // Use the authResponse as needed
      console.log('Auth Response:', authResponse);
    } catch (error) {
      console.error('Error making auth response:', error);
    }
  };

  return (
    <div>
      <button onClick={handleGenerateWallet}>Generate Wallet</button>
      <button onClick={handleRestoreWallet}>Restore Wallet</button>
      <button onClick={handleMakeAuthResponse}>Make Auth Response</button>
      {children}
    </div>
  );
};

export default StacksConnection;
