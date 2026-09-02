import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export const fetchTrackUrl = async (trackId: number): Promise<string> => {
  const r2BaseUrl = process.env.NEXT_PUBLIC_R2_URL || 'https://audio.nova-music.dev'
  const trackPath = `401k/${String(trackId).padStart(2, '0')}.mp3`
  return `${r2BaseUrl}/${trackPath}`
}

export const logPlaybackEvent = async (trackId: number, event: string) => {
  try {
    const { error } = await supabase.from('playback_events').insert({
      track_id: trackId,
      event_type: event,
      timestamp: new Date().toISOString(),
    })

    if (error) console.error('Error logging playback:', error)
  } catch (err) {
    console.error('Playback logging failed:', err)
  }
}
