import { useState } from 'react';
import './App.css';
import { Connection, LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from '@solana/web3.js';

function App() {
  const [address, setAddress] = useState<string>('');
  const [amount, setAmount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const sendSol = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const connection = new Connection('https://api.devnet.solana.com', 'confirmed');

      // Validate recipient address
      if (!address) {
        throw new Error('Recipient address is required.');
      }
      const recipientPubKey = new PublicKey(address);

      // Validate amount
      if (amount <= 0) {
        throw new Error('Amount must be greater than 0.');
      }

      const senderPubKey = new PublicKey('');

      const ix = SystemProgram.transfer({
        fromPubkey: senderPubKey,
        toPubkey: recipientPubKey,
        lamports: amount * LAMPORTS_PER_SOL,
      });

      const tx = new Transaction().add(ix);
      tx.feePayer = senderPubKey;
      tx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;

      const serializedTx = tx.serialize({ requireAllSignatures: false, verifySignatures: false });

      const response = await fetch('http://localhost:3000/api/txn/sign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tx: serializedTx }),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || 'Transaction failed');
      }

      setSuccess(`Transaction successful! Signature: ${result.signature}`);
    } catch (err: any) {
      setError(err.message || 'An error occurred while sending SOL.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>Send SOL</h1>
      <input
        type="text"
        placeholder="Recipient Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <input
        type="number"
        placeholder="Amount (SOL)"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
      />
      <button onClick={sendSol} disabled={loading}>
        {loading ? 'Sending...' : 'Send'}
      </button>

      {error && <p className="error">Error: {error}</p>}
      {success && <p className="success">{success}</p>}
    </div>
  );
}

export default App;
