import platform from '@/platform'

export const featureFlags = {
  mcp: true, // Enable MCP for both desktop and web (HTTP/SSE works in browsers)
  knowledgeBase: platform.type === 'desktop',
}
