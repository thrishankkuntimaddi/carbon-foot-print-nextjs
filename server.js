const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  },
  pingTimeout: 60000,
  pingInterval: 25000,
  transports: ['websocket'],
  allowUpgrades: false,
  maxHttpBufferSize: 1e8
});

// Store connected clients with their last active timestamp
const connectedClients = new Map();

// Simulate IoT data
function generateEmissionsData() {
  return {
    timestamp: Date.now(),
    energy: Math.random() * 50 + 50,    // 50-100 range
    transport: Math.random() * 40 + 40,  // 40-80 range
    waste: Math.random() * 30 + 20      // 20-50 range
  };
}

// Clean up inactive clients
setInterval(() => {
  const now = Date.now();
  for (const [clientId, lastActive] of connectedClients) {
    if (now - lastActive > 70000) { // Remove if inactive for more than 70 seconds
      connectedClients.delete(clientId);
      console.log('Removed inactive client:', clientId);
    }
  }
}, 30000);

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);
  
  // Store client with current timestamp
  connectedClients.set(socket.id, Date.now());

  // Send initial data
  socket.emit('emissions_update', generateEmissionsData());

  // Handle ping
  socket.on('ping', () => {
    connectedClients.set(socket.id, Date.now());
    socket.emit('pong');
  });

  // Handle disconnection
  socket.on('disconnect', (reason) => {
    console.log('Client disconnected:', socket.id, 'Reason:', reason);
    connectedClients.delete(socket.id);
  });

  // Handle errors
  socket.on('error', (error) => {
    console.error('Socket error for client', socket.id, ':', error);
  });
});

// Emit data every 3 seconds only if there are connected clients
const emitInterval = setInterval(() => {
  if (connectedClients.size > 0) {
    const data = generateEmissionsData();
    io.emit('emissions_update', data);
  }
}, 3000);

// Cleanup on server shutdown
process.on('SIGINT', () => {
  clearInterval(emitInterval);
  io.close(() => {
    console.log('Socket.IO server closed');
    process.exit(0);
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`WebSocket server running on port ${PORT}`);
}); 