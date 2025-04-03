// This file will be used for the WebSocket API route
// Note: In a production app, you would set up a separate WebSocket server
// For this demo, we'll store data in memory (it will reset when the server restarts)

// In-memory storage for rooms, queues and users
const rooms = new Map();

// Function to get or create a room
function getOrCreateRoom(roomId) {
  if (!rooms.has(roomId)) {
    rooms.set(roomId, {
      id: roomId,
      queue: [],
      currentTrack: null,
      users: new Map(),
      messages: [],
    });
  }
  return rooms.get(roomId);
}

// API route for room info
export async function GET(request) {
  const url = new URL(request.url);
  const roomId = url.searchParams.get('roomId');
  
  if (!roomId) {
    return Response.json({ error: 'Room ID is required' }, { status: 400 });
  }
  
  const room = getOrCreateRoom(roomId);
  
  return Response.json({
    id: room.id,
    queue: room.queue,
    currentTrack: room.currentTrack,
    users: Array.from(room.users.values()),
    messages: room.messages,
  });
}

// API route for adding a track to the queue
export async function POST(request) {
  const data = await request.json();
  const { roomId, track, userId } = data;
  
  if (!roomId || !track || !track.videoId) {
    return Response.json({ error: 'Room ID and valid track data are required' }, { status: 400 });
  }
  
  const room = getOrCreateRoom(roomId);
  
  // Add the track to the queue
  room.queue.push({
    ...track,
    addedBy: userId || 'anonymous',
    addedAt: new Date().toISOString(),
  });
  
  // If there's no current track, set this as the current track
  if (!room.currentTrack) {
    room.currentTrack = room.queue.shift();
  }
  
  return Response.json({
    success: true,
    room: {
      id: room.id,
      queue: room.queue,
      currentTrack: room.currentTrack,
    }
  });
}