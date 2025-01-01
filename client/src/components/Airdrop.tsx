import React from 'react';
import { useRecoilValue } from 'recoil';
import { user } from '../atom/useratom';
import { connection } from '../atom/util';
import { LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';

const Airdrop = ({ refreshBalance }: { refreshBalance: () => void }) => {
    const [amount, setAmount] = React.useState<number>(0);
    const [loading, setLoading] = React.useState<boolean>(false);
    const userInfo = useRecoilValue(user);
    
    const handleClick = async () => {
        setLoading(true);
        try {
            await connection.requestAirdrop(new PublicKey(userInfo.publicKey), amount * LAMPORTS_PER_SOL);
            await refreshBalance();
        } catch (error) {
            console.error('Error fetching balance:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='flex flex-col items-center justify-center h-[30rem] bg-gradient-to-r from-blue-500 to-purple-600'>
            <h1 className='text-5xl font-bold text-white mb-8'>Airdrop</h1>
            <div className='bg-white p-8 rounded-lg shadow-lg w-96'>
                <input 
                    className='border border-gray-300 rounded px-4 py-2 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500' 
                    type="number" 
                    placeholder="Enter amount in SOL" 
                    value={amount} 
                    onChange={(e) => setAmount(Number(e.target.value))} 
                />
                <button 
                    className={`bg-blue-500 text-white rounded px-4 py-2 w-full hover:bg-blue-600 transition duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`} 
                    onClick={handleClick}
                    disabled={loading}
                >
                    {loading ? 'Processing...' : 'Get Airdrop'}
                </button>
            </div>
        </div>
    );
};

export default Airdrop;
