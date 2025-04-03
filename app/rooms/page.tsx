import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Music, Plus, TrendingUp, Clock, Users } from "lucide-react"
import Link from "next/link"

export default function RoomsPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-black/50 backdrop-blur-md sticky top-0 z-10">
        <div className="container mx-auto py-4 px-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Music className="h-6 w-6 text-purple-500" />
            <h1 className="text-xl font-bold">VIBE.FM</h1>
          </div>
          <div className="flex-1 max-w-md mx-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
              <Input className="bg-gray-900 border-gray-700 pl-10 w-full" placeholder="Search rooms..." />
            </div>
          </div>
          <div className="flex gap-3">
            <Link href="/create-room">
              <Button variant="outline" size="sm">
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
          <Button variant="outline" className="rounded-full">
            Study Beats
          </Button>
          <Button variant="outline" className="rounded-full">
            Global Grooves
          </Button>
          <Button variant="outline" className="rounded-full">
            Rage Mode
          </Button>
          <Button variant="outline" className="rounded-full">
            Chill Vibes
          </Button>
          <Button variant="outline" className="rounded-full">
            Indie Discoveries
          </Button>
          <Button variant="outline" className="rounded-full">
            Electronic
          </Button>
          <Button variant="outline" className="rounded-full">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <RoomCard
              name="Lo-Fi Study Session"
              listeners={42}
              category="Study Beats"
              gradient="from-blue-600 to-purple-600"
              isLive={true}
            />
            <RoomCard
              name="Friday Night Party"
              listeners={128}
              category="Rage Mode"
              gradient="from-pink-600 to-orange-600"
              isLive={true}
            />
            <RoomCard
              name="Global Beats & Rhythms"
              listeners={76}
              category="Global Grooves"
              gradient="from-green-600 to-teal-600"
              isLive={true}
            />
          </div>
        </section>

        {/* Popular Rooms */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Popular Now</h2>
            <div className="flex items-center text-gray-400">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span className="text-sm">Based on current listeners</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: "Ambient Workspace", listeners: 89, category: "Focus" },
              { name: "Indie Discoveries", listeners: 67, category: "Indie" },
              { name: "Hip Hop Classics", listeners: 112, category: "Hip Hop" },
              { name: "Electronic Journeys", listeners: 54, category: "Electronic" },
            ].map((room, i) => (
              <RoomCardCompact key={i} {...room} />
            ))}
          </div>
        </section>

        {/* Recently Active */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Recently Active</h2>
            <div className="flex items-center text-gray-400">
              <Clock className="h-4 w-4 mr-1" />
              <span className="text-sm">Updated recently</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: "Jazz & Coffee", listeners: 23, category: "Jazz" },
              { name: "Coding Soundtrack", listeners: 45, category: "Focus" },
              { name: "Throwback Hits", listeners: 38, category: "Retro" },
              { name: "Acoustic Sessions", listeners: 19, category: "Acoustic" },
            ].map((room, i) => (
              <RoomCardCompact key={i} {...room} />
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

function RoomCard({ name, listeners, category, gradient, isLive }) {
  return (
    <Link href={`/rooms/${name.toLowerCase().replace(/\s+/g, '-')}`} className="block">
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

function RoomCardCompact({ name, listeners, category }) {
  return (
    <Link href={`/rooms/${name.toLowerCase().replace(/\s+/g, '-')}`} className="block">
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

