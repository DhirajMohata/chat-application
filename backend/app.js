const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const sequelize = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const messageRoutes = require('./routes/messagesRoutes');
const friendshipRoutes = require('./routes/friendships');

require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(cors());
app.use(express.json());

app.set('io', io); // Make io accessible in routes

// Routes
app.use('/auth', authRoutes);
app.use('/messages', messageRoutes);
app.use('/friendships', friendshipRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the chat app API');
});

// Start server
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Listen for messages from the client
  socket.on('sendMessage', (messageData) => {
    console.log('Message received:', messageData);

    // Broadcast the message to all clients except the sender
    socket.broadcast.emit('receiveMessage', messageData);
  });

  socket.on('typing' , (data) => {
    console.log('Typing received:', data);

    // Broadcast the message to all clients except the sender
    socket.broadcast.emit('typingRecived', data);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

const port = process.env.PORT || 5000;

sequelize.sync({ force: false })
  .then(() => {
    server.listen(port, () => console.log(`Server is running on port ${port}`));
  })
  .catch(error => console.log('Error syncing database:', error));
