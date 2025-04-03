"use client"

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users } from "lucide-react"
import Link from "next/link"

export default function RoomGrid() {
  const [rooms, setRooms] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // In a real app, this would fetch from an API endpoint that returns all rooms
    // For the demo, we'll use mock data
    const mockRooms = [
      {
        id: "lo-fi-study-session",
        name: "Lo-Fi Study Session",
        description: "Relaxing beats for studying and concentration",
        theme: "study",
        listeners: 42,
        isLive: true
      },
      {
        id: "friday-night-party",
        name: "Friday Night Party",
        description: "High energy tracks to kick off the weekend",
        theme: "rage",
        listeners: 128,
        isLive: true
      },
      {
        id: "global-beats-rhythms",
        name: "Global Beats & Rhythms",
        description: "Music from around the world",
        theme: "global",
        listeners: 76,
        isLive: true
      },
      {
        id: "ambient-workspace",
        name: "Ambient Workspace",
        description: "Background music for focused work",
        theme: "chill",
        listeners: 89,
        isLive: true
      },
      {
        id: "indie-discoveries",
        name: "Indie Discoveries",
        description: "New and upcoming indie artists",
        theme: "indie",
        listeners: 67,
        isLive: true
      },
      {
        id: "hip-hop-classics",
        name: "Hip Hop Classics",
        description: "Throwback hip hop tracks",
        theme: "indie",
        listeners: 112,
        isLive: true
      }
    ]
    
    // Simulate API call
    setTimeout(() => {
      setRooms(mockRooms)
      setLoading(false)
    }, 500)
  }, [])

  // Get theme gradient based on room theme
  const getGradientByTheme = (theme) => {
    switch (theme) {
      case "study":
        return "from-blue-600 to-purple-600"
      case "rage":
        return "from-pink-600 to-orange-600"
      case "global":
        return "from-green-600 to-teal-600"
      case "chill":
        return "from-indigo-600 to-blue-600"
      case "indie":
        return "from-yellow-600 to-amber-600"
      default:
        return "from-gray-600 to-gray-700"
    }
  }

  // Featured rooms (top 3)
  const featuredRooms = rooms.slice(0, 3)
  
  // Popular rooms (next 4)
  const popularRooms = rooms.slice(3, 7)
  
  // Loading skeleton
  if (loading) {
    return (
      <>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-gray-900 rounded-xl h-48 animate-pulse"></div>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-gray-900 rounded-lg p-4 h-24 animate-pulse"></div>
          ))}
        </div>
      </>
    )
  }

  return (
    <>
      {/* Featured Rooms */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredRooms.map((room) => (
          <RoomCard
            key={room.id}
            id={room.id}
            name={room.name}
            listeners={room.listeners}
            category={room.theme.charAt(0).toUpperCase() + room.theme.slice(1)}
            gradient={getGradientByTheme(room.theme)}
            isLive={room.isLive}
          />
        ))}
      </div>
      
      {/* Popular Rooms */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
        {popularRooms.map((room) => (
          <RoomCardCompact
            key={room.id}
            id={room.id}
            name={room.name}
            listeners={room.listeners}
            category={room.theme.charAt(0).toUpperCase() + room.theme.slice(1)}
          />
        ))}
      </div>
    </>
  )
}

function RoomCard({ id, name, listeners, category, gradient, isLive }) {
  return (
    <Link href={`/rooms/${id}`} className="block">
      <div
        className={`bg-gradient-to-br ${gradient} rounded-xl h-48 relative overflow-hidden group transition-all hover:scale-[1.02]`}
      >
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

        {isLive && <Badge className="absolute top-3 right-3 bg-red-500 text-white">LIVE</Badge>}

        <div className="absolute bottom-0 left-0 p-4 w-full">
          <div className="flex justify-between items-end">
            <div>
              <Badge className="mb-2 bg-black/50 backdrop-blur-sm text-white">{category}</Badge>
              <h3 className="text-xl font-bold">{name}</h3>
            </div>
            <div className="flex items-center gap-1 text-sm">
              <Users className="h-4 w-4" />
              <span>{listeners}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

function RoomCardCompact({ id, name, listeners, category }) {
  return (
    <Link href={`/rooms/${id}`} className="block">
      <div className="bg-gray-900 rounded-lg p-4 transition-all hover:bg-gray-800">
        <Badge className="mb-2 bg-gray-800 text-gray-300">{category}</Badge>
        <h3 className="font-medium mb-2">{name}</h3>
        <div className="flex items-center gap-1 text-sm text-gray-400">
          <Users className="h-3 w-3" />
          <span>{listeners} listening</span>
        </div>
      </div>
    </Link>
  )
}