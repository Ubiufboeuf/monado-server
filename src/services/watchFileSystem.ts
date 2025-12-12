import { watch } from 'node:fs/promises'
import { updatePublicContent } from './publicContent'
import { FS_ROUTES } from '../lib/constants'
import { sleep } from 'bun'

export async function watchPublicFolder () {
  const iterator = watch(FS_ROUTES.PUBLIC.fullPath, {
    recursive: true,
    encoding: 'utf8'
  })

  for await (const { eventType, filename } of iterator) {
    if (eventType === 'rename') {
      // Esperar 1000s para evitar problemas de la caché del fs
      await sleep(1000)
      updatePublicContent(filename)
    }
  }
}
