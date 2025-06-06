"use client"

import { useEffect, useState, useRef, useCallback } from "react"
import dynamic from "next/dynamic"
import type { default as ReactPlayerType } from "react-player"

// Dynamically import ReactPlayer with no SSR
const ReactPlayer = dynamic(() => import("react-player/youtube.js"), {
  ssr: false,
  loading: () => (
    <div className="relative aspect-video overflow-hidden rounded bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white mx-auto mb-2"></div>
        <p className="text-sm text-gray-600 dark:text-gray-400">Loading video player...</p>
      </div>
    </div>
  ),
})

function SeekBackward() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5" />
    </svg>
  )
}

function SeekForward() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 4.5l7.5 7.5-7.5 7.5m6-15l7.5 7.5-7.5 7.5" />
    </svg>
  )
}

function Pause() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
    </svg>
  )
}

function Play() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
      />
    </svg>
  )
}

interface MediaPlayerProps {
  videoId: string
  timestamp?: number
  controls?: boolean
}

function generateYouTubeUrl(videoId: string) {
  const baseUrl = new URL("https://www.youtube.com/watch")
  baseUrl.searchParams.append("v", videoId)
  return baseUrl.href
}

const reactPlayer = "absolute inset-0"
const playerWrapper = "relative aspect-video overflow-hidden rounded"
const playerControlsWrapper = "absolute inset-0 z-10 w-full h-full"
const playerControls = "absolute inset-0 flex flex-col justify-between opacity-0 transition-opacity duration-200"
const playerControlsButton = "bg-black/30 text-white/50 border-none p-2 rounded cursor-pointer hover:bg-black/90 hover:text-white/70 transition-all"
const playerCenterControls = "flex items-center justify-between px-8 mt-8 flex-1"
const playerBottomControls = "p-2 bg-gradient-to-t from-black/30 to-transparent"

export function MediaPlayer({ videoId, timestamp, controls = false }: Readonly<MediaPlayerProps>) {
  const playerRef = useRef<ReactPlayerType>(null)
  const [playing, setPlaying] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)

  // Prevent hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSeekToTimestamp = useCallback(
    (timestamp: number | undefined) => {
      if (timestamp && playerRef.current && mounted) {
        playerRef.current.seekTo(timestamp)
        setPlaying(true)
      }
    },
    [mounted],
  )

  const togglePlay = () => {
    if (playerRef.current && mounted) {
      setPlaying(!playing)
    }
  }

  const seekForward = () => {
    if (playerRef.current && mounted) {
      playerRef.current.seekTo(playerRef.current.getCurrentTime() + 5)
    }
  }

  const seekBackward = () => {
    if (playerRef.current && mounted) {
      playerRef.current.seekTo(playerRef.current.getCurrentTime() - 5)
    }
  }

  useEffect(() => {
    if (mounted) {
      handleSeekToTimestamp(timestamp)
    }
  }, [timestamp, handleSeekToTimestamp, mounted])

  const handleProgress = (state: { playedSeconds: number }) => {
    setProgress(state.playedSeconds)
  }

  const handleDuration = (duration: number) => {
    setDuration(duration)
  }

  const handleScrub = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value)
    if (playerRef.current && mounted) {
      playerRef.current.seekTo(newTime)
      setProgress(newTime)
    }
  }

  if (!videoId || !mounted) {
    return (
      <div className="relative aspect-video overflow-hidden rounded bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white mx-auto mb-2"></div>
          <p className="text-sm text-gray-600 dark:text-gray-400">Loading video player...</p>
        </div>
      </div>
    )
  }

  const videoUrl = generateYouTubeUrl(videoId)

  return (
    <div className="relative">
      <div className={playerWrapper}>
        <ReactPlayer
          ref={playerRef}
          url={videoUrl}
          width="100%"
          height="100%"
          controls={false}
          className={reactPlayer}
          playing={playing}
          onProgress={handleProgress}
          onDuration={handleDuration}
        />
        {controls && (
          <div
            className={playerControlsWrapper}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
          >
            <div className={`${playerControls} ${hovering ? 'opacity-100' : ''}`}>
              <div className={playerCenterControls}>
                <button onClick={seekBackward} className={playerControlsButton}>
                  <SeekBackward />
                </button>
                <button onClick={togglePlay} className={playerControlsButton}>
                  {playing ? <Pause /> : <Play />}
                </button>
                <button onClick={seekForward} className={playerControlsButton}>
                  <SeekForward />
                </button>
              </div>
              <div className={playerBottomControls}>
                <div className="flex justify-between items-center mb-2">
                  <div className="text-xs text-white">
                    {formatTime(progress)} / {formatTime(duration)}
                  </div>
                </div>
                <input
                  type="range"
                  min={0}
                  max={duration}
                  value={progress}
                  onChange={handleScrub}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:hover:scale-110 [&::-webkit-slider-thumb]:transition-transform [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:hover:scale-110 [&::-moz-range-thumb]:transition-transform"
                  style={{
                    background: `linear-gradient(to right, #3b82f6 ${(progress / duration) * 100}%, #e5e7eb ${(progress / duration) * 100}%)`
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = Math.floor(seconds % 60)
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
}
