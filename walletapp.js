// src/App.js  
import React, { useState } from 'react';  
import { ethers } from 'ethers';  
import QRCode from 'qrcode.react';  

const App = () => {  
  const [wallet, setWallet] = useState(null);  
  const [secretPhrase, setSecretPhrase] = useState('');  
  const [privateKey, setPrivateKey] = useState('');  
  const [amount, setAmount] = useState('');  
  const [recipient, setRecipient] = useState('');  

  const createWallet = () => {  
    const newWallet = ethers.Wallet.createRandom();  
    setWallet(newWallet);  
    setSecretPhrase(newWallet.mnemonic.phrase);  
    setPrivateKey(newWallet.privateKey);  
  };  

  const sendTransaction = async () => {  
    if (!wallet || !recipient || !amount) return;  

    const provider = new ethers.providers.Web3Provider(window.ethereum);  
    const signer = wallet.connect(provider);  
    const tx = await signer.sendTransaction({  
      to: recipient,  
      value: ethers.utils.parseEther(amount),  
    });  
    console.log('Transaction:', tx);  
  };  

  const renderReceiveAddress = () => {  
    if (!wallet) return null;  
    return (  
      <div>  
        <h2>Receive</h2>  
        <QRCode value={wallet.address} />  
        <p>{wallet.address}</p>  
      </div>  
    );  
  };  

  return (  
    <div>  
      <h1>Multi-Chain DeFi Wallet</h1>  
      <button onClick={createWallet}>Create Wallet</button>  
      {wallet && (  
        <div>  
          <h2>Wallet Created</h2>  
          <p>Secret Phrase: {secretPhrase}</p>  
          <p>Private Key: {privateKey}</p>  
          {renderReceiveAddress()}  
          <input  
            type="text"  
            placeholder="Recipient Address"  
            value={recipient}  
            onChange={(e) => setRecipient(e.target.value)}  
          />  
          <input  
            type="text"  
            placeholder="Amount in ETH"  
            value={amount}  
            onChange={(e) => setAmount(e.target.value)}  
          />  
          <button onClick={sendTransaction}>Send</button>  
        </div>  
      )}  
    </div>  
  );  
};  

export default App;