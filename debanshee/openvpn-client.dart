const openvpnmanager = require('openvpn-client');

const opts = {
  config: '/path/to/your/openvpn-config.ovpn',
};

openvpnmanager.connect(opts);

openvpnmanager.on('connected', () => {
  console.log('OpenVPN connected');
});

openvpnmanager.on('error', (error) => {
  console.error('OpenVPN error:', error);
});

openvpnmanager.disconnect();
