import { SystemProviders } from '../defaults'
import {
  type Config,
  type ModelProvider,
  ModelProviderEnum,
  ModelProviderType,
  type SessionSettings,
  type Settings,
} from '../types'
import type { ModelDependencies } from '../types/adapters'
import Claude from './claude'
import CustomClaude from './custom-claude'
import CustomGemini from './custom-gemini'
import CustomOpenAI from './custom-openai'
import Gemini from './gemini'
import Ollama from './ollama'
import OpenAI from './openai'
import Perplexity from './perplexity'
import type { ModelInterface } from './types'

export function getProviderSettings(setting: SessionSettings, globalSettings: Settings) {
  console.debug('getModel', setting.provider, setting.modelId)
  const provider = setting.provider
  if (!provider) {
    throw new Error('Model provider must not be empty.')
  }
  const providerBaseInfo = [...SystemProviders, ...(globalSettings.customProviders || [])].find(
    (p) => p.id === provider
  )
  if (!providerBaseInfo) {
    throw new Error(`Cannot find model with provider: ${setting.provider}`)
  }
  const providerSetting = globalSettings.providers?.[setting.provider!] || {}
  const formattedApiHost = (providerSetting.apiHost || providerBaseInfo.defaultSettings?.apiHost || '').trim()
  return {
    providerSetting,
    formattedApiHost,
    providerBaseInfo,
  }
}

export function getModel(
  settings: SessionSettings,
  globalSettings: Settings,
  config: Config,
  dependencies: ModelDependencies
): ModelInterface {
  console.debug('getModel', settings.provider, settings.modelId)
  const provider = settings.provider
  if (!provider) {
    throw new Error('Model provider must not be empty.')
  }
  const { providerSetting, formattedApiHost, providerBaseInfo } = getProviderSettings(settings, globalSettings)

  let model = providerSetting.models?.find((m) => m.modelId === settings.modelId)
  if (!model) {
    model = SystemProviders.find((p) => p.id === provider)?.defaultSettings?.models?.find(
      (m) => m.modelId === settings.modelId
    )
  }
  if (!model) {
    // 如果没有找到对应的 model 配置，直接使用传入的 modelId，这种情况通常发生在用户本地列表中删除了某个 model，但是某个 session 中还在使用，或是检查连接的时候，使用了 defaults 中的 modelId，
    model = {
      modelId: settings.modelId!,
    }
  }

  switch (provider) {
    case ModelProviderEnum.OpenAI:
      return new OpenAI(
        {
          apiKey: providerSetting.apiKey || '',
          apiHost: formattedApiHost,
          model: model,
          dalleStyle: settings.dalleStyle || 'vivid',
          temperature: settings.temperature,
          topP: settings.topP,
          maxOutputTokens: settings.maxTokens,
          injectDefaultMetadata: globalSettings.injectDefaultMetadata,
          useProxy: false,
          stream: settings.stream,
        },
        dependencies
      )

    case ModelProviderEnum.Claude:
      return new Claude(
        {
          claudeApiKey: providerSetting.apiKey || '',
          claudeApiHost: formattedApiHost,
          model,
          temperature: settings.temperature,
          topP: settings.topP,
          maxOutputTokens: settings.maxTokens,
          stream: settings.stream,
        },
        dependencies
      )

    case ModelProviderEnum.Gemini:
      return new Gemini(
        {
          geminiAPIKey: providerSetting.apiKey || '',
          geminiAPIHost: formattedApiHost,
          model,
          temperature: settings.temperature,
          topP: settings.topP,
          maxOutputTokens: settings.maxTokens,
          stream: settings.stream,
        },
        dependencies
      )

    case ModelProviderEnum.Ollama:
      return new Ollama(
        {
          ollamaHost: formattedApiHost,
          model,
          temperature: settings.temperature,
          topP: settings.topP,
          maxOutputTokens: settings.maxTokens,
          stream: settings.stream,
          useProxy: providerSetting.useProxy,
        },
        dependencies
      )

    case ModelProviderEnum.Perplexity:
      return new Perplexity(
        {
          perplexityApiKey: providerSetting.apiKey || '',
          model,
          temperature: settings.temperature,
          topP: settings.topP,
          maxOutputTokens: settings.maxTokens,
          stream: settings.stream,
        },
        dependencies
      )

    default:
      if (providerBaseInfo.isCustom) {
        switch (providerBaseInfo.type) {
          case ModelProviderType.Claude:
            return new CustomClaude(
              {
                apiKey: providerSetting.apiKey || '',
                apiHost: formattedApiHost,
                model,
                temperature: settings.temperature,
                topP: settings.topP,
                maxOutputTokens: settings.maxTokens,
                stream: settings.stream,
              },
              dependencies
            )
          case ModelProviderType.Gemini:
            return new CustomGemini(
              {
                apiKey: providerSetting.apiKey || '',
                apiHost: formattedApiHost,
                model,
                temperature: settings.temperature,
                topP: settings.topP,
                maxOutputTokens: settings.maxTokens,
                stream: settings.stream,
              },
              dependencies
            )

          case ModelProviderType.OpenAI:
          default:
            return new CustomOpenAI(
              {
                apiKey: providerSetting.apiKey || '',
                apiHost: formattedApiHost,
                apiPath: providerSetting.apiPath || '',
                model,
                temperature: settings.temperature,
                topP: settings.topP,
                maxOutputTokens: settings.maxTokens,
                stream: settings.stream,
                useProxy: providerSetting.useProxy,
              },
              dependencies
            )
        }
      } else {
        throw new Error(`Cannot find model with provider: ${settings.provider}`)
      }
  }
}

export const aiProviderNameHash: Record<ModelProvider, string> = {
  [ModelProviderEnum.OpenAI]: 'OpenAI API',
  [ModelProviderEnum.Claude]: 'Claude API',
  [ModelProviderEnum.Gemini]: 'Google Gemini API',
  [ModelProviderEnum.Ollama]: 'Ollama API',
  [ModelProviderEnum.Perplexity]: 'Perplexity API',
}

export const AIModelProviderMenuOptionList = [
  {
    value: ModelProviderEnum.OpenAI,
    label: aiProviderNameHash[ModelProviderEnum.OpenAI],
    disabled: false,
  },
  {
    value: ModelProviderEnum.Claude,
    label: aiProviderNameHash[ModelProviderEnum.Claude],
    disabled: false,
  },
  {
    value: ModelProviderEnum.Gemini,
    label: aiProviderNameHash[ModelProviderEnum.Gemini],
    disabled: false,
  },
  {
    value: ModelProviderEnum.Ollama,
    label: aiProviderNameHash[ModelProviderEnum.Ollama],
    disabled: false,
  },
  {
    value: ModelProviderEnum.Perplexity,
    label: aiProviderNameHash[ModelProviderEnum.Perplexity],
    disabled: false,
  },
]

function keepRange(num: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, num))
}
