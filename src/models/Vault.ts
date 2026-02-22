import type { VaultContent } from '../types/vaultTypes'
import type { Video } from '../types/videoTypes'

export class Vault {
  #content: VaultContent = {
    entries: new Map(),
    lastSync: null
  }

  get entries () {
    return this.#content.entries
  }

  addEntry (id: string, info: Video, hasAssets: boolean) {
    const entry = this.#content.entries.get(id)
    if (entry) {
      if (JSON.stringify(entry.info) === JSON.stringify(info)) return

      entry.info = info
      entry.hasAssets = hasAssets
      entry.updatedAt = Date.now()
      return
    }

    this.#content.entries.set(id, {
      id,
      hasAssets,
      info,
      updatedAt: Date.now()
    })
  }

  deleteExtraEntries (videosId: Set<string>) {
    const { entries } = this.#content

    for (const [entryId] of entries) {
      if (videosId.has(entryId)) continue

      entries.delete(entryId)
      this.#content.lastSync = Date.now()
    }
  }
}

export const vault = new Vault()
