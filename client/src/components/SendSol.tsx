import {  LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from '@solana/web3.js';
import React from 'react'
import { useRecoilValue } from 'recoil';
import { user } from '../atom/useratom';
import { connection } from '../atom/util';

const SendSol: React.FC<{ refreshBalance: () => void }> = ({ refreshBalance }) => {
    const [amount, setAmount] = React.useState<number>(0);
    const [recipient, setRecipient] = React.useState('');
    const userDetails = useRecoilValue(user);
    const [signature, setSignature] = React.useState<string | null>(null);
    const handleSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
      try{

        event.preventDefault();
        const ix = SystemProgram.transfer({
          fromPubkey: new PublicKey(userDetails.publicKey),
          toPubkey: new PublicKey(recipient),
          lamports: amount * LAMPORTS_PER_SOL, 
        });
        
        const tx = new Transaction().add(ix);
        tx.feePayer = new PublicKey(userDetails.publicKey);
        tx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
        const serializeTx = tx.serialize({ requireAllSignatures: false, verifySignatures: false });
        
        const response = await fetch('http://localhost:3000/api/txn/sign', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            
          },
                credentials: 'include',
                body: JSON.stringify({ tx:serializeTx }),
            });
            
            if (!response.ok) {
              console.error('Failed to send transaction');
              return;
            }
            
            const data = await response.json();
            setSignature(data.signature);
            await refreshBalance();
          } catch (error) {
            console.error('Error sending transaction:', error);
          }finally{
            setAmount(0);
            setRecipient('');
          }
            
            
          };
          return (
            <div className="">
      <h2 className="text-2xl font-bold mb-4 text-center">Send SOL</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
        Amount (SOL)
        </label>
        <input
        type="number"
        value={amount}
        
        
        onChange={(e) => setAmount(Number(e.target.value))}
        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        placeholder="0.00"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
        Recipient Address
        </label>
        <input
        type="text"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        placeholder="Enter Solana address"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
      >
        Send SOL
      </button>
      </form>
      {signature && (
      <div className="mt-4 p-4 bg-gray-100 rounded-lg">
        <p className="text-sm font-medium text-gray-700 mb-1">
        Transaction Signature:
        </p>
        <p className="text-sm text-gray-500 break-all">{signature}</p>
      </div>
      )}
    </div>
  )
}

export default SendSol
