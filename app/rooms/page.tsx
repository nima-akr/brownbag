import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Music, Plus, TrendingUp, Clock } from "lucide-react"
import Link from "next/link"
import RoomGrid from "../../components/RoomGrid"

export default function RoomsPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-black/50 backdrop-blur-md sticky top-0 z-10">
        <div className="container mx-auto py-4 px-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Link href="/">
              <div className="flex items-center gap-2 cursor-pointer">
                <Music className="h-6 w-6 text-purple-500" />
                <h1 className="text-xl font-bold">VIBE.FM</h1>
              </div>
            </Link>
          </div>
          <div className="flex-1 max-w-md mx-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
              <Input className="bg-gray-900 border-gray-700 pl-10 w-full" placeholder="Search rooms..." />
            </div>
          </div>
          <div className="flex gap-3">
            <Link href="/create-room">
              <Button variant="outline" size="sm" className="text-white border-white hover:text-white hover:bg-white/10">
                <Plus className="h-4 w-4 mr-2" />
                Create Room
              </Button>
            </Link>
            <Button className="bg-purple-600 hover:bg-purple-700" size="sm">
              Profile
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Categories */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
          <Button variant="secondary" className="bg-purple-600 hover:bg-purple-700 rounded-full">
            All Rooms
          </Button>
          <Button variant="outline" className="rounded-full text-white border-white hover:text-white hover:bg-white/10">
            Study Beats
          </Button>
          <Button variant="outline" className="rounded-full text-white border-white hover:text-white hover:bg-white/10">
            Global Grooves
          </Button>
          <Button variant="outline" className="rounded-full text-white border-white hover:text-white hover:bg-white/10">
            Rage Mode
          </Button>
          <Button variant="outline" className="rounded-full text-white border-white hover:text-white hover:bg-white/10">
            Chill Vibes
          </Button>
          <Button variant="outline" className="rounded-full text-white border-white hover:text-white hover:bg-white/10">
            Indie Discoveries
          </Button>
          <Button variant="outline" className="rounded-full text-white border-white hover:text-white hover:bg-white/10">
            Electronic
          </Button>
          <Button variant="outline" className="rounded-full text-white border-white hover:text-white hover:bg-white/10">
            Hip Hop
          </Button>
        </div>

        {/* Featured Rooms */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Featured Rooms</h2>
            <Button variant="link" className="text-purple-400">
              View All
            </Button>
          </div>
          
          <RoomGrid />
        </section>
      </main>
    </div>
  )
}