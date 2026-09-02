/**
 * NOVA MUSIC Backend — Cloudflare Workers
 * Secure audio delivery and metadata endpoints
 */

interface Env {
  NOVA_AUDIO: R2Bucket
  NOVA_MASTERS: R2Bucket
  MASTER_TOKEN?: string
  ENVIRONMENT?: string
}

// Verify master token for admin endpoints
function verifyMasterToken(request: Request, env: Env): boolean {
  const token = request.headers.get('X-Master-Token')
  return token === env.MASTER_TOKEN
}

// CORS headers for public endpoints
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Max-Age': '86400',
}

// Handle CORS preflight
function handleCORS(request: Request): Response | null {
  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }
  return null
}

// Main request handler
export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url)
    const corsResponse = handleCORS(request)

    if (corsResponse) return corsResponse

    // Route: GET /audio/401k/:trackNumber
    if (url.pathname.match(/^\/audio\/401k\/\d+$/)) {
      const trackNumber = url.pathname.split('/').pop()
      const trackPath = `401k/${String(trackNumber).padStart(2, '0')}.mp3`

      try {
        const object = await env.NOVA_AUDIO.get(trackPath)

        if (!object) {
          return new Response('Track not found', { status: 404, headers: corsHeaders })
        }

        return new Response(object.body, {
          headers: {
            ...corsHeaders,
            'Content-Type': 'audio/mpeg',
            'Cache-Control': 'public, max-age=604800', // Cache for 7 days
            'Content-Disposition': `inline; filename="${trackPath}"`,
          },
        })
      } catch (error) {
        return new Response(`Error fetching track: ${error}`, { 
          status: 500, 
          headers: corsHeaders,
        })
      }
    }

    // Route: GET /admin/status (requires master token)
    if (url.pathname === '/admin/status' && url.searchParams.has('token')) {
      if (!verifyMasterToken(request, env)) {
        return new Response('Unauthorized', { status: 401, headers: corsHeaders })
      }

      return new Response(JSON.stringify({
        status: 'ok',
        environment: env.ENVIRONMENT || 'production',
        timestamp: new Date().toISOString(),
      }), {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      })
    }

    // Default: not found
    return new Response('Not found', { status: 404, headers: corsHeaders })
  },
}
