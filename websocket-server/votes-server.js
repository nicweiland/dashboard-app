const WebSocket = require('ws');
const PORT = 8081;

const wss = new WebSocket.Server({ port: PORT });

// Simulated vote data for different colors
const colors = ['Red', 'Blue', 'Yellow', 'Green', 'Purple'];

// Listen for new connections
wss.on('connection', (ws) => {
  console.log('New client connected');

  const sendVotes = () => {
    const color = colors[Math.floor(Math.random() * colors.length)];
    const data = {
      color,
      votes: Math.floor(Math.random() * 10) + 1, // Random number of votes
    };

    ws.send(JSON.stringify(data)); // Send the vote data
  };

  const intervalId = setInterval(sendVotes, 1000);

  ws.on('close', () => {
    console.log('Client disconnected');
    clearInterval(intervalId);
  });
});

console.log(`WebSocket server running on ws://localhost:${PORT}`);