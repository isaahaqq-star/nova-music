'use client'

import React, { useState, useEffect, useRef } from 'react'
import { TRACKS_401K, ALBUM_INFO } from '@/lib/tracks'
import { fetchTrackUrl, logPlaybackEvent } from '@/lib/supabase'
import Image from 'next/image'

export default function Player() {
  const [currentTrack, setCurrentTrack] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  const track = TRACKS_401K[currentTrack]

  // Load track URL
  useEffect(() => {
    const loadTrack = async () => {
      setIsLoading(true)
      try {
        const url = await fetchTrackUrl(currentTrack + 1)
        if (audioRef.current) {
          audioRef.current.src = url
          audioRef.current.load()
        }
        logPlaybackEvent(currentTrack + 1, 'track_loaded')
      } catch (error) {
        console.error('Failed to load track:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadTrack()
  }, [currentTrack])

  // Play/pause handler
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
        logPlaybackEvent(currentTrack + 1, 'paused')
      } else {
        audioRef.current.play()
        logPlaybackEvent(currentTrack + 1, 'playing')
      }
      setIsPlaying(!isPlaying)
    }
  }

  // Next track
  const nextTrack = () => {
    if (currentTrack < TRACKS_401K.length - 1) {
      setCurrentTrack(currentTrack + 1)
      setIsPlaying(true)
      logPlaybackEvent(currentTrack + 1, 'next_clicked')
    }
  }

  // Previous track
  const prevTrack = () => {
    if (currentTrack > 0) {
      setCurrentTrack(currentTrack - 1)
      setIsPlaying(true)
      logPlaybackEvent(currentTrack + 1, 'previous_clicked')
    }
  }

  // Update time display
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)
      setDuration(audioRef.current.duration)
    }
  }

  // Handle track end
  const handleTrackEnd = () => {
    logPlaybackEvent(currentTrack + 1, 'track_completed')
    nextTrack()
  }

  // Format time
  const formatTime = (time: number) => {
    if (!time || isNaN(time)) return '0:00'
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  // Seek
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value)
    if (audioRef.current) {
      audioRef.current.currentTime = time
      setCurrentTime(time)
      logPlaybackEvent(currentTrack + 1, 'seeked')
    }
  }

  return (
    <div className="player-container">
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleTrackEnd}
        onLoadedMetadata={() => setDuration(audioRef.current?.duration || 0)}
      />

      {/* Album Artwork */}
      <div className="mb-8">
        <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-lg overflow-hidden shadow-2xl bg-gray-900">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
              <div className="animate-spin w-8 h-8 border-4 border-nova-accent border-t-transparent rounded-full"></div>
            </div>
          )}
          <Image
            src={ALBUM_INFO.artworkUrl}
            alt={ALBUM_INFO.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* Track Info */}
      <div className="text-center mb-8">
        <div className="text-sm text-gray-400 mb-2">
          {track.track_number} / {TRACKS_401K.length}
        </div>
        <h1 className="track-title">{track.title}</h1>
        <p className="text-lg text-gray-300">{ALBUM_INFO.artist}</p>
        <p className="text-xs text-gray-500 mt-2">{ALBUM_INFO.title}</p>
      </div>

      {/* Progress Bar */}
      <div className="w-full max-w-md px-4 mb-4">
        <input
          type="range"
          min="0"
          max={duration || 0}
          value={currentTime}
          onChange={handleSeek}
          className="progress-bar w-full"
        />
        <div className="time-display">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="player-controls mb-8">
        <button
          onClick={prevTrack}
          disabled={currentTrack === 0}
          className="btn-control disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Previous track"
        >
          ⏮
        </button>

        <button
          onClick={togglePlay}
          disabled={isLoading}
          className="btn-control w-16 h-16 text-xl disabled:opacity-50"
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? '⏸' : '▶'}
        </button>

        <button
          onClick={nextTrack}
          disabled={currentTrack === TRACKS_401K.length - 1}
          className="btn-control disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Next track"
        >
          ⏭
        </button>
      </div>

      {/* Footer */}
      <p className="text-xs text-gray-500 text-center mt-8">
        NOVA MUSIC 401K • Private Listening Copy
      </p>
    </div>
  )
}
