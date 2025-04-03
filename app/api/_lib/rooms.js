// In-memory storage for rooms, queues and users
export const rooms = new Map();

// Function to get or create a room
export function getOrCreateRoom(roomId) {
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

// Function to add a user to a room
export function addUserToRoom(roomId, user) {
  const room = getOrCreateRoom(roomId);
  room.users.set(user.id, user);
  return user;
}

// Function to remove a user from a room
export function removeUserFromRoom(roomId, userId) {
  const room = getOrCreateRoom(roomId);
  const user = room.users.get(userId);
  if (user) {
    room.users.delete(userId);
  }
  return user;
}

// Function to get the next track in the queue
export function getNextTrack(roomId) {
  const room = getOrCreateRoom(roomId);
  if (room.queue.length > 0) {
    room.currentTrack = room.queue.shift();
    return room.currentTrack;
  }
  room.currentTrack = null;
  return null;
}

// Function to add a track to the queue
export function addTrackToQueue(roomId, track, userId) {
  const room = getOrCreateRoom(roomId);
  
  const trackToAdd = {
    ...track,
    addedBy: userId,
    addedAt: new Date().toISOString(),
  };
  
  room.queue.push(trackToAdd);
  
  // If there's no current track, set this as the current track
  if (!room.currentTrack) {
    room.currentTrack = room.queue.shift();
  }
  
  return trackToAdd;
}