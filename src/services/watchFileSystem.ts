import { watch } from 'node:fs/promises'
import { resolve } from 'node:path'
import { updatePublicContent } from './publicContent'

export async function watchPublicFolder () {
  const iterator = watch(resolve('public'), {
    recursive: true,
    encoding: 'utf8'
  })

  for await (const { eventType } of iterator) {
    if (eventType === 'rename') {
      updatePublicContent()
    }
  }
}
