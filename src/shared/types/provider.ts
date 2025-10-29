// Provider enums and types that are shared across the application
// This file helps prevent circular dependencies

export enum ModelProviderEnum {
  OpenAI = 'openai',
  Claude = 'claude',
  Gemini = 'gemini',
  Ollama = 'ollama',
}

export enum ModelProviderType {
  OpenAI = 'openai',
  Gemini = 'gemini',
  Claude = 'claude',
}
