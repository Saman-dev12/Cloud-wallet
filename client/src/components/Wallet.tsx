import { Connection, LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';
import React, { useEffect, useState } from 'react';
import { ArrowDownLeft, Repeat, Clock, Send, DownloadCloud } from 'react-feather';
import { useRecoilState } from 'recoil';
import { user } from '../atom/useratom';
import SendSol from './SendSol';
import Deposit from './Deposit';
// import Swap from './Swap';
import Transactions from './Transactions';
import Airdrop from './Airdrop';

const Wallet: React.FC = () => {
  const connection = new Connection('https://api.devnet.solana.com', 'confirmed');
  const [balance, setBalance] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState('send');
  const [userInfo, setUserInfo] = useRecoilState(user);

  const getBalance = async () => {
    try {
      const publicKey = new PublicKey(userInfo.publicKey);
      const balance = await connection.getBalance(publicKey);
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
      setUserInfo(userDetails);
      const publicKey = new PublicKey(userDetails.publicKey);
      const balance = await connection.getBalance(publicKey);
      setBalance(balance);
    } catch (error) {
      console.error('Error fetching balance:', error);
    }
  };

  useEffect(() => {
    fetchBalance();
  }, []);

  return (
    <div className="max-w-xl mx-auto p-4 sm:p-6 md:p-8 bg-white rounded-xl shadow-lg">
      {/* Balance Section */}
      <div className="text-center mb-8 p-6 sm:p-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg text-white">
        <p className="text-sm sm:text-base mb-2">Total Balance</p>
        <h1 className="text-3xl sm:text-4xl font-bold">
          {balance ? balance / LAMPORTS_PER_SOL : 0} SOL
        </h1>
      </div>

      {/* Action Tabs */}
      <div className="flex space-x-10 justify-center items-center mb-6 border-b overflow-x-auto">
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
        {/* <button
          onClick={() => setActiveTab('swap')}
          className={`flex items-center px-4 py-2 ${
            activeTab === 'swap'
              ? 'border-b-2 border-blue-500 text-blue-500'
              : 'text-gray-500'
          }`}
        >
          <Repeat className="w-4 h-4 mr-2" />
          Swap
        </button> */}
        <button
          onClick={() => setActiveTab('Airdrop')}
          className={`flex items-center px-4 py-2 ${
            activeTab === 'Airdrop'
              ? 'border-b-2 border-blue-500 text-blue-500'
              : 'text-gray-500'
          }`}
        >
          <DownloadCloud className="w-4 h-4 mr-2" />
          Airdrop
        </button>
      </div>

      {/* Action Content */}
      <div className="mb-8">
        {activeTab === 'send' && <SendSol refreshBalance={getBalance} />}
        {activeTab === 'deposit' && <Deposit userDetails={userInfo} />}
        {/* {activeTab === 'swap' && <Swap />} */}
        {activeTab === 'Airdrop' && <Airdrop refreshBalance={getBalance} />}
      </div>

      {/* Transaction History */}
      <div>
        <div className="flex items-center mb-4">
          <Clock className="w-4 h-4 mr-2 text-gray-500" />
          <h2 className="text-lg sm:text-xl font-medium">Recent Activity</h2>
        </div>
        {userInfo && <Transactions userInfo={userInfo} />}
      </div>
    </div>
  );
};

export default Wallet;
