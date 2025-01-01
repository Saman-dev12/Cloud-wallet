import { ArrowDownLeft, ArrowUpRight } from 'react-feather';
import { PublicKey } from '@solana/web3.js';
import { useEffect, useState } from 'react';
import { connection } from '../atom/util';

interface Transaction {
  id: string;
  type: 'send' | 'receive';
  amount: number;
  date: string;
  status: 'completed';
  address: string;
}

const Transactions = ({ userInfo }: { userInfo: any }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);
      try {
        if (!userInfo.publicKey) {
          return;
        }

        const publicKey = new PublicKey(userInfo.publicKey);

        const signatures = await connection.getSignaturesForAddress(publicKey, {
          limit: 10,
        });

        const transactionDetails = await Promise.all(
          signatures.map(async (signatureInfo) => {
            const transaction = await connection.getTransaction(
              signatureInfo.signature,
              {
                commitment: 'confirmed',
              }
            );
            return transaction;
          })
        );

        const parsedTransactions: Transaction[] = transactionDetails
          .filter((tx: any) => !!tx) // Ensure valid transactions
          .map((tx: any) => {
            const isSend =
              tx.transaction.message.accountKeys[0].toBase58() ===
              userInfo.publicKey;
            const amount = tx.meta?.preBalances[0]! - tx.meta?.postBalances[0]!;

            return {
              id: tx.transaction.signatures[0],
              type: isSend ? 'send' : 'receive',
              amount: Math.abs(amount) / 1e9, // Convert lamports to SOL
              date: new Date(tx.blockTime! * 1000).toLocaleString(), // Localized date format
              status: 'completed',
              address: isSend
                ? tx.transaction.message.accountKeys[1].toBase58()
                : tx.transaction.message.accountKeys[0].toBase58(),
            };
          });

        setTransactions(parsedTransactions);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [userInfo.publicKey]);

  return (
    <div>
      <div className="space-y-3">
        {loading && (
          <p className="text-gray-500 text-center">Loading transactions...</p>
        )}
        {!loading && transactions.length === 0 && (
          <p className="text-gray-500 text-center">No transactions found</p>
        )}
        {transactions.map((tx) => (
          <div
            key={tx.id}
            className="flex flex-col sm:flex-row items-center justify-between p-4 bg-gray-50 rounded-lg shadow-sm"
          >
            <div className="flex items-center mb-2 sm:mb-0">
              {tx.type === 'send' ? (
                <ArrowUpRight className="w-5 h-5 text-red-500 mr-3" />
              ) : (
                <ArrowDownLeft className="w-5 h-5 text-green-500 mr-3" />
              )}
              <div>
                <p className="font-medium">
                  {tx.type === 'send' ? 'Sent' : 'Received'} SOL
                </p>
                <p className="text-sm text-gray-500 truncate">{tx.address}</p>
              </div>
            </div>
            <div className="text-right">
              <p
                className={`font-medium ${
                  tx.type === 'send' ? 'text-red-500' : 'text-green-500'
                }`}
              >
                {tx.type === 'send' ? '-' : '+'}
                {tx.amount} SOL
              </p>
              {/* <p className="text-sm text-gray-500">{tx.date}</p> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Transactions;
