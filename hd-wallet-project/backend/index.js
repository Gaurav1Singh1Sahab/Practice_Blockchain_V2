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

app.get('/generate-wallet', async (req, res) => {
  try {
    const mnemonic = bip39.generateMnemonic();
    console.log("Mnemonic is :- ", mnemonic);
    const seed = await bip39.mnemonicToSeed(mnemonic);
    console.log("Seed is :- ", seed);
    const root = bip32.fromSeed(seed);
    console.log("Root is :- ", root);
    const child = root.derivePath("m/44'/60'/0'/0/0");

    const wallet = ethWallet.default.fromPrivateKey(child.privateKey);
    const address = wallet.getAddressString();

    res.json({
      mnemonic,
      address,
      privateKey: wallet.getPrivateKeyString(),
      publicKey: wallet.getPublicKeyString(),
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => console.log(`HD Wallet API running at http://localhost:${PORT}`));
