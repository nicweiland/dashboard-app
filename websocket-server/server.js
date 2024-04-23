const WebSocket = require('ws');
const PORT = 8080;

const wss = new WebSocket.Server({ port: PORT });

// Listen for new connections
wss.on('connection', (ws) => {
  console.log('New client connected');

  // Send real-time data every second
  setInterval(() => {
    const data = { timestamp: Date.now(), value: Math.random() * 100 };
    console.log('Sending data');
    ws.send(JSON.stringify(data));
  }, 1000);

  // Handle client disconnection
  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

console.log(`WebSocket server running on ws://localhost:${PORT}`);
