import type { Cursor } from '../types/cursorTypes'
import { createCursor } from './cursorService'
import { syncVault } from './vaultService'
import { vault } from '../models/Vault'
import type { Video } from '../types/videoTypes'

export function getVideoById (id: string): Video | undefined {
  return vault.entries.get(id)?.info
}

export function getVideosByCursor (cursor: Cursor, limit: number): { list: Video[], nextCursor: Cursor | null } {
  const all = [...vault.entries.values()]
    .map((entry) => entry.info)
    .sort((a, b) => {
      if (!a.id || !b.id) return 0
      return a.id.localeCompare(b.id)
    })

  let startIndex = 0
  if (cursor.lastId) {
    const idx = all.findIndex((v) => v.id === cursor.lastId)
    if (idx !== -1) {
      startIndex = idx + 1
    }
  }

  const fetchLimit = limit + 1
  const slice = all.slice(startIndex, startIndex + fetchLimit)

  const hasMoreItems = slice.length > limit
  const list = hasMoreItems ? slice.slice(0, limit) : slice
  
  const nextCursor = hasMoreItems
    ? createCursor({ lastId: list.at(-1)?.id ?? null })
    : null

  return { list, nextCursor }
}

// Esto se usa en las búsquedas. Debería cambiarse a algo con filtros,
// para no cargar todos los videos.
export async function getAllVideos (): Promise<Video[]> {
  if (!vault.entries) await syncVault()

  return Array.from(vault.entries.values())
    .map((entry) => entry.info)
}
