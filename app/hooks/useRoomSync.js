"use client"

import { useState, useEffect, useCallback, useRef } from 'react'
import io from 'socket.io-client'

// This is a simplified implementation for the demo
// In a real app, you would use a proper WebSocket server
export default function useRoomSync(roomId, userName = 'Anonymous') {
  const [connected, setConnected] = useState(false)
  const [user, setUser] = useState(null)
  const [roomData, setRoomData] = useState(null)
  const [messages, setMessages] = useState([])
  const [users, setUsers] = useState([])
  const [queue, setQueue] = useState([])
  const [currentTrack, setCurrentTrack] = useState(null)
  const [error, setError] = useState(null)
  const [playerTimestamp, setPlayerTimestamp] = useState(null)
  
  const socketRef = useRef(null)
  const userIdRef = useRef(null)
  
  // For this demo, we'll use polling instead of WebSockets
  const pollingIntervalRef = useRef(null)

  // Join the room
  const joinRoom = useCallback(async () => {
    try {
      // Join the room via API
      const response = await fetch('/api/room/join', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ roomId, userName }),
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to join room')
      }
      
      // Save user data
      setUser(data.user)
      userIdRef.current = data.user.id
      
      // Get initial room data
      await fetchRoomData()
      
      // Set connected status
      setConnected(true)
      
      // Set up polling for room updates (simulating WebSocket)
      if (pollingIntervalRef.current) clearInterval(pollingIntervalRef.current)
      pollingIntervalRef.current = setInterval(fetchRoomData, 5000)
      
      return data.user
    } catch (err) {
      setError(err.message)
      return null
    }
  }, [roomId, userName])
  
  // Fetch the latest room data
  const fetchRoomData = useCallback(async () => {
    try {
      const response = await fetch(`/api/room?id=${roomId}`)
      const data = await response.json()
      
      if (response.ok) {
        setRoomData(data)
        setMessages(data.messages || [])
        setUsers(data.users || [])
        setQueue(data.queue || [])
        setCurrentTrack(data.currentTrack)
      }
    } catch (err) {
      console.error('Error fetching room data:', err)
    }
  }, [roomId])
  
  // Send a chat message
  const sendMessage = useCallback(async (message) => {
    if (!user || !roomId) return false
    
    try {
      const response = await fetch('/api/room/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          roomId,
          message,
          userId: user.id,
          userName: user.name,
        }),
      })
      
      const data = await response.json()
      
      if (response.ok) {
        // Optimistically update messages locally
        setMessages(prevMessages => [...prevMessages, data.message])
        return true
      }
      
      return false
    } catch (err) {
      console.error('Error sending message:', err)
      return false
    }
  }, [roomId, user])
  
  // Add a track to the queue
  const addTrack = useCallback(async (track) => {
    if (!user || !roomId) return false
    
    try {
      const response = await fetch('/api/room', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          roomId,
          track,
          userId: user.id,
        }),
      })
      
      const data = await response.json()
      
      if (response.ok) {
        // Update queue and current track
        setQueue(data.room.queue || [])
        setCurrentTrack(data.room.currentTrack)
        return true
      }
      
      return false
    } catch (err) {
      console.error('Error adding track:', err)
      return false
    }
  }, [roomId, user])
  
  // Move to the next track
  const nextTrack = useCallback(async () => {
    if (!user || !roomId || queue.length === 0) return false
    
    try {
      const nextTrackObj = queue[0]
      
      // Remove this track from the queue and set it as current
      setQueue(prevQueue => prevQueue.slice(1))
      setCurrentTrack(nextTrackObj)
      
      // In a real app, this would be synced via WebSocket
      return true
    } catch (err) {
      console.error('Error changing track:', err)
      return false
    }
  }, [roomId, user, queue])
  
  // Handle player state change to sync with other users
  const handlePlayerStateChange = useCallback((state, timestamp) => {
    // In a real app, this would be synced via WebSocket
    setPlayerTimestamp(timestamp)
  }, [])
  
  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current)
      }
    }
  }, [])
  
  return {
    connected,
    user,
    roomData,
    messages,
    users,
    queue,
    currentTrack,
    error,
    playerTimestamp,
    joinRoom,
    sendMessage,
    addTrack,
    nextTrack,
    handlePlayerStateChange,
  }
}