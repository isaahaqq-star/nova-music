'use client'

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
const r2Url = process.env.NEXT_PUBLIC_R2_URL || 'https://audio.nova-music.dev'

const supabase = createClient(supabaseUrl, supabaseKey)

export async function fetchTrackUrl(trackNumber: number): Promise<string> {
  try {
    const url = `${r2Url}/audio/401k/${String(trackNumber).padStart(2, '0')}.mp3`
    return url
  } catch (error) {
    console.error('Error fetching track URL:', error)
    throw error
  }
}

export async function logPlaybackEvent(
  trackNumber: number,
  eventType: 'playing' | 'paused' | 'seeked' | 'track_loaded' | 'track_completed' | 'next_clicked' | 'previous_clicked'
): Promise<void> {
  try {
    await supabase.from('playback_events').insert({
      track_id: trackNumber,
      event_type: eventType,
      user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : 'unknown',
    })
  } catch (error) {
    console.warn('Failed to log playback event:', error)
  }
}
