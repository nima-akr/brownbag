import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Music, Users, Zap } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="container mx-auto py-6 px-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Music className="h-8 w-8 text-purple-500" />
          <h1 className="text-2xl font-bold">VIBE.FM</h1>
        </div>
        <div className="flex gap-4">
          <Button variant="ghost">About</Button>
          <Button variant="outline">Sign In</Button>
          <Button className="bg-purple-600 hover:bg-purple-700">Join Now</Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            Listen Together,
            <br />
            <span className="text-purple-500">Vibe Together</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-xl">
            Join a digital space where people gather to queue tracks, listen in real-time, chat, and vibe with others
            around the world.
          </p>
          <div className="flex gap-4 pt-4">
            <Button className="bg-purple-600 hover:bg-purple-700 text-lg px-6 py-6">
              Enter a Room
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" className="text-lg px-6 py-6">
              How It Works
            </Button>
          </div>
        </div>
        <div className="flex-1 relative">
          <div className="w-full h-[400px] rounded-xl bg-gradient-to-br from-purple-900 to-blue-900 relative overflow-hidden">
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent animate-pulse"></div>
            <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center">
                  <Music className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Now Playing</p>
                  <p className="font-medium">Lofi Beats to Study To</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-8 h-8 rounded-full border-2 border-black bg-gradient-to-br from-purple-${(i + 3) * 100} to-blue-${(i + 3) * 100}`}
                    ></div>
                  ))}
                </div>
                <p className="text-sm text-gray-400">+24 listeners</p>
              </div>
            </div>
          </div>
          <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-xl bg-gradient-to-br from-pink-600 to-purple-600 rotate-12"></div>
          <div className="absolute -top-6 -left-6 w-16 h-16 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-600 -rotate-12"></div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center mb-16">How VIBE.FM Works</h2>
        <div className="grid md:grid-cols-3 gap-10">
          <FeatureCard
            icon={<Music className="h-10 w-10 text-purple-500" />}
            title="Live Music Queue"
            description="Search and queue tracks from YouTube, SoundCloud, or Spotify. Songs play in sync for everyone in the room."
          />
          <FeatureCard
            icon={<Users className="h-10 w-10 text-purple-500" />}
            title="DJ Rotation"
            description="Take turns adding songs to the queue. Vote to skip tracks you don't vibe with."
          />
          <FeatureCard
            icon={<Zap className="h-10 w-10 text-purple-500" />}
            title="Real-Time Chat"
            description="Chat alongside the music with text or emoji-only mode. React to tracks with fire emojis."
          />
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-20">
        <div className="bg-gradient-to-r from-purple-900 to-blue-900 rounded-2xl p-10 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to start your DJ journey?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of music lovers sharing their favorite tracks in real-time. No account required to get
            started.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-white text-purple-900 hover:bg-gray-100 text-lg px-6 py-6">Browse Rooms</Button>
            <Button variant="outline" className="border-white text-white hover:bg-white/10 text-lg px-6 py-6">
              Create Your Room
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-10 border-t border-gray-800">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Music className="h-6 w-6 text-purple-500" />
            <span className="text-xl font-bold">VIBE.FM</span>
          </div>
          <div className="flex gap-6 text-gray-400">
            <Link href="#" className="hover:text-white">
              About
            </Link>
            <Link href="#" className="hover:text-white">
              Privacy
            </Link>
            <Link href="#" className="hover:text-white">
              Terms
            </Link>
            <Link href="#" className="hover:text-white">
              Contact
            </Link>
          </div>
          <p className="text-gray-500">© 2025 VIBE.FM. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-gray-900 rounded-xl p-8 transition-all hover:bg-gray-800">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  )
}

