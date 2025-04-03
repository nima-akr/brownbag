"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Music,
  Heart,
  MessageSquare,
  Users,
  Plus,
  ThumbsUp,
  ThumbsDown,
  Send,
  MoreHorizontal,
  ArrowLeft,
} from "lucide-react"
import Link from "next/link"
import YouTubePlayer from "../../../components/YouTubePlayer"
import YouTubeSearch from "../../../components/YouTubeSearch"
import useRoomSync from "../../../hooks/useRoomSync"

export default function RoomPage() {
  const params = useParams()
  const roomId = params.id
  const [message, setMessage] = useState("")
  const [showAddTrack, setShowAddTrack] = useState(false)
  const [userName, setUserName] = useState("")
  const [isJoined, setIsJoined] = useState(false)
  const [joinModalOpen, setJoinModalOpen] = useState(true)
  
  // Use our room sync hook
  const {
    connected,
    user,
    roomData,
    messages,
    users,
    queue,
    currentTrack,
    playerTimestamp,
    joinRoom,
    sendMessage,
    addTrack,
    nextTrack,
    handlePlayerStateChange
  } = useRoomSync(roomId)
  
  // Handler for sending messages
  const handleSendMessage = () => {
    if (message.trim() && user) {
      sendMessage(message.trim())
      setMessage("")
    }
  }
  
  // Handler for joining the room
  const handleJoinRoom = () => {
    if (userName.trim()) {
      joinRoom(userName.trim())
        .then(user => {
          if (user) {
            setIsJoined(true)
            setJoinModalOpen(false)
          }
        })
    }
  }
  
  // Handler for adding a track
  const handleAddTrack = (track) => {
    if (track && user) {
      addTrack(track)
      setShowAddTrack(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Join Room Modal */}
      {joinModalOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-xl p-6 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">Join {roomId.replace(/-/g, ' ')}</h2>
            <p className="text-gray-400 mb-6">Enter a nickname to join this room</p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Your Nickname</label>
                <Input 
                  className="bg-gray-800 border-gray-700"
                  placeholder="e.g., MusicLover123"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleJoinRoom()
                  }}
                />
              </div>
              
              <Button 
                className="w-full bg-purple-600 hover:bg-purple-700"
                onClick={handleJoinRoom}
                disabled={!userName.trim()}
              >
                Join Room
              </Button>
            </div>
          </div>
        </div>
      )}
      
      {/* Header */}
      <header className="border-b border-gray-800 bg-black/50 backdrop-blur-md sticky top-0 z-10">
        <div className="container mx-auto py-3 px-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Link href="/rooms">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <Music className="h-5 w-5 text-purple-500" />
              <h1 className="text-lg font-bold">{roomId.replace(/-/g, ' ')}</h1>
            </div>
            <Badge className="bg-purple-600">Study Beats</Badge>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 text-sm text-gray-400">
              <Users className="h-4 w-4" />
              <span>{users?.length || 0} listeners</span>
            </div>
            <Button variant="outline" size="sm">
              <Heart className="h-4 w-4 mr-2" />
              Favorite
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Music Player & Queue */}
        <div className="lg:col-span-2 space-y-6">
          {/* Music Player */}
          <YouTubePlayer 
            videoId={currentTrack?.videoId} 
            onEnded={nextTrack}
            onStateChange={handlePlayerStateChange}
            isHost={user?.isDj}
            syncTimestamp={playerTimestamp}
          />

          {/* Queue */}
          <div className="bg-gray-900 rounded-xl p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold">Up Next</h3>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setShowAddTrack(!showAddTrack)}
                disabled={!isJoined}
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Track
              </Button>
            </div>

            <div className="space-y-2">
              {queue && queue.length > 0 ? (
                queue.map((track, i) => (
                  <div key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-800">
                    <div className="w-10 h-10 bg-gray-800 rounded overflow-hidden">
                      {track.thumbnail ? (
                        <img 
                          src={track.thumbnail} 
                          alt={track.title} 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Music className="h-5 w-5 text-gray-400" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{track.title}</p>
                      <p className="text-sm text-gray-400 truncate">{track.channel}</p>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="bg-purple-900 text-xs">
                          {track.addedBy?.substring(0, 2) || "??"}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                      <ThumbsUp className="h-3 w-3 text-gray-400" />
                      <span>0</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-6 text-gray-500">
                  <p>The queue is empty</p>
                  <p className="text-sm mt-2">Add tracks to the queue to get started</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column - Chat & Users */}
        <div className="space-y-6">
          {/* Tabs for Chat and Users */}
          <Tabs defaultValue="chat" className="w-full">
            <TabsList className="w-full bg-gray-900">
              <TabsTrigger value="chat" className="flex-1">
                <MessageSquare className="h-4 w-4 mr-2" />
                Chat
              </TabsTrigger>
              <TabsTrigger value="users" className="flex-1">
                <Users className="h-4 w-4 mr-2" />
                Users
              </TabsTrigger>
            </TabsList>

            {/* Chat Tab */}
            <TabsContent value="chat" className="mt-0">
              <div className="bg-gray-900 rounded-b-xl p-4 flex flex-col h-[500px]">
                {/* Chat Messages */}
                <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                  {messages && messages.length > 0 ? (
                    messages.map((msg, i) => (
                      <ChatMessage
                        key={i}
                        name={msg.userName || 'Anonymous'}
                        message={msg.text}
                        time={new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        isHost={false}
                        isCurrentUser={msg.userId === user?.id}
                      />
                    ))
                  ) : (
                    <div className="text-center py-12 text-gray-500">
                      <p>No messages yet</p>
                      <p className="text-sm mt-2">Be the first to say hello!</p>
                    </div>
                  )}
                </div>

                {/* Chat Input */}
                <div className="relative">
                  <Input
                    className="bg-gray-800 border-gray-700 pr-10"
                    placeholder={isJoined ? "Type a message..." : "Join the room to chat..."}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && isJoined) {
                        handleSendMessage()
                      }
                    }}
                    disabled={!isJoined}
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 text-gray-400"
                    onClick={handleSendMessage}
                    disabled={!isJoined}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </TabsContent>

            {/* Users Tab */}
            <TabsContent value="users" className="mt-0">
              <div className="bg-gray-900 rounded-b-xl p-4 h-[500px] overflow-y-auto">
                <div className="space-y-1 mb-6">
                  <h4 className="text-sm font-medium text-gray-400 mb-2">
                    DJ QUEUE ({users?.filter(u => u.isDj)?.length || 0})
                  </h4>
                  {users && users.filter(u => u.isDj).length > 0 ? (
                    users.filter(u => u.isDj).map((user, i) => (
                      <UserItem
                        key={user.id}
                        name={user.name}
                        status="Now Playing"
                        avatar={user.name.substring(0, 2).toUpperCase()}
                        isDj={true}
                        isActive={i === 0}
                      />
                    ))
                  ) : (
                    <p className="text-sm text-gray-500 py-2">No DJs in the queue</p>
                  )}
                </div>

                <div className="space-y-1">
                  <h4 className="text-sm font-medium text-gray-400 mb-2">
                    LISTENERS ({users?.length || 0})
                  </h4>
                  {users && users.length > 0 ? (
                    users.map((user) => (
                      <UserItem
                        key={user.id}
                        name={user.name}
                        status="Listening"
                        avatar={user.name.substring(0, 2).toUpperCase()}
                        isCurrentUser={user.id === user?.id}
                      />
                    ))
                  ) : (
                    <p className="text-sm text-gray-500 py-2">No listeners yet</p>
                  )}
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {/* Search Tracks */}
          {showAddTrack && isJoined && (
            <YouTubeSearch onAddTrack={handleAddTrack} />
          )}
        </div>
      </main>
    </div>
  )
}

function ChatMessage({ name, message, time, isHost = false, isCurrentUser = false }) {
  return (
    <div className="flex items-start gap-3">
      <Avatar className="h-8 w-8">
        <AvatarFallback className={`text-xs ${isHost ? "bg-purple-700" : isCurrentUser ? "bg-blue-700" : "bg-gray-700"}`}>
          {name.substring(0, 2)}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className={`font-medium ${isHost ? "text-purple-400" : isCurrentUser ? "text-blue-400" : ""}`}>{name}</span>
          {isHost && <Badge className="bg-purple-700 text-xs py-0">Host</Badge>}
          {isCurrentUser && <Badge className="bg-blue-700 text-xs py-0">You</Badge>}
          <span className="text-xs text-gray-500">{time}</span>
        </div>
        <p className="text-gray-300">{message}</p>
      </div>
    </div>
  )
}

function UserItem({ name, status, avatar, isDj = false, isActive = false, isCurrentUser = false }) {
  return (
    <div className={`flex items-center gap-3 p-2 rounded-lg ${isActive ? "bg-purple-900/30" : isCurrentUser ? "bg-blue-900/30" : "hover:bg-gray-800"}`}>
      <Avatar className="h-8 w-8">
        <AvatarFallback className={`text-xs ${isDj ? "bg-purple-700" : isCurrentUser ? "bg-blue-700" : "bg-gray-700"}`}>{avatar}</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="font-medium">{name}</span>
          {isDj && isActive && <Badge className="bg-red-500 text-xs py-0">Live</Badge>}
          {isCurrentUser && <Badge className="bg-blue-700 text-xs py-0">You</Badge>}
        </div>
        <p className="text-xs text-gray-400">{status}</p>
      </div>
      <Button variant="ghost" size="icon" className="h-8 w-8">
        <MoreHorizontal className="h-4 w-4" />
      </Button>
    </div>
  )
}