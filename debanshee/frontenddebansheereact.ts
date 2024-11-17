import React, { useState } from 'react';
import WalletConnectProvider from "@walletconnect/web3-provider";

const App = () => {
  const [connected, setConnected] = useState(false);
  const [emails, setEmails] = useState([]);

  const connectWallet = async () => {
    const provider = new WalletConnectProvider({
      infuraId: "YOUR_INFURA_PROJECT_ID", // Replace with your Infura project ID
    });

    await provider.enable();
    setConnected(true);
    console.log("Wallet connected");
  };

  const fetchEmails = async () => {
    // Placeholder: Fetch emails from backend
    const response = await fetch('/emails');
    const data = await response.json();
    setEmails(data);
  };

  return (
    <div>
      <h1>deBanshee@</h1>
      {!connected ? (
        <button onClick={connectWallet}>Connect Wallet</button>
      ) : (
        <>
          <button onClick={fetchEmails}>Fetch Emails</button>
          <ul>
            {emails.map((email, index) => (
              <li key={index}>
                To: {email.recipient} - Subject: {email.subject}
              </li>
            ))}
          </ul>
        </>
      )}

      {/* Placeholder for dashboard buttons */}
      <div className="dashboard">
        <button>VPN Configuration</button>
        <button>DeFi DApps</button>
        <button>Email Archive</button>
        <button>Placeholder DApp</button>
      </div>
    </div>
  );
};

export default App;
