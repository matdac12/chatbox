import { v4 as uuidv4 } from 'uuid'
import {
  type Config,
  ModelProviderEnum,
  ModelProviderType,
  type ProviderBaseInfo,
  type SessionSettings,
  type Settings,
  Theme,
} from './types'

export function settings(): Settings {
  return {
    // aiProvider: ModelProviderEnum.OpenAI,
    // openaiKey: '',
    // apiHost: 'https://api.openai.com',
    // dalleStyle: 'vivid',
    // imageGenerateNum: 3,
    // openaiUseProxy: false,

    // azureApikey: '',
    // azureDeploymentName: '',
    // azureDeploymentNameOptions: [],
    // azureDalleDeploymentName: 'dall-e-3',
    // azureEndpoint: '',
    // azureApiVersion: '2024-05-01-preview',

    // chatglm6bUrl: '', // deprecated
    // chatglmApiKey: '',
    // chatglmModel: '',

    // model: 'gpt-4o',
    // openaiCustomModelOptions: [],
    // temperature: 0.7,
    // topP: 1,
    // // openaiMaxTokens: 0,
    // // openaiMaxContextTokens: 4000,
    // openaiMaxContextMessageCount: 20,
    // // maxContextSize: "4000",
    // // maxTokens: "2048",

    // claudeApiKey: '',
    // claudeApiHost: 'https://api.anthropic.com/v1',
    // claudeModel: 'claude-3-5-sonnet-20241022',
    // claudeApiKey: '',
    // claudeApiHost: 'https://api.anthropic.com',
    // claudeModel: 'claude-3-5-sonnet-20241022',

    // chatboxAIModel: 'chatboxai-3.5',

    // geminiAPIKey: '',
    // geminiAPIHost: 'https://generativelanguage.googleapis.com',
    // geminiModel: 'gemini-1.5-pro-latest',

    // ollamaHost: 'http://127.0.0.1:11434',
    // ollamaModel: '',

    // groqAPIKey: '',
    // groqModel: 'llama3-70b-8192',

    // deepseekAPIKey: '',
    // deepseekModel: 'deepseek-chat',

    // siliconCloudKey: '',
    // siliconCloudModel: 'Qwen/Qwen2.5-7B-Instruct',

    // lmStudioHost: 'http://127.0.0.1:1234/v1',
    // lmStudioModel: '',

    // perplexityApiKey: '',
    // perplexityModel: 'llama-3.1-sonar-large-128k-online',

    // xAIKey: '',
    // xAIModel: 'grok-beta',

    // customProviders: [],

    showWordCount: false,
    showTokenCount: false,
    showTokenUsed: true,
    showModelName: true,
    showMessageTimestamp: false,
    showFirstTokenLatency: false,
    userAvatarKey: '',
    defaultAssistantAvatarKey: '',
    theme: Theme.System,
    language: 'en',
    fontSize: 14,
    spellCheck: true,

    defaultPrompt: getDefaultPrompt(),

    allowReportingAndTracking: true,

    enableMarkdownRendering: true,
    enableLaTeXRendering: true,
    enableMermaidRendering: true,
    injectDefaultMetadata: true,
    autoPreviewArtifacts: false,
    autoCollapseCodeBlock: true,
    pasteLongTextAsAFile: true,

    autoGenerateTitle: true,

    autoLaunch: false,
    autoUpdate: true,
    betaUpdate: false,

    shortcuts: {
      quickToggle: 'Alt+`', // 快速切换窗口显隐的快捷键
      inputBoxFocus: 'mod+i', // 聚焦输入框的快捷键
      inputBoxWebBrowsingMode: 'mod+e', // 切换输入框的 web 浏览模式的快捷键
      newChat: 'mod+n', // 新建聊天的快捷键
      newPictureChat: 'mod+shift+n', // 新建图片会话的快捷键
      sessionListNavNext: 'mod+tab', // 切换到下一个会话的快捷键
      sessionListNavPrev: 'mod+shift+tab', // 切换到上一个会话的快捷键
      sessionListNavTargetIndex: 'mod', // 会话导航的快捷键
      messageListRefreshContext: 'mod+r', // 刷新上下文的快捷键
      dialogOpenSearch: 'mod+k', // 打开搜索对话框的快捷键
      inputBoxSendMessage: 'Enter', // 发送消息的快捷键
      inputBoxSendMessageWithoutResponse: 'Ctrl+Enter', // 发送但不生成回复的快捷键
      optionNavUp: 'up', // 选项导航的快捷键
      optionNavDown: 'down', // 选项导航的快捷键
      optionSelect: 'enter', // 选项导航的快捷键
    },
    extension: {
      webSearch: {
        provider: 'build-in',
        tavilyApiKey: '',
      },
      knowledgeBase: {
        models: {
          embedding: undefined,
          rerank: undefined,
        },
      },
    },
    mcp: {
      servers: [],
      enabledBuiltinServers: [],
    },
  }
}

export function newConfigs(): Config {
  return { uuid: uuidv4() }
}

export function getDefaultPrompt() {
  return 'You are a helpful assistant.'
}

export function chatSessionSettings(): SessionSettings {
  return {
    provider: ModelProviderEnum.ChatboxAI,
    modelId: 'chatboxai-4',
    maxContextMessageCount: 6,
  }
}

export function pictureSessionSettings(): SessionSettings {
  return {
    provider: ModelProviderEnum.ChatboxAI,
    modelId: 'DALL-E-3',
    imageGenerateNum: 3,
    dalleStyle: 'vivid',
  }
}

export const SystemProviders: ProviderBaseInfo[] = [
  {
    id: ModelProviderEnum.OpenAI,
    name: 'OpenAI',
    type: ModelProviderType.OpenAI,
    urls: {
      website: 'https://openai.com',
    },
    defaultSettings: {
      apiHost: 'https://api.openai.com',
      models: [
        {
          modelId: 'gpt-5-chat-latest',
          capabilities: ['vision', 'tool_use'],
          contextWindow: 400_000,
          maxOutput: 128_000,
        },
        {
          modelId: 'gpt-5',
          capabilities: ['vision', 'tool_use'],
          contextWindow: 400_000,
          maxOutput: 128_000,
        },
        {
          modelId: 'gpt-5-mini',
          capabilities: ['vision', 'tool_use'],
          contextWindow: 128_000,
          maxOutput: 4_096,
        },
        {
          modelId: 'gpt-5-nano',
          capabilities: ['vision', 'tool_use'],
          contextWindow: 128_000,
          maxOutput: 4_096,
        },
        {
          modelId: 'gpt-4o',
          capabilities: ['vision', 'tool_use'],
          contextWindow: 128_000,
          maxOutput: 4_096,
        },
        {
          modelId: 'gpt-4o-mini',
          capabilities: ['vision', 'tool_use'],
          contextWindow: 128_000,
          maxOutput: 4_096,
        },
        {
          modelId: 'o4-mini',
          capabilities: ['vision', 'tool_use', 'reasoning'],
          contextWindow: 200_000,
          maxOutput: 100_000,
        },
        {
          modelId: 'o3-mini',
          capabilities: ['vision', 'tool_use', 'reasoning'],
          contextWindow: 200_000,
          maxOutput: 200_000,
        },
        {
          modelId: 'o3',
          capabilities: ['vision', 'tool_use', 'reasoning'],
          contextWindow: 200_000,
          maxOutput: 100_000,
        },
        {
          modelId: 'text-embedding-3-small',
          type: 'embedding',
        },
      ],
    },
  },
  {
    id: ModelProviderEnum.Claude,
    name: 'Claude',
    type: ModelProviderType.Claude,
    urls: {
      website: 'https://www.anthropic.com',
    },
    defaultSettings: {
      apiHost: 'https://api.anthropic.com/v1',
      models: [
        {
          modelId: 'claude-opus-4-0',
          contextWindow: 200_000,
          maxOutput: 32_000,
          capabilities: ['vision', 'reasoning', 'tool_use'],
        },
        {
          modelId: 'claude-sonnet-4-0',
          contextWindow: 200_000,
          maxOutput: 64_000,
          capabilities: ['vision', 'reasoning', 'tool_use'],
        },
        {
          modelId: 'claude-3-7-sonnet-latest',
          capabilities: ['vision', 'tool_use', 'reasoning'],
          contextWindow: 200_000,
        },
        {
          modelId: 'claude-3-5-sonnet-latest',
          capabilities: ['vision'],
          contextWindow: 200_000,
        },
        {
          modelId: 'claude-3-5-haiku-latest',
          capabilities: ['vision'],
          contextWindow: 200_000,
        },
        {
          modelId: 'claude-3-opus-latest',
          capabilities: ['vision'],
          contextWindow: 200_000,
        },
      ],
    },
  },
  {
    id: ModelProviderEnum.Gemini,
    name: 'Gemini',
    type: ModelProviderType.Gemini,
    urls: {
      website: 'https://gemini.google.com/',
    },
    defaultSettings: {
      apiHost: 'https://generativelanguage.googleapis.com',
      models: [
        {
          modelId: 'gemini-2.5-flash',
          capabilities: ['vision', 'reasoning', 'tool_use'],
          contextWindow: 1_000_000,
          maxOutput: 8_192,
        },
        {
          modelId: 'gemini-2.5-pro',
          capabilities: ['vision', 'reasoning', 'tool_use'],
          contextWindow: 1_000_000,
          maxOutput: 8_192,
        },
        {
          modelId: 'gemini-2.5-flash-image-preview',
          capabilities: ['vision'],
          contextWindow: 32_768,
          maxOutput: 8_192,
        },
        {
          modelId: 'gemini-2.0-flash-exp',
          capabilities: ['vision'],
          contextWindow: 1_000_000,
          maxOutput: 8_192,
        },
        {
          modelId: 'gemini-2.0-flash-thinking-exp',
          capabilities: ['vision', 'reasoning'],
          contextWindow: 32_000,
          maxOutput: 8_000,
        },
        {
          modelId: 'gemini-2.0-flash-thinking-exp-1219',
          capabilities: ['vision', 'reasoning'],
          contextWindow: 32_000,
          maxOutput: 8_000,
        },
        {
          modelId: 'gemini-1.5-pro-latest',
          capabilities: ['vision'],
          contextWindow: 2_000_000,
          maxOutput: 8_192,
        },
        {
          modelId: 'gemini-1.5-flash-latest',
          capabilities: ['vision'],
          contextWindow: 1_000_000,
          maxOutput: 8_192,
        },
      ],
    },
  },
  {
    id: ModelProviderEnum.Ollama,
    name: 'Ollama',
    type: ModelProviderType.OpenAI,
    defaultSettings: {
      apiHost: 'http://127.0.0.1:11434',
    },
  },
]
