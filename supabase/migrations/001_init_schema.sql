-- Create playback_events table for tracking listening activity
CREATE TABLE IF NOT EXISTS playback_events (
  id BIGSERIAL PRIMARY KEY,
  track_id INTEGER NOT NULL,
  event_type VARCHAR(50) NOT NULL,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  user_agent TEXT,
  ip_address INET,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create album metadata table
CREATE TABLE IF NOT EXISTS albums (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  artist VARCHAR(255) NOT NULL,
  release_year INTEGER,
  status VARCHAR(50) DEFAULT 'DRAFT',
  artwork_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create tracks table
CREATE TABLE IF NOT EXISTS tracks (
  id SERIAL PRIMARY KEY,
  album_id INTEGER NOT NULL REFERENCES albums(id),
  track_number INTEGER NOT NULL,
  title VARCHAR(255) NOT NULL,
  duration_seconds INTEGER,
  audio_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(album_id, track_number)
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_playback_events_track_id ON playback_events(track_id);
CREATE INDEX IF NOT EXISTS idx_playback_events_timestamp ON playback_events(timestamp);
CREATE INDEX IF NOT EXISTS idx_playback_events_event_type ON playback_events(event_type);
CREATE INDEX IF NOT EXISTS idx_tracks_album_id ON tracks(album_id);
CREATE INDEX IF NOT EXISTS idx_albums_status ON albums(status);

-- Enable Row Level Security
ALTER TABLE playback_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE albums ENABLE ROW LEVEL SECURITY;
ALTER TABLE tracks ENABLE ROW LEVEL SECURITY;

-- Policy: Allow public read access to albums and tracks
CREATE POLICY "Allow public select on albums" ON albums
  FOR SELECT USING (true);

CREATE POLICY "Allow public select on tracks" ON tracks
  FOR SELECT USING (true);

-- Policy: Allow public insert on playback_events (no auth required)
CREATE POLICY "Allow public insert on playback_events" ON playback_events
  FOR INSERT WITH CHECK (true);

-- Policy: Prevent public delete/update operations
CREATE POLICY "Prevent public updates on albums" ON albums
  FOR UPDATE USING (false);

CREATE POLICY "Prevent public updates on tracks" ON tracks
  FOR UPDATE USING (false);
