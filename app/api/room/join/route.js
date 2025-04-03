import { getOrCreateRoom, addUserToRoom } from '../../_lib/rooms';

export async function POST(request) {
  const data = await request.json();
  const { roomId, userName } = data;
  
  if (!roomId || !userName) {
    return Response.json({ error: 'Room ID and user name are required' }, { status: 400 });
  }
  
  const userId = crypto.randomUUID();
  
  // Create the user object
  const user = {
    id: userId,
    name: userName,
    joinedAt: new Date().toISOString(),
    isDj: false, // Initially not a DJ
  };
  
  // Add user to room
  addUserToRoom(roomId, user);
  
  return Response.json({
    success: true,
    user,
    roomId,
  });
}