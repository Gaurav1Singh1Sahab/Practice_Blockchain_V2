import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [count, setCount] = useState(1);
  const [wallets, setWallets] = useState([]);
  const [mnemonic, setMnemonic] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const generateWallets = async () => {
    if (count < 1 || count > 50) {
      setError('Please enter a number between 1 and 50.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const res = await axios.get(`http://localhost:4000/generate-wallets?count=${count}`);

      setMnemonic(res.data.mnemonic);
      setWallets(res.data.wallets);
    } catch (err) {
      console.error('Full error:', err);
      const message = err.response?.data?.error || err.message;
      setError('Error: ' + message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App" style={{ padding: 20, fontFamily: 'Arial' }}>
      <h1>HD Wallet Generator</h1>
      <label>
        Number of wallets to generate (1–50):&nbsp;
        <input
          type="number"
          value={count}
          onChange={(e) => setCount(e.target.value)}
          min="1"
          max="50"
        />
      </label>
      <br />
      <br />
      <button onClick={generateWallets} disabled={loading}>
        {loading ? 'Generating...' : 'Generate Wallets'}
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {mnemonic && (
        <>
          <h3>Mnemonic:</h3>
          <p style={{ wordBreak: 'break-word' }}>{mnemonic}</p>
        </>
      )}

      {wallets.length > 0 && (
        <>
          <h3>Wallets:</h3>
          <div style={{ maxHeight: 400, overflowY: 'auto' }}>
            {wallets.map((wallet, index) => (
              <div key={index} style={{ border: '1px solid #ccc', padding: 10, marginBottom: 10 }}>
                <p><strong>Index:</strong> {wallet.index}</p>
                <p><strong>Address:</strong> {wallet.address}</p>
                <p><strong>Public Key:</strong> {wallet.publicKey}</p>
                <p><strong>Private Key:</strong> {wallet.privateKey}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
