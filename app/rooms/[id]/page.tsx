"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Music,
  Search,
  Heart,
  SkipForward,
  Pause,
  Volume2,
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

export default function RoomPage() {
  const [message, setMessage] = useState("")
  const [isPlaying, setIsPlaying] = useState(true)

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
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
              <h1 className="text-lg font-bold">Lo-Fi Study Session</h1>
            </div>
            <Badge className="bg-purple-600">Study Beats</Badge>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 text-sm text-gray-400">
              <Users className="h-4 w-4" />
              <span>42 listeners</span>
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
          <div className="bg-gray-900 rounded-xl overflow-hidden">
            <div className="aspect-video bg-gradient-to-br from-purple-900 to-blue-900 relative">
              {/* Audio Visualizer Placeholder */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex gap-3 h-16">
                  {[...Array(12)].map((_, i) => (
                    <div
                      key={i}
                      className="w-2 bg-white/70 rounded-full animate-pulse"
                      style={{
                        height: `${Math.random() * 100}%`,
                        animationDuration: `${0.8 + Math.random() * 1}s`,
                      }}
                    ></div>
                  ))}
                </div>
              </div>

              {/* Track Info Overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Now Playing</p>
                    <h3 className="text-xl font-bold">Midnight Study Session</h3>
                    <p className="text-gray-400">ChillBeats</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon" className="rounded-full h-10 w-10 bg-black/30">
                      <ThumbsUp className="h-5 w-5" />
                    </Button>
                    <Button variant="outline" size="icon" className="rounded-full h-10 w-10 bg-black/30">
                      <ThumbsDown className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Player Controls */}
            <div className="p-4 flex flex-col gap-3">
              {/* Progress Bar */}
              <div className="space-y-1">
                <Slider defaultValue={[33]} max={100} step={1} />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>1:45</span>
                  <span>5:20</span>
                </div>
              </div>

              {/* Controls */}
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full h-12 w-12"
                    onClick={() => setIsPlaying(!isPlaying)}
                  >
                    {isPlaying ? <Pause className="h-5 w-5" /> : <Pause className="h-5 w-5" />}
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full h-10 w-10">
                    <SkipForward className="h-5 w-5" />
                  </Button>
                </div>

                <div className="flex items-center gap-2 w-32">
                  <Volume2 className="h-4 w-4 text-gray-400" />
                  <Slider defaultValue={[80]} max={100} step={1} />
                </div>
              </div>
            </div>
          </div>

          {/* Queue */}
          <div className="bg-gray-900 rounded-xl p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold">Up Next</h3>
              <Button variant="ghost" size="sm">
                <Plus className="h-4 w-4 mr-1" />
                Add Track
              </Button>
            </div>

            <div className="space-y-2">
              {[
                { title: "Rainy Night Coffee Shop", artist: "Ambient Sounds", dj: "ChillMaster", votes: 12 },
                { title: "Focus Flow", artist: "Study Beats", dj: "BrainWave", votes: 8 },
                { title: "Midnight Coding", artist: "Lo-Fi Producers", dj: "CodeNinja", votes: 5 },
              ].map((track, i) => (
                <div key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-800">
                  <div className="w-10 h-10 bg-gray-800 rounded flex items-center justify-center">
                    <Music className="h-5 w-5 text-gray-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{track.title}</p>
                    <p className="text-sm text-gray-400 truncate">{track.artist}</p>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="bg-purple-900 text-xs">{track.dj.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <span>{track.dj}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    <ThumbsUp className="h-3 w-3 text-gray-400" />
                    <span>{track.votes}</span>
                  </div>
                </div>
              ))}
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
                  <ChatMessage
                    name="ChillMaster"
                    message="Welcome everyone to the Lo-Fi Study Session! Let's focus and vibe together."
                    time="5:32 PM"
                    isHost={true}
                  />
                  <ChatMessage name="BrainWave" message="This track is perfect for studying 📚" time="5:35 PM" />
                  <ChatMessage name="MidnightCoder" message="Added some coding beats to the queue!" time="5:38 PM" />
                  <ChatMessage name="StudyBuddy" message="Anyone studying for finals?" time="5:40 PM" />
                  <ChatMessage name="LoFiLover" message="🔥🔥🔥" time="5:42 PM" />
                  <ChatMessage
                    name="ChillMaster"
                    message="Remember to upvote tracks you like so we can keep the good vibes going!"
                    time="5:45 PM"
                    isHost={true}
                  />
                </div>

                {/* Chat Input */}
                <div className="relative">
                  <Input
                    className="bg-gray-800 border-gray-700 pr-10"
                    placeholder="Type a message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 text-gray-400"
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
                  <h4 className="text-sm font-medium text-gray-400 mb-2">DJ QUEUE (3)</h4>
                  {[
                    { name: "ChillMaster", status: "Now Playing", avatar: "CM" },
                    { name: "BrainWave", status: "Up Next", avatar: "BW" },
                    { name: "CodeNinja", status: "In Queue", avatar: "CN" },
                  ].map((user, i) => (
                    <UserItem
                      key={i}
                      name={user.name}
                      status={user.status}
                      avatar={user.avatar}
                      isDj={true}
                      isActive={i === 0}
                    />
                  ))}
                </div>

                <div className="space-y-1">
                  <h4 className="text-sm font-medium text-gray-400 mb-2">LISTENERS (39)</h4>
                  {[
                    { name: "StudyBuddy", status: "Studying", avatar: "SB" },
                    { name: "LoFiLover", status: "Vibing", avatar: "LL" },
                    { name: "MidnightCoder", status: "Coding", avatar: "MC" },
                    { name: "CalmMind", status: "Meditating", avatar: "CM" },
                    { name: "BookWorm", status: "Reading", avatar: "BW" },
                  ].map((user, i) => (
                    <UserItem key={i} name={user.name} status={user.status} avatar={user.avatar} />
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {/* Search Tracks */}
          <div className="bg-gray-900 rounded-xl p-4">
            <h3 className="font-bold mb-3">Add to Queue</h3>
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
              <Input className="bg-gray-800 border-gray-700 pl-10 w-full" placeholder="Search for tracks..." />
            </div>

            <div className="space-y-2">
              <p className="text-sm text-gray-400">Recent Searches</p>
              {[
                { title: "Ambient Study Mix", artist: "ChillHop Music" },
                { title: "Productive Morning", artist: "Focus Beats" },
                { title: "Night Coding Session", artist: "Lo-Fi Producers" },
              ].map((track, i) => (
                <div key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-800 cursor-pointer">
                  <div className="w-8 h-8 bg-gray-800 rounded flex items-center justify-center">
                    <Music className="h-4 w-4 text-gray-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{track.title}</p>
                    <p className="text-xs text-gray-400 truncate">{track.artist}</p>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

function ChatMessage({ name, message, time, isHost = false }) {
  return (
    <div className="flex items-start gap-3">
      <Avatar className="h-8 w-8">
        <AvatarFallback className={`text-xs ${isHost ? "bg-purple-700" : "bg-gray-700"}`}>
          {name.substring(0, 2)}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className={`font-medium ${isHost ? "text-purple-400" : ""}`}>{name}</span>
          {isHost && <Badge className="bg-purple-700 text-xs py-0">Host</Badge>}
          <span className="text-xs text-gray-500">{time}</span>
        </div>
        <p className="text-gray-300">{message}</p>
      </div>
    </div>
  )
}

function UserItem({ name, status, avatar, isDj = false, isActive = false }) {
  return (
    <div className={`flex items-center gap-3 p-2 rounded-lg ${isActive ? "bg-purple-900/30" : "hover:bg-gray-800"}`}>
      <Avatar className="h-8 w-8">
        <AvatarFallback className={`text-xs ${isDj ? "bg-purple-700" : "bg-gray-700"}`}>{avatar}</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="font-medium">{name}</span>
          {isDj && isActive && <Badge className="bg-red-500 text-xs py-0">Live</Badge>}
        </div>
        <p className="text-xs text-gray-400">{status}</p>
      </div>
      <Button variant="ghost" size="icon" className="h-8 w-8">
        <MoreHorizontal className="h-4 w-4" />
      </Button>
    </div>
  )
}

