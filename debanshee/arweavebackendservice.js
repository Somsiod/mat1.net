const express = require('express');
const Arweave = require('arweave');
const { exec } = require('child_process');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

// Arweave configuration
const arweave = Arweave.init({
  host: 'arweave.net',
  port: 443,
  protocol: 'https',
});

// Placeholder: Wallet for Arweave
let wallet = {}; // Load your Arweave wallet JSON here

// Endpoint to store email data
app.post('/send-email', async (req, res) => {
  const { recipient, subject, content } = req.body;

  try {
    const transaction = await arweave.createTransaction(
      { data: JSON.stringify({ recipient, subject, content, timestamp: Date.now() }) },
      wallet
    );
    transaction.addTag('App-Name', 'DecentralizedEmail');
    transaction.addTag('Content-Type', 'application/json');

    await arweave.transactions.sign(transaction, wallet);
    await arweave.transactions.post(transaction);

    res.json({ message: 'Email sent!', transactionId: transaction.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Placeholder: Fetch emails from Arweave (future implementation for filtering by sender/recipient)
app.get('/emails', async (req, res) => {
  res.json({ message: 'Fetch emails functionality coming soon.' });
});

// VPN integration via OpenVPN and WireGuard
app.post('/configure-vpn', (req, res) => {
  const { protocol, config } = req.body;

  const vpnCommand = protocol === 'wireguard'
    ? `wg-quick up ${config}`
    : `openvpn --config ${config}`;

  exec(vpnCommand, (error, stdout, stderr) => {
    if (error) {
      res.status(500).json({ error: stderr });
    } else {
      res.json({ message: `VPN configured using ${protocol}`, output: stdout });
    }
  });
});

app.listen(3000, () => console.log('Server running on port 3000'));
