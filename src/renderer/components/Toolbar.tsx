import NiceModal from '@ebay/nice-modal-react'
import { ActionIcon, Button, Flex } from '@mantine/core'
import { IconClearAll, IconDeviceFloppy, IconDots, IconHistory, IconSearch, IconTrash } from '@tabler/icons-react'
import { useSetAtom } from 'jotai'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useIsLargeScreen, useIsSmallScreen } from '@/hooks/useScreenChange'
import platform from '@/platform'
import { router } from '@/router'
import { deleteSession } from '@/stores/chatStore'
import { clear as clearSession } from '@/stores/sessionActions'
import { useUIStore } from '@/stores/uiStore'
import * as atoms from '../stores/atoms'
import ActionMenu from './ActionMenu'
import Broom from './icons/Broom'
import LayoutExpand from './icons/LayoutExpand'
import LayoutShrink from './icons/LayoutShrink'
import { ScalableIcon } from './ScalableIcon'
// DISABLED: Update checker removed
// import UpdateAvailableButton from './UpdateAvailableButton'

/**
 * 顶部标题工具栏（右侧）
 * @returns
 */
export default function Toolbar({ sessionId }: { sessionId: string }) {
  const { t } = useTranslation()
  const isSmallScreen = useIsSmallScreen()
  const isLargeScreen = useIsLargeScreen()

  // DISABLED: Update notification state removed
  // const [showUpdateNotification, setShowUpdateNotification] = useState(false)
  const setOpenSearchDialog = useUIStore((s) => s.setOpenSearchDialog)
  const setThreadHistoryDrawerOpen = useSetAtom(atoms.showThreadHistoryDrawerAtom)
  const widthFull = useUIStore((s) => s.widthFull)
  const setWidthFull = useUIStore((s) => s.setWidthFull)

  // DISABLED: Update checker listener removed
  // useEffect(() => {
  //   const offUpdateDownloaded = platform.onUpdateDownloaded(() => {
  //     setShowUpdateNotification(true)
  //   })
  //   return () => {
  //     offUpdateDownloaded()
  //   }
  // }, [])

  const handleExportAndSave = () => {
    NiceModal.show('export-chat')
  }
  const handleSessionClean = () => {
    void clearSession(sessionId)
  }
  const handleSessionDelete = async () => {
    try {
      await deleteSession(sessionId)
      router.navigate({ to: '/', replace: true })
    } catch (error) {
      console.error('Failed to delete session:', error)
    }
  }

  return !isSmallScreen ? (
    <Flex align="center" gap="md" className="controls">
      {/* DISABLED: Update notification button removed */}

      {!isSmallScreen ? (
        <Button
          h={28}
          px="xs"
          radius="sm"
          variant="outline"
          color="chatbox-tertiary"
          leftSection={<ScalableIcon icon={IconSearch} size={16} strokeWidth={1.8} />}
          className="border-[var(--mantine-color-chatbox-border-primary-outline)]"
          onClick={() => setOpenSearchDialog(true)}
        >
          {t('Search')}...
        </Button>
      ) : (
        <ActionIcon variant="subtle" size={28} color="chatbox-secondary" onClick={() => setOpenSearchDialog(true)}>
          <IconSearch strokeWidth={1.8} />
        </ActionIcon>
      )}

      {isLargeScreen && (
        <ActionIcon variant="subtle" size={28} color="chatbox-secondary" onClick={() => setWidthFull(!widthFull)}>
          {widthFull ? <LayoutExpand strokeWidth={1.8} /> : <LayoutShrink strokeWidth={1.8} />}
        </ActionIcon>
      )}

      <ActionIcon variant="subtle" size={28} color="chatbox-secondary" onClick={() => setThreadHistoryDrawerOpen(true)}>
        <IconHistory strokeWidth={1.8} />
      </ActionIcon>

      <ActionMenu
        position="bottom-end"
        items={[
          {
            text: t('Export Chat'),
            icon: IconDeviceFloppy,
            onClick: handleExportAndSave,
          },
          {
            divider: true,
          },
          {
            doubleCheck: {
              color: 'chatbox-error',
            },
            text: t('Clear All Messages'),
            icon: Broom,
            color: 'chatbox-primary',
            onClick: handleSessionClean,
          },
          {
            doubleCheck: {
              color: 'chatbox-error',
            },
            text: t('Delete Current Session'),
            icon: IconTrash,
            color: 'chatbox-primary',
            onClick: handleSessionDelete,
          },
        ]}
      >
        <ActionIcon variant="subtle" size={28} color="chatbox-secondary">
          <IconDots strokeWidth={1.8} />
        </ActionIcon>
      </ActionMenu>
    </Flex>
  ) : (
    <Flex align="center" gap="xs">
      <ActionIcon variant="subtle" size={24} color="chatbox-secondary" onClick={() => setOpenSearchDialog(true)}>
        <IconSearch strokeWidth={1.8} />
      </ActionIcon>
      <ActionMenu
        position="bottom-end"
        items={[
          {
            text: t('Thread History'),
            icon: IconHistory,
            onClick: () => setThreadHistoryDrawerOpen(true),
          },

          {
            text: t('Export Chat'),
            icon: IconDeviceFloppy,
            onClick: handleExportAndSave,
          },
          {
            divider: true,
          },
          {
            doubleCheck: {
              color: 'chatbox-error',
            },
            text: t('Clear All Messages'),
            icon: IconClearAll,
            color: 'chatbox-primary',
            onClick: handleSessionClean,
          },
          {
            doubleCheck: {
              color: 'chatbox-error',
            },
            text: t('Delete Current Session'),
            icon: IconTrash,
            color: 'chatbox-primary',
            onClick: handleSessionDelete,
          },
        ]}
      >
        <ActionIcon variant="subtle" size={24} color="chatbox-secondary">
          <IconDots strokeWidth={1.8} />
        </ActionIcon>
      </ActionMenu>
    </Flex>
  )
}
