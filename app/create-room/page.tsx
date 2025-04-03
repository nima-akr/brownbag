"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft, Music, Users, Settings, Palette, MessageSquare, Zap } from "lucide-react"
import Link from "next/link"

export default function CreateRoomPage() {
  const router = useRouter()
  const [selectedTheme, setSelectedTheme] = useState("study")
  const [roomName, setRoomName] = useState("")
  const [roomDescription, setRoomDescription] = useState("")
  
  const handleCreateRoom = () => {
    // Create a slug from the room name or use a default
    const roomSlug = roomName ? roomName.toLowerCase().replace(/\s+/g, '-') : 'new-room'
    
    // In a real app, we would save the room data to a database here
    // For now, we'll just navigate to the new room
    router.push(`/rooms/${roomSlug}`)
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-black/50 backdrop-blur-md sticky top-0 z-10">
        <div className="container mx-auto py-4 px-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Link href="/rooms">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <h1 className="text-xl font-bold">Create a New Room</h1>
          </div>
          <Button className="bg-purple-600 hover:bg-purple-700" onClick={handleCreateRoom}>Create Room</Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column - Form */}
          <div className="md:col-span-2 space-y-8">
            {/* Basic Info */}
            <section className="bg-gray-900 rounded-xl p-6 space-y-4">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Music className="h-5 w-5 text-purple-500" />
                Room Details
              </h2>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="room-name">Room Name</Label>
                  <Input
                    id="room-name"
                    placeholder="e.g., Lo-Fi Study Session"
                    className="bg-gray-800 border-gray-700"
                    value={roomName}
                    onChange={(e) => setRoomName(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="room-description">Description</Label>
                  <Textarea
                    id="room-description"
                    placeholder="Tell people what your room is about..."
                    className="bg-gray-800 border-gray-700 min-h-[100px]"
                    value={roomDescription}
                    onChange={(e) => setRoomDescription(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Room Theme</Label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <ThemeCard
                      name="Study Beats"
                      id="study"
                      gradient="from-blue-600 to-purple-600"
                      selected={selectedTheme === "study"}
                      onClick={() => setSelectedTheme("study")}
                    />
                    <ThemeCard
                      name="Rage Mode"
                      id="rage"
                      gradient="from-pink-600 to-orange-600"
                      selected={selectedTheme === "rage"}
                      onClick={() => setSelectedTheme("rage")}
                    />
                    <ThemeCard
                      name="Global Grooves"
                      id="global"
                      gradient="from-green-600 to-teal-600"
                      selected={selectedTheme === "global"}
                      onClick={() => setSelectedTheme("global")}
                    />
                    <ThemeCard
                      name="Chill Vibes"
                      id="chill"
                      gradient="from-indigo-600 to-blue-600"
                      selected={selectedTheme === "chill"}
                      onClick={() => setSelectedTheme("chill")}
                    />
                    <ThemeCard
                      name="Indie Discoveries"
                      id="indie"
                      gradient="from-yellow-600 to-amber-600"
                      selected={selectedTheme === "indie"}
                      onClick={() => setSelectedTheme("indie")}
                    />
                    <ThemeCard
                      name="Custom"
                      id="custom"
                      gradient="from-gray-600 to-gray-700"
                      selected={selectedTheme === "custom"}
                      onClick={() => setSelectedTheme("custom")}
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Room Settings */}
            <section className="bg-gray-900 rounded-xl p-6 space-y-4">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Settings className="h-5 w-5 text-purple-500" />
                Room Settings
              </h2>

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Public Room</h3>
                    <p className="text-sm text-gray-400">Anyone can join your room</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="space-y-2">
                  <Label>DJ Mode</Label>
                  <RadioGroup defaultValue="rotation">
                    <div className="flex items-start space-x-2">
                      <RadioGroupItem value="rotation" id="rotation" />
                      <div className="grid gap-1.5">
                        <Label htmlFor="rotation" className="font-medium">
                          DJ Rotation
                        </Label>
                        <p className="text-sm text-gray-400">DJs take turns playing tracks in a queue</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <RadioGroupItem value="host" id="host" />
                      <div className="grid gap-1.5">
                        <Label htmlFor="host" className="font-medium">
                          Host Only
                        </Label>
                        <p className="text-sm text-gray-400">Only the room host can play tracks</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <RadioGroupItem value="collaborative" id="collaborative" />
                      <div className="grid gap-1.5">
                        <Label htmlFor="collaborative" className="font-medium">
                          Collaborative
                        </Label>
                        <p className="text-sm text-gray-400">Anyone can add tracks to the queue</p>
                      </div>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label>Chat Mode</Label>
                  <RadioGroup defaultValue="normal">
                    <div className="flex items-start space-x-2">
                      <RadioGroupItem value="normal" id="normal" />
                      <div className="grid gap-1.5">
                        <Label htmlFor="normal" className="font-medium">
                          Normal Chat
                        </Label>
                        <p className="text-sm text-gray-400">Standard chat with text and emojis</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <RadioGroupItem value="emoji" id="emoji" />
                      <div className="grid gap-1.5">
                        <Label htmlFor="emoji" className="font-medium">
                          Emoji Only
                        </Label>
                        <p className="text-sm text-gray-400">Limit chat to emojis only for a cleaner experience</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <RadioGroupItem value="slow" id="slow" />
                      <div className="grid gap-1.5">
                        <Label htmlFor="slow" className="font-medium">
                          Slow Mode
                        </Label>
                        <p className="text-sm text-gray-400">Users can only send messages every 10 seconds</p>
                      </div>
                    </div>
                  </RadioGroup>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Vote to Skip</h3>
                    <p className="text-sm text-gray-400">Allow listeners to vote to skip tracks</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Ambient Mode</h3>
                    <p className="text-sm text-gray-400">Enable animated backgrounds based on music</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </section>
          </div>

          {/* Right Column - Preview */}
          <div>
            <div className="bg-gray-900 rounded-xl p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-4">Room Preview</h2>

              <div
                className={`bg-gradient-to-br ${getGradientByTheme(selectedTheme)} rounded-lg h-48 relative overflow-hidden mb-4`}
              >
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                <div className="absolute bottom-0 left-0 p-4 w-full">
                  <div className="flex justify-between items-end">
                    <div>
                      <h3 className="text-lg font-bold">{roomName || "Your Room Name"}</h3>
                      <p className="text-sm text-gray-300">Hosted by You</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <FeatureItem
                  icon={<Users className="h-4 w-4 text-purple-500" />}
                  title="DJ Rotation"
                  description="Take turns playing tracks"
                />
                <FeatureItem
                  icon={<MessageSquare className="h-4 w-4 text-purple-500" />}
                  title="Normal Chat"
                  description="Text and emoji chat enabled"
                />
                <FeatureItem
                  icon={<Palette className="h-4 w-4 text-purple-500" />}
                  title="Ambient Mode"
                  description="Dynamic backgrounds enabled"
                />
                <FeatureItem
                  icon={<Zap className="h-4 w-4 text-purple-500" />}
                  title="Vote to Skip"
                  description="Democratic track skipping"
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

function ThemeCard({ name, id, gradient, selected, onClick }) {
  return (
    <div
      className={`bg-gradient-to-br ${gradient} rounded-lg p-3 cursor-pointer transition-all ${
        selected ? "ring-2 ring-white ring-offset-2 ring-offset-gray-900" : "opacity-70 hover:opacity-100"
      }`}
      onClick={onClick}
    >
      <p className="font-medium text-center">{name}</p>
    </div>
  )
}

function FeatureItem({ icon, title, description }) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5">{icon}</div>
      <div>
        <h4 className="font-medium">{title}</h4>
        <p className="text-sm text-gray-400">{description}</p>
      </div>
    </div>
  )
}

function getGradientByTheme(theme) {
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
    case "custom":
      return "from-gray-600 to-gray-700"
    default:
      return "from-blue-600 to-purple-600"
  }
}

