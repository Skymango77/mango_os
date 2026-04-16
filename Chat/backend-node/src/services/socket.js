// backend-node/src/services/socket.js
const socketIo = require('socket.io');
const Message = require('../models/Message');

module.exports = (server) => {
    const io = socketIo(server, { cors: { origin: '*' } });

    io.on('connection', (socket) => {
        console.log('User connected:', socket.id);

        // Join specific chat room
        socket.on('joinRoom', (roomId) => {
            socket.join(roomId);
        });

        // Handle incoming message
        socket.on('sendMessage', async (data) => {
            const { roomId, senderId, content } = data;
            
            // Save to DB
            const newMessage = await Message.create({ chat_id: roomId, sender_id: senderId, content });
            
            // Broadcast to room
            io.to(roomId).emit('newMessage', newMessage);
        });
    });
};