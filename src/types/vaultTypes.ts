import type { Video } from './videoTypes'

export type VaultTarget = 'streams' | 'info' | 'assets'

export interface VaultEntry {
  id: string
  info: Video
  hasAssets: boolean
  updatedAt: number
}

export interface VaultContent {
  entries: Map<string, VaultEntry>
  lastSync: number | null
}
