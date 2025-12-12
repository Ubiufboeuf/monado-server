import { watch } from 'node:fs/promises'
import { updatePublicContent } from './publicContent'
import { FS_ROUTES } from '../lib/constants'

export async function watchPublicFolder () {
  const iterator = watch(FS_ROUTES.PUBLIC.fullPath, {
    recursive: true,
    encoding: 'utf8'
  })

  for await (const { eventType, filename } of iterator) {
    if (eventType === 'rename') {
      updatePublicContent(filename)
    }
  }
}
