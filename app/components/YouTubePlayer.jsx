"use client"

import { useState, useEffect, useRef } from 'react'
import YouTube from 'react-youtube'
import { Pause, Play, SkipForward, Volume2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'

export default function YouTubePlayer({
  videoId,
  onEnded,
  onStateChange,
  isHost = false,
  syncTimestamp = null,
}) {
  const [isPlaying, setIsPlaying] = useState(true)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [volume, setVolume] = useState(80)
  const playerRef = useRef(null)
  const progressInterval = useRef(null)

  // Format time in MM:SS
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = Math.floor(seconds % 60)
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  // Toggle play/pause
  const togglePlayPause = () => {
    if (!playerRef.current) return

    if (isPlaying) {
      playerRef.current.pauseVideo()
    } else {
      playerRef.current.playVideo()
    }
    setIsPlaying(!isPlaying)
  }

  // Skip to next track
  const handleSkip = () => {
    if (onEnded) {
      onEnded()
    }
  }

  // Handle volume change
  const handleVolumeChange = (newValue) => {
    if (!playerRef.current) return
    
    const volumeValue = newValue[0]
    setVolume(volumeValue)
    playerRef.current.setVolume(volumeValue)
  }

  // Handle YouTube player state changes
  const handleStateChange = (event) => {
    const playerState = event.data
    
    // YouTube states: -1 (unstarted), 0 (ended), 1 (playing), 2 (paused), 3 (buffering), 5 (video cued)
    if (playerState === 1) {
      setIsPlaying(true)
      setDuration(event.target.getDuration())
      
      // Start progress tracking
      if (progressInterval.current) clearInterval(progressInterval.current)
      progressInterval.current = setInterval(() => {
        const currentTime = event.target.getCurrentTime()
        setCurrentTime(currentTime)
        setProgress((currentTime / event.target.getDuration()) * 100)
      }, 1000)
    } else if (playerState === 2) {
      setIsPlaying(false)
      if (progressInterval.current) {
        clearInterval(progressInterval.current)
      }
    } else if (playerState === 0) {
      // Video ended
      if (progressInterval.current) {
        clearInterval(progressInterval.current)
      }
      if (onEnded) {
        onEnded()
      }
    }
    
    // Propagate state change to parent
    if (onStateChange) {
      onStateChange(playerState, event.target.getCurrentTime())
    }
  }

  // Handle player ready
  const handleReady = (event) => {
    playerRef.current = event.target
    playerRef.current.setVolume(volume)
    
    // If we have a timestamp to sync to, seek to it
    if (syncTimestamp !== null) {
      playerRef.current.seekTo(syncTimestamp)
    }
  }

  // Sync with timestamp from server
  useEffect(() => {
    if (playerRef.current && syncTimestamp !== null) {
      const currentTime = playerRef.current.getCurrentTime()
      // Only sync if off by more than 3 seconds
      if (Math.abs(currentTime - syncTimestamp) > 3) {
        playerRef.current.seekTo(syncTimestamp)
      }
    }
  }, [syncTimestamp])

  // Clean up interval on unmount
  useEffect(() => {
    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current)
      }
    }
  }, [])

  // YouTube player options
  const opts = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 1,
      controls: 0, // Hide YouTube controls
      disablekb: 1, // Disable keyboard controls
      iv_load_policy: 3, // Hide annotations
      modestbranding: 1, // Hide YouTube logo
      rel: 0, // Don't show related videos
      showinfo: 0, // Hide video info
    },
  }

  return (
    <div className="bg-gray-900 rounded-xl overflow-hidden">
      <div className="aspect-video bg-gradient-to-br from-purple-900 to-blue-900 relative">
        {videoId ? (
          <YouTube
            videoId={videoId}
            opts={opts}
            onReady={handleReady}
            onStateChange={handleStateChange}
            className="w-full h-full"
          />
        ) : (
          // Placeholder when no video is playing
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
        )}
      </div>

      {/* Player Controls */}
      <div className="p-4 flex flex-col gap-3">
        {/* Progress Bar */}
        <div className="space-y-1">
          <Slider defaultValue={[0]} max={100} step={1} value={[progress]} />
          <div className="flex justify-between text-xs text-gray-500">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full h-12 w-12"
              onClick={togglePlayPause}
              disabled={!videoId || !isHost}
            >
              {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full h-10 w-10"
              onClick={handleSkip}
              disabled={!videoId || !isHost}
            >
              <SkipForward className="h-5 w-5" />
            </Button>
          </div>

          <div className="flex items-center gap-2 w-32">
            <Volume2 className="h-4 w-4 text-gray-400" />
            <Slider 
              value={[volume]} 
              max={100} 
              step={1} 
              onValueChange={handleVolumeChange} 
            />
          </div>
        </div>
      </div>
    </div>
  )
}