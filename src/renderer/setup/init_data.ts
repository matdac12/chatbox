import platform from '@/platform'
import storage from '@/storage'
import { StorageKey, StorageKeyGenerator } from '@/storage/StoreStorage'
import * as chatStore from '@/stores/chatStore'
import { getSessionMeta } from '@/stores/sessionHelpers'

export async function initData() {
  await initSessionsIfNeeded()
}

async function initSessionsIfNeeded() {
  // 已经做过 migration，只需要检查是否存在 sessionList
  const sessionList = await chatStore.listSessionsMeta()
  if (sessionList.length > 0) {
    return
  }

  const newSessionList = await initPresetSessions()

  await chatStore.updateSessionList(() => {
    return newSessionList
  })
}

async function initPresetSessions() {
  // No preset sessions - users start with a clean slate
  const defaultSessions: any[] = []

  for (const session of defaultSessions) {
    await storage.setItemNow(StorageKeyGenerator.session(session.id), session)
  }

  const sessionList = defaultSessions.map(getSessionMeta)

  await storage.setItemNow(StorageKey.ChatSessionsList, sessionList)

  return sessionList
}
