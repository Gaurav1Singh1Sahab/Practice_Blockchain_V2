// Importing required librarires
const express = require('express');  // For Server
const cors = require('cors');  // For connecting different system "Cross-Origin-Remote-Server"
const bip39 = require('bip39'); // Importing seed libaries
const bip32 = require('bip32');
const ethWallet = require('ethereumjs-wallet'); // Importing wallet 

// Starting a server
const app = express();
app.use(cors());
const PORT = 4000;

app.get('/generate-wallets', async (req, res) => {
    try {
      const count = parseInt(req.query.count) || 1;
  
      if (count > 50) {
        return res.status(400).json({ error: 'Max 50 wallets allowed.' });
      }
  
      const mnemonic = bip39.generateMnemonic();
      const seed = await bip39.mnemonicToSeed(mnemonic);
      const root = bip32.fromSeed(seed);
  
      const wallets = [];
  
      for (let i = 0; i < count; i++) {
        const child = root.derivePath(`m/44'/60'/0'/0/${i}`);
        const wallet = ethWallet.default.fromPrivateKey(child.privateKey);
        wallets.push({
          index: i,
          address: wallet.getAddressString(),
          privateKey: wallet.getPrivateKeyString(),
          publicKey: wallet.getPublicKeyString(),
        });
      }
  
      res.json({
        mnemonic,
        wallets,
      });
    } catch (err) {
      console.error('Error:', err);
      res.status(500).json({ error: err.message });
    }
  });
  
  app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));