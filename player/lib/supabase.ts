'use client'

import { createClient, SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

const r2Url =
  process.env.NEXT_PUBLIC_R2_URL ||
  'https://audio.nova-music.dev'

let supabase: SupabaseClient | null = null

if (supabaseUrl && supabaseKey) {
  supabase = createClient(supabaseUrl, supabaseKey)
}

export async function fetchTrackUrl(
  trackNumber: number
): Promise<string> {
  const formattedTrack = String(trackNumber).padStart(2, '0')

  return `${r2Url}/audio/401k/${formattedTrack}.mp3`
}

export async function logPlaybackEvent(
  trackNumber: number,
  eventType:
    | 'playing'
    | 'paused'
    | 'seeked'
    | 'track_loaded'
    | 'track_completed'
    | 'next_clicked'
    | 'previous_clicked'
): Promise<void> {
  if (!supabase) {
    return
  }

  try {
    const { error } = await supabase
      .from('playback_events')
      .insert({
        track_id: trackNumber,
        event_type: eventType,
        user_agent:
          typeof navigator !== 'undefined'
            ? navigator.userAgent
            : 'unknown',
      })

    if (error) {
      console.warn('Playback analytics error:', error.message)
    }
  } catch (error) {
    console.warn('Failed to log playback event:', error)
  }
}
