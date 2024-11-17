const openvpn = require('node-openvpn');

const opts = {
  config: '/path/to/your/config.ovpn', // Path to your OpenVPN config file
};

const vpn = openvpn.connect(opts);

vpn.on('connected', () => {
  console.log('VPN connected');
});

vpn.on('error', (error) => {
  console.error('VPN error:', error);
});

vpn.on('disconnected', () => {
  console.log('VPN disconnected');
});

// Disconnect the VPN
vpn.disconnect();
