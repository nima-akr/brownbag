import { getOrCreateRoom, addTrackToQueue } from '../_lib/rooms';

// API route for getting room info
export async function GET(request) {
  const url = new URL(request.url);
  const roomId = url.searchParams.get('id');
  
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

// API route for creating/updating a room
export async function POST(request) {
  const data = await request.json();
  const { name, description, theme, djMode, chatMode, voteToSkip, ambientMode } = data;
  
  if (!name) {
    return Response.json({ error: 'Room name is required' }, { status: 400 });
  }
  
  // Create a slug from the room name
  const roomId = name.toLowerCase().replace(/\s+/g, '-');
  
  const room = getOrCreateRoom(roomId);
  
  // Update room settings
  room.name = name;
  room.description = description;
  room.theme = theme;
  room.settings = {
    djMode: djMode || 'rotation',
    chatMode: chatMode || 'normal',
    voteToSkip: voteToSkip !== undefined ? voteToSkip : true,
    ambientMode: ambientMode !== undefined ? ambientMode : true,
  };
  
  return Response.json({
    success: true,
    room: {
      id: room.id,
      name: room.name,
      description: room.description,
      theme: room.theme,
      settings: room.settings,
    }
  });
}

// API route for adding a track to the queue
export async function PUT(request) {
  const data = await request.json();
  const { roomId, track, userId } = data;
  
  if (!roomId || !track || !track.videoId) {
    return Response.json({ error: 'Room ID and valid track data are required' }, { status: 400 });
  }
  
  const addedTrack = addTrackToQueue(roomId, track, userId || 'anonymous');
  const room = getOrCreateRoom(roomId);
  
  return Response.json({
    success: true,
    track: addedTrack,
    room: {
      id: room.id,
      queue: room.queue,
      currentTrack: room.currentTrack,
    }
  });
}