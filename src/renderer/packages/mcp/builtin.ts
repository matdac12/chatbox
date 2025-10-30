import { getLicenseKey } from '@/stores/settingActions'
import { MCPServerConfig } from './types'
import i18n from '@/i18n'

export interface BuildinMCPServerConfig {
  id: string
  name: string
  description: string
  url: string
}

// ASSISTENTE IT: Builtin ChatboxAI hosted servers removed (premium feature)
// Users can install their own MCP servers from the registry
export const BUILTIN_MCP_SERVERS: BuildinMCPServerConfig[] = []

export function getBuiltinServerConfig(id: string, licenseKey?: string): MCPServerConfig | null {
  const config = BUILTIN_MCP_SERVERS.find((s) => s.id === id)
  if (!config) {
    return null
  }
  const license = licenseKey || getLicenseKey()
  return {
    id,
    name: config.name,
    enabled: true,
    transport: {
      type: 'http',
      url: config.url,
      headers: license ? { 'x-chatbox-license': license } : undefined,
    },
  }
}
