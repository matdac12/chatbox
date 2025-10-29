import { SystemProviders } from 'src/shared/defaults'
import {
  type ModelProvider,
  ModelProviderEnum,
  ModelProviderType,
  type SessionSettings,
  type SessionType,
  type Settings,
} from 'src/shared/types'
import ClaudeSettingUtil from './claude-setting-util'
import CustomClaudeSettingUtil from './custom-claude-util'
import CustomGeminiSettingUtil from './custom-gemini-setting-util'
import GeminiSettingUtil from './gemini-setting-util'
import type { ModelSettingUtil } from './interface'
import OllamaSettingUtil from './ollama-setting-util'
import OpenAISettingUtil from './openai-setting-util'

export function getModelSettingUtil(
  aiProvider: ModelProvider,
  customProviderType?: ModelProviderType
): ModelSettingUtil {
  const hash: Record<ModelProvider, new () => ModelSettingUtil> = {
    [ModelProviderEnum.Claude]: ClaudeSettingUtil,
    [ModelProviderEnum.Gemini]: GeminiSettingUtil,
    [ModelProviderEnum.Ollama]: OllamaSettingUtil,
    [ModelProviderEnum.OpenAI]: OpenAISettingUtil,
  }

  // If provider is in hash, use the corresponding setting util
  if (hash[aiProvider]) {
    return new hash[aiProvider]()
  }

  // For custom providers, determine setting util based on type
  if (customProviderType) {
    switch (customProviderType) {
      case ModelProviderType.OpenAI:
        return new OpenAISettingUtil()
      case ModelProviderType.Claude:
        return new CustomClaudeSettingUtil()
      case ModelProviderType.Gemini:
        return new CustomGeminiSettingUtil()
      default:
        return new OpenAISettingUtil()
    }
  }

  // Fallback to OpenAISettingUtil (OpenAI-compatible)
  return new OpenAISettingUtil()
}

export async function getModelDisplayName(
  settings: SessionSettings,
  globalSettings: Settings,
  sessionType: SessionType
) {
  const provider = settings.provider!
  const model = settings.modelId!

  const providerBaseInfo =
    globalSettings.customProviders?.find((p) => p.id === provider) || SystemProviders.find((p) => p.id === provider)

  const util = getModelSettingUtil(provider, providerBaseInfo?.isCustom ? providerBaseInfo.type : undefined)
  const providerSettings = globalSettings.providers?.[provider]
  return util.getCurrentModelDisplayName(model, sessionType, providerSettings, providerBaseInfo)
}
