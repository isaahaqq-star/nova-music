-- Insert 401K album metadata
INSERT INTO albums (title, artist, release_year, status, artwork_url)
VALUES (
  '401K',
  'YolaJo',
  2026,
  'DRAFT',
  '/artwork/401k.jpg'
) ON CONFLICT DO NOTHING;

-- Insert 401K tracks (12 tracks in order)
INSERT INTO tracks (album_id, track_number, title, audio_url)
SELECT 
  a.id,
  track_num,
  track_title,
  audio_path
FROM (
  SELECT 1 as track_num, 'STOP PLAYING WITH ME' as track_title, '/audio/401k/01.mp3' as audio_path UNION ALL
  SELECT 2, 'BANKROLLS & POLES', '/audio/401k/02.mp3' UNION ALL
  SELECT 3, 'TRAP JUMPIN', '/audio/401k/03.mp3' UNION ALL
  SELECT 4, 'FULL EFFECT', '/audio/401k/04.mp3' UNION ALL
  SELECT 5, 'INTL'' PLAYA', '/audio/401k/05.mp3' UNION ALL
  SELECT 6, 'ROADRUNNER', '/audio/401k/06.mp3' UNION ALL
  SELECT 7, 'R.B.I.T.K', '/audio/401k/07.mp3' UNION ALL
  SELECT 8, 'GOT IT BACK', '/audio/401k/08.mp3' UNION ALL
  SELECT 9, 'WHY LIE', '/audio/401k/09.mp3' UNION ALL
  SELECT 10, 'WHY THEY MAD', '/audio/401k/10.mp3' UNION ALL
  SELECT 11, 'CRAZY WORLD', '/audio/401k/11.mp3' UNION ALL
  SELECT 12, 'HOW I FEEL', '/audio/401k/12.mp3'
) AS track_data
CROSS JOIN albums a
WHERE a.title = '401K'
ON CONFLICT DO NOTHING;
