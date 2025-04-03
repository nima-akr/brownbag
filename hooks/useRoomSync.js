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
  
  // For this demo, we'll use mock data instead of actual API calls
  // This would be replaced with real API calls in a production app
  
  // Join the room
  const joinRoom = useCallback(async (userName) => {
    try {
      const userId = 'user_' + Math.random().toString(36).substr(2, 9)
      
      // Create a mock user
      const newUser = {
        id: userId,
        name: userName,
        joinedAt: new Date().toISOString(),
        isDj: true, // First user is a DJ in this demo
      }
      
      userIdRef.current = userId
      setUser(newUser)
      
      // Add to mock users
      setUsers(prev => [...prev, newUser])
      
      // Simulate adding default tracks
      setQueue([
        {
          videoId: 'jfKfPfyJRdk',
          title: 'lofi hip hop radio - beats to relax/study to',
          channel: 'Lofi Girl',
          thumbnail: 'https://i.ytimg.com/vi/jfKfPfyJRdk/hqdefault.jpg',
          addedBy: userId,
          addedAt: new Date().toISOString()
        },
        {
          videoId: '5qap5aO4i9A',
          title: 'lofi hip hop radio - beats to sleep/chill to',
          channel: 'Lofi Girl',
          thumbnail: 'https://i.ytimg.com/vi/5qap5aO4i9A/hqdefault.jpg',
          addedBy: userId,
          addedAt: new Date().toISOString()
        }
      ])
      
      // Set the first track as current
      setCurrentTrack({
        videoId: 'DWcJFNfaw9c',
        title: 'STUDY POWER | Focus, Increase Concentration, Calm Your Mind',
        channel: 'Yellow Brick Cinema',
        thumbnail: 'https://i.ytimg.com/vi/DWcJFNfaw9c/hqdefault.jpg',
        addedBy: userId,
        addedAt: new Date().toISOString()
      })
      
      // Set room data
      setRoomData({
        id: roomId,
        name: roomId.replace(/-/g, ' '),
        theme: 'study',
        settings: {
          djMode: 'rotation',
          chatMode: 'normal',
          voteToSkip: true,
          ambientMode: true
        }
      })
      
      setConnected(true)
      return newUser
    } catch (err) {
      setError('Failed to join room')
      console.error(err)
      return null
    }
  }, [roomId])
  
  // Send a chat message
  const sendMessage = useCallback((messageText) => {
    if (!user) return false
    
    // Create message
    const newMessage = {
      id: 'msg_' + Math.random().toString(36).substr(2, 9),
      text: messageText,
      userId: user.id,
      userName: user.name,
      timestamp: new Date().toISOString()
    }
    
    // Add to messages
    setMessages(prev => [...prev, newMessage])
    return true
  }, [user])
  
  // Add a track to the queue
  const addTrack = useCallback((track) => {
    if (!user) return false
    
    // Add track with user info
    const newTrack = {
      ...track,
      addedBy: user.id,
      addedByName: user.name,
      addedAt: new Date().toISOString()
    }
    
    // If no current track, set as current
    if (!currentTrack) {
      setCurrentTrack(newTrack)
    } else {
      // Otherwise add to queue
      setQueue(prev => [...prev, newTrack])
    }
    
    return true
  }, [user, currentTrack])
  
  // Move to next track
  const nextTrack = useCallback(() => {
    if (!user || !user.isDj) return false
    
    if (queue.length > 0) {
      // Move first track in queue to current
      const nextTrack = queue[0]
      setCurrentTrack(nextTrack)
      setQueue(prev => prev.slice(1))
      return true
    } else {
      // No more tracks
      setCurrentTrack(null)
      return false
    }
  }, [user, queue])
  
  // Handle player state changes
  const handlePlayerStateChange = useCallback((state, timestamp) => {
    setPlayerTimestamp(timestamp)
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
    handlePlayerStateChange
  }
}