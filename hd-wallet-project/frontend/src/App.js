import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [wallet, setWallet] = useState(null);

  const generateWallet = async () => {
    const res = await axios.get('http://localhost:4000/generate-wallet');
    setWallet(res.data);
  };

  return (
    <div className="App">
      <h1>HD Wallet Generator</h1>
      <button onClick={generateWallet}>Generate Wallet</button>
      {wallet && (
        <div>
          <p><strong>Mnemonic:</strong> {wallet.mnemonic}</p>
          <p><strong>Address:</strong> {wallet.address}</p>
          <p><strong>Private Key:</strong> {wallet.privateKey}</p>
          <p><strong>Public Key:</strong> {wallet.publicKey}</p>
        </div>
      )}
    </div>
  );
}

export default App;
