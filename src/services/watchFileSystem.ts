/* eslint-disable @typescript-eslint/no-unused-vars */
import { watch } from 'node:fs/promises'
import { reloadPublicContent } from './publicContent'
import { FS_ROUTES } from '../lib/constants'
import { sleep } from 'bun'
import { loadVideos } from './videoService'

export async function watchPublicFolder () {
  const iterator = watch(FS_ROUTES.PUBLIC.fullPath, {
    recursive: true,
    encoding: 'utf8'
  })

  for await (const { eventType, filename } of iterator) {
    if (eventType === 'rename') {
      // Esperar 1000s para evitar problemas de la caché del fs
      // await sleep(1000)
      // loadVideos()
      debouncedLoadVideos()
      // reloadPublicContent(filename)
    }
  }
}

let timeout: NodeJS.Timeout | null = null
const DEBOUNCE_DELAY = 400

function debouncedLoadVideos () {
  if (timeout) {
    clearTimeout(timeout)
  }

  timeout = setTimeout(() => {
    loadVideos()
    timeout = null
  }, DEBOUNCE_DELAY)
}
