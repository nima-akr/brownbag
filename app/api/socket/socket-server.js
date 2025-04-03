// This is a mock implementation of a Socket.io server for the demo
// In a real application, you would set up a proper Socket.io server

import { Server } from 'socket.io';
import { getOrCreateRoom, addUserToRoom, removeUserFromRoom } from '../_lib/rooms';

// Map to store socket instances
const connectedSockets = new Map();

// Create a Socket.io server
let io;

export function initSocketServer(server) {
  if (io) return io;
  
  io = new Server(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  });
  
  io.on('connection', (socket) => {
    console.log('New client connected');
    
    // Join room
    socket.on('join_room', ({ roomId, userName }) => {
      console.log(`${userName} joining room ${roomId}`);
      
      // Create a user ID
      const userId = socket.id;
      
      // Create user object
      const user = {
        id: userId,
        name: userName,
        socketId: socket.id,
        joinedAt: new Date().toISOString(),
        isDj: false,
      };
      
      // Add user to room
      const room = getOrCreateRoom(roomId);
      socket.join(roomId);
      
      // Check if this is the first user (make them a DJ)
      if (room.users.size === 0) {
        user.isDj = true;
      }
      
      // Store user in room
      addUserToRoom(roomId, user);
      
      // Store socket info
      connectedSockets.set(socket.id, { userId, roomId });
      
      // Send current room state to the user
      socket.emit('room_joined', { 
        user,
        roomId,
        room: {
          id: room.id,
          queue: room.queue,
          currentTrack: room.currentTrack,
          users: Array.from(room.users.values()),
          messages: room.messages,
        }
      });
      
      // Notify everyone in the room
      socket.to(roomId).emit('user_joined', { user });
    });
    
    // Send message
    socket.on('send_message', ({ roomId, message }) => {
      const socketInfo = connectedSockets.get(socket.id);
      
      if (!socketInfo) return;
      
      const room = getOrCreateRoom(roomId);
      const user = room.users.get(socketInfo.userId);
      
      if (!user) return;
      
      // Create message object
      const newMessage = {
        id: Math.random().toString(36).substr(2, 9),
        text: message,
        userId: user.id,
        userName: user.name,
        timestamp: new Date().toISOString(),
      };
      
      // Add to room messages
      room.messages.push(newMessage);
      
      // Broadcast to room
      io.to(roomId).emit('new_message', { message: newMessage });
    });
    
    // Add track to queue
    socket.on('add_track', ({ roomId, track }) => {
      const socketInfo = connectedSockets.get(socket.id);
      
      if (!socketInfo) return;
      
      const room = getOrCreateRoom(roomId);
      const user = room.users.get(socketInfo.userId);
      
      if (!user) return;
      
      // Add track to queue
      const newTrack = {
        ...track,
        addedBy: user.id,
        addedByName: user.name,
        addedAt: new Date().toISOString(),
      };
      
      room.queue.push(newTrack);
      
      // If there's no current track, set this as current
      if (!room.currentTrack) {
        room.currentTrack = room.queue.shift();
      }
      
      // Broadcast to room
      io.to(roomId).emit('queue_updated', { 
        queue: room.queue,
        currentTrack: room.currentTrack,
      });
    });
    
    // Player state changed
    socket.on('player_state_changed', ({ roomId, state, timestamp }) => {
      const socketInfo = connectedSockets.get(socket.id);
      
      if (!socketInfo) return;
      
      const room = getOrCreateRoom(roomId);
      const user = room.users.get(socketInfo.userId);
      
      if (!user || !user.isDj) return;
      
      // Broadcast to everyone else
      socket.to(roomId).emit('player_sync', { state, timestamp });
    });
    
    // Next track
    socket.on('next_track', ({ roomId }) => {
      const socketInfo = connectedSockets.get(socket.id);
      
      if (!socketInfo) return;
      
      const room = getOrCreateRoom(roomId);
      const user = room.users.get(socketInfo.userId);
      
      if (!user || !user.isDj) return;
      
      // Move to next track
      if (room.queue.length > 0) {
        room.currentTrack = room.queue.shift();
      } else {
        room.currentTrack = null;
      }
      
      // Broadcast to room
      io.to(roomId).emit('queue_updated', { 
        queue: room.queue,
        currentTrack: room.currentTrack,
      });
    });
    
    // Disconnect
    socket.on('disconnect', () => {
      console.log('Client disconnected');
      
      const socketInfo = connectedSockets.get(socket.id);
      
      if (socketInfo) {
        const { userId, roomId } = socketInfo;
        const room = getOrCreateRoom(roomId);
        
        // Get the user
        const user = room.users.get(userId);
        
        // Remove user from room
        if (user) {
          removeUserFromRoom(roomId, userId);
          
          // If the user was a DJ, assign a new one
          if (user.isDj && room.users.size > 0) {
            const nextDj = Array.from(room.users.values())[0];
            nextDj.isDj = true;
            
            // Notify the room
            io.to(roomId).emit('dj_changed', { user: nextDj });
          }
          
          // Notify the room
          io.to(roomId).emit('user_left', { userId });
        }
        
        // Remove socket info
        connectedSockets.delete(socket.id);
      }
    });
  });
  
  return io;
}

export function getSocketServer() {
  return io;
}