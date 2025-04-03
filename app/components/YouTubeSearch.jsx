"use client"

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search, Music, Plus } from 'lucide-react'

// Mock YouTube search results
const mockResults = [
  { 
    videoId: 'jfKfPfyJRdk',
    title: 'lofi hip hop radio - beats to relax/study to', 
    channel: 'Lofi Girl',
    thumbnail: 'https://i.ytimg.com/vi/jfKfPfyJRdk/hqdefault.jpg'
  },
  { 
    videoId: '5qap5aO4i9A', 
    title: 'lofi hip hop radio - beats to sleep/chill to', 
    channel: 'Lofi Girl',
    thumbnail: 'https://i.ytimg.com/vi/5qap5aO4i9A/hqdefault.jpg' 
  },
  { 
    videoId: 'DWcJFNfaw9c', 
    title: 'STUDY POWER | Focus, Increase Concentration, Calm Your Mind',
    channel: 'Yellow Brick Cinema', 
    thumbnail: 'https://i.ytimg.com/vi/DWcJFNfaw9c/hqdefault.jpg'
  },
  { 
    videoId: 'rUxyKA_-grg', 
    title: 'Deep Focus Music - 12 Hours Ambient Study Music', 
    channel: 'Quiet Quest - Study Music',
    thumbnail: 'https://i.ytimg.com/vi/rUxyKA_-grg/hqdefault.jpg' 
  },
  { 
    videoId: 'lTRiuFIWV54', 
    title: 'Zelda & Chill', 
    channel: 'GameChops',
    thumbnail: 'https://i.ytimg.com/vi/lTRiuFIWV54/hqdefault.jpg' 
  }
]

// Function to extract YouTube video ID from URL
function extractYouTubeId(url) {
  if (!url) return null
  
  // Match YouTube URL patterns
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
  const match = url.match(regExp)
  
  return (match && match[2].length === 11) ? match[2] : null
}

export default function YouTubeSearch({ onAddTrack }) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [isUrl, setIsUrl] = useState(false)
  
  // Handle search
  const handleSearch = () => {
    // Check if the query is a URL
    const videoId = extractYouTubeId(query)
    
    if (videoId) {
      setIsUrl(true)
      // Create a mock result for the URL
      setResults([{
        videoId,
        title: 'YouTube Video',
        channel: 'From URL',
        thumbnail: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`
      }])
      return
    }
    
    // For demo, use mock results
    // In a real app, you would call the YouTube API
    if (query.trim()) {
      setIsUrl(false)
      // Filter mock results based on query
      const filtered = mockResults.filter(
        result => result.title.toLowerCase().includes(query.toLowerCase()) ||
                  result.channel.toLowerCase().includes(query.toLowerCase())
      )
      setResults(filtered)
    }
  }
  
  // Handle key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }
  
  // Add track to queue
  const handleAddTrack = (result) => {
    if (onAddTrack) {
      onAddTrack({
        videoId: result.videoId,
        title: result.title,
        channel: result.channel,
        thumbnail: result.thumbnail
      })
    }
  }
  
  return (
    <div className="bg-gray-900 rounded-xl p-4">
      <h3 className="font-bold mb-3">Add to Queue</h3>
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
        <Input 
          className="bg-gray-800 border-gray-700 pl-10 w-full" 
          placeholder="Search or paste YouTube URL..." 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <Button 
          size="sm" 
          className="absolute right-1 top-1/2 transform -translate-y-1/2 h-7"
          onClick={handleSearch}
        >
          Search
        </Button>
      </div>

      <div className="space-y-2">
        {results.length > 0 ? (
          <>
            <p className="text-sm text-gray-400">{isUrl ? 'Video from URL' : 'Search Results'}</p>
            {results.map((result, i) => (
              <div key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-800 cursor-pointer">
                <div className="w-14 h-10 bg-gray-800 rounded overflow-hidden flex-shrink-0">
                  {result.thumbnail ? (
                    <img 
                      src={result.thumbnail} 
                      alt={result.title} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Music className="h-4 w-4 text-gray-400" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{result.title}</p>
                  <p className="text-xs text-gray-400 truncate">{result.channel}</p>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8"
                  onClick={() => handleAddTrack(result)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </>
        ) : query ? (
          <p className="text-sm text-gray-400">No results found</p>
        ) : (
          <p className="text-sm text-gray-400">
            Search for tracks or paste a YouTube URL
          </p>
        )}
      </div>
    </div>
  )
}