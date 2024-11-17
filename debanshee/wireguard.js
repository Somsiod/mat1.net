const exec = require('child_process').exec;

// Start WireGuard VPN
exec('wg-quick up /etc/wireguard/wg0.conf', (error, stdout, stderr) => {
  if (error) {
    console.error('Error starting WireGuard:', stderr);
  } else {
    console.log('WireGuard started:', stdout);
  }
});

// Stop WireGuard VPN
exec('wg-quick down /etc/wireguard/wg0.conf', (error, stdout, stderr) => {
  if (error) {
    console.error('Error stopping WireGuard:', stderr);
  } else {
    console.log('WireGuard stopped:', stdout);
  }
});
