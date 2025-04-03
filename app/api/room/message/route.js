// In-memory storage for rooms
import { rooms, getOrCreateRoom } from '../../_lib/rooms';

export async function POST(request) {
  const data = await request.json();
  const { roomId, message, userId, userName } = data;
  
  if (!roomId || !message || !userId) {
    return Response.json({ error: 'Room ID, message, and user ID are required' }, { status: 400 });
  }
  
  const room = getOrCreateRoom(roomId);
  
  // Create the message object
  const newMessage = {
    id: crypto.randomUUID(),
    text: message,
    userId,
    userName: userName || 'Anonymous',
    timestamp: new Date().toISOString(),
  };
  
  // Add the message to the room
  room.messages.push(newMessage);
  
  // Limit messages history to 100 
  if (room.messages.length > 100) {
    room.messages = room.messages.slice(-100);
  }
  
  return Response.json({
    success: true,
    message: newMessage,
  });
}