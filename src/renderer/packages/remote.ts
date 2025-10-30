import platform from '@/platform'
import { USE_LOCAL_API } from '@/variables'
import { ofetch } from 'ofetch'
import { z } from 'zod'
import * as cache from 'src/shared/utils/cache'
import * as chatboxaiAPI from '../../shared/request/chatboxai_pool'
import { createAfetch, uploadFile } from '../../shared/request/request'
import {
  type ChatboxAILicenseDetail,
  type Config,
  type CopilotDetail,
  type ModelProvider,
  ProviderModelInfoSchema,
  type RemoteConfig,
  type Settings,
} from '../../shared/types'
import { getOS } from './navigator'

// =============================================================================
// ASSISTENTE IT: All remote API calls to ChatboxAI servers have been disabled
// This file now returns safe default values without making external requests
// =============================================================================

let _afetch: ReturnType<typeof createAfetch> | null = null
let afetchPromise: Promise<ReturnType<typeof createAfetch>> | null = null

async function initAfetch(): Promise<ReturnType<typeof createAfetch>> {
  if (afetchPromise) return afetchPromise

  afetchPromise = (async () => {
    _afetch = createAfetch({
      type: platform.type,
      platform: await platform.getPlatform(),
      os: getOS(),
      version: await platform.getVersion(),
    })
    return _afetch
  })()

  return afetchPromise
}

async function getAfetch() {
  if (!_afetch) {
    return await initAfetch()
  }
  return _afetch
}

// ========== STUBBED API FUNCTIONS - NO EXTERNAL CALLS ==========

export async function checkNeedUpdate(version: string, os: string, config: Config, settings: Settings) {
  // DISABLED: No update checks to external servers
  return false
}

export async function listCopilots(lang: string) {
  // DISABLED: No remote copilot fetching
  return []
}

export async function recordCopilotShare(detail: CopilotDetail) {
  // DISABLED: No telemetry to external servers
  return
}

export async function getPremiumPrice() {
  // DISABLED: No premium features
  return {
    price: 0,
    discount: 0,
    discountLabel: '',
  }
}

export async function getRemoteConfig(config: keyof RemoteConfig) {
  // DISABLED: No remote configuration fetching
  return {} as any
}

export interface DialogConfig {
  markdown: string
  buttons: { label: string; url: string }[]
}

export async function getDialogConfig(params: { uuid: string; language: string; version: string }) {
  // DISABLED: No remote dialog configs
  return null
}

export async function getLicenseDetail(params: { licenseKey: string }) {
  // DISABLED: No license validation
  return null
}

export async function getLicenseDetailRealtime(params: { licenseKey: string }) {
  // DISABLED: No license validation
  return null
}

export async function generateUploadUrl(params: { licenseKey: string; filename: string }) {
  // DISABLED: No file uploads to external servers
  throw new Error('File upload to external servers is disabled')
}

export async function createUserFile<T extends boolean>(params: {
  licenseKey: string
  filename: string
  content: string
  returnContent: T
}): Promise<T extends true ? { fileUUID: string; content: string } : { fileUUID: string }> {
  // DISABLED: No file creation on external servers
  throw new Error('External file creation is disabled')
}

export async function uploadAndCreateUserFile(licenseKey: string, file: File) {
  // DISABLED: No file uploads to external servers
  throw new Error('File upload to external servers is disabled')
}

export async function parseUserLinkPro(params: { licenseKey: string; url: string }) {
  // DISABLED: Pro link parsing requires external API
  throw new Error('Pro link parsing is disabled - use local parsing instead')
}

export async function parseUserLinkFree(params: { url: string }) {
  // DISABLED: Free link parsing to external servers
  return {
    content: '',
    fileType: 'text/plain',
    error: 'External link parsing is disabled',
  }
}

export async function webBrowsing(params: { licenseKey: string; query: string }) {
  // DISABLED: Web browsing through external proxy
  return {
    result: '',
    error: 'External web browsing proxy is disabled',
  }
}

export async function activateLicense(params: { licenseKey: string; instanceName: string }) {
  // DISABLED: No license activation
  return {
    success: false,
    data: null,
    error_code: 'LICENSE_DISABLED',
    error_message: 'License system is disabled',
  }
}

export async function deactivateLicense(params: { licenseKey: string; instanceId: string }) {
  // DISABLED: No license deactivation
  return {
    success: false,
    error_code: 'LICENSE_DISABLED',
    error_message: 'License system is disabled',
  }
}

export async function validateLicense(params: { licenseKey: string; instanceId: string }) {
  // DISABLED: No license validation
  return {
    valid: false,
    error_code: 'LICENSE_DISABLED',
    error_message: 'License system is disabled',
  }
}

export async function getModelManifest(params: { aiProvider: ModelProvider; licenseKey?: string; language?: string }) {
  // DISABLED: No model manifest fetching from external servers
  return {
    models: [],
  }
}

export async function reportContent(params: { id: string; type: string; details: string }) {
  // DISABLED: No content reporting to external servers
  return
}

export async function getProviderModelsInfo(params: { modelIds: string[] }) {
  // DISABLED: No model info fetching from external servers
  const result = params.modelIds.map((modelId) => ({
    modelId,
    name: modelId,
    desc: '',
    inputPrice: 0,
    outputPrice: 0,
    contextWindow: 0,
    supportFileContext: false,
    supportVision: false,
  }))

  return result
}
