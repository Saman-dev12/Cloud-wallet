import { Connection, LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';
import React, { useEffect, useState } from 'react';
import {  ArrowDownLeft, Repeat,  Clock, Send } from 'react-feather';
import { useRecoilState } from 'recoil';
import { user } from '../atom/useratom';
import SendSol from './SendSol';
import Deposit from './Deposit';
import Swap from './Swap';
import Transactions from './Transactions';

const Wallet: React.FC = () => {
    const connection = new Connection('https://api.devnet.solana.com', 'confirmed');
const [balance, setBalance] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState('send');
  const [userDetails,setUserdetails] = useRecoilState(user);

  

const getBalance = async () => {
    try {
      const balance = await connection.getBalance(new PublicKey(userDetails.publicKey));
      setBalance(balance);
    } catch (error) {
      console.error('Error fetching balance:', error);
    }
  };

  const fetchBalance = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/user/profile', {
        method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              
          },
        credentials: 'include',
      });

      if (!response.ok) {
          console.error('Failed to fetch user profile');
          return;
          }
      const userDetails = await response.json();
      setUserdetails(userDetails);
        await getBalance()
    } catch (error) {
      console.error('Error fetching balance:', error);
    }
  };

  useEffect(() => {
    fetchBalance();
  }, []);

  

  return (
    <div className="max-w-xl mx-auto p-4 bg-white rounded-xl shadow-lg">
      {/* Balance Section */}
      <div className="text-center mb-8 p-6 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg text-white">
        <p className="text-sm mb-2">Total Balance</p>
        <h1 className="text-4xl font-bold">{balance ? (balance/LAMPORTS_PER_SOL): 0} sol</h1>
      </div>

      {/* Action Tabs */}
      <div className="flex mb-6 border-b">
        <button
          onClick={() => setActiveTab('send')}
          className={`flex items-center px-4 py-2 ${
            activeTab === 'send'
              ? 'border-b-2 border-blue-500 text-blue-500'
              : 'text-gray-500'
          }`}
        >
          <Send className="w-4 h-4 mr-2" />
          Send
        </button>
        <button
          onClick={() => setActiveTab('deposit')}
          className={`flex items-center px-4 py-2 ${
            activeTab === 'deposit'
              ? 'border-b-2 border-blue-500 text-blue-500'
              : 'text-gray-500'
          }`}
        >
          <ArrowDownLeft className="w-4 h-4 mr-2" />
          Deposit
        </button>
        <button
          onClick={() => setActiveTab('swap')}
          className={`flex items-center px-4 py-2 ${
            activeTab === 'swap'
              ? 'border-b-2 border-blue-500 text-blue-500'
              : 'text-gray-500'
          }`}
        >
          <Repeat className="w-4 h-4 mr-2" />
          Swap
        </button>
        
      </div>

      {/* Action Content */}
      <div className="mb-8">
        {activeTab === 'send' && (
          <SendSol refreshBalance={getBalance} />
        )}
        {activeTab === 'deposit' && (
          <Deposit userDetails={userDetails}/>
        )}
        {activeTab === 'swap' && (
          <Swap/>
        )}
   
      </div>

      {/* Transaction History */}
      <div>
        <div className="flex items-center mb-4">
          <Clock className="w-4 h-4 mr-2 text-gray-500" />
          <h2 className="text-lg font-medium">Recent Activity</h2>
        </div>
        <Transactions/>
      </div>
    </div>
  );
};

export default Wallet;

