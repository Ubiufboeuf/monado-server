import { extname } from 'node:path'
import { serverContext } from '../context'
import type { Video } from '../types/videoTypes'
import { reloadPublicContent } from './publicContent'
import { readFile } from 'node:fs/promises'
import { FS_ROUTES } from '../lib/constants'
import { isValidVideo } from '../lib/validations'
import type { Cursor } from '../types/cursorTypes'
import { createCursor } from './cursorService'

const videos = new Map<string, Video>()

export async function loadVideos () {
  // 1. leer las tres carpetas de videos
  // 2. comprobar si falta alguna o hay discrepancias
  // 3. leer la información de estos
  // 4. añadirlos a los videos

  try {
    await reloadPublicContent(null)
  } catch (err) {
    console.error('[Error crítico] Error actualizando la información de public/:', err)
    return
  }

  videos.clear()

  // console.log('\n- loadVideos -')
  // console.log('[loadVideos] serverContext:', serverContext)

  const { assetsFolder, infoFolder, streamsFolder } = serverContext
  const infoContent = [...infoFolder.keys()].map((k) => k.split(extname(k))[0])
  
  for (const v of streamsFolder) {
    const infoFile = infoContent.find((item) => item === v)
    if (!infoFile) continue

    let infoStr
    try {
      infoStr = await readFile(`${FS_ROUTES.INFO}/${infoFile}.json`, 'utf8')
    } catch (err) {
      console.error(`Error leyendo la información del video ${v}:`, err)
      continue
    }

    let info
    try {
      info = await JSON.parse(infoStr)
    } catch (err) {
      console.error(`Error convirtiendo a JSON la información del video ${v}:`, err)
      continue
    }

    if (!info) {
      console.error(`No se encontraron datos de ${v}. No se agregará a la lista de videos`)
      continue
    }

    if (!assetsFolder.has(v)) {
      console.warn(`No se encontraron los assets de ${v}`)
      // continue
    }

    if (!isValidVideo(info)) continue

    videos.set(v, info)
  }

  logVideos()
}

export function getVideoById (id: string) {
  logVideos()
  
  if (!videos.has(id)) return

  return videos.get(id)
}

export function logVideos () {
  // console.log('\n[logVideos]')
  
  // const ids: string[] = []
  // videos.forEach((v) => v.id && ids.push(v.id))
  // console.log('ids:', new Set(ids))
}

export function getVideos (cursor: Cursor, limit: number) {
  const all = [...videos.values()].sort((a, b) => {
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

  const endIndex = startIndex + limit
  const list = all.slice(startIndex, endIndex)
  let nextCursor: Cursor | null = null

  // Comprobar el tamaño de la lista.
  // Si hay menos que lo que se pide, es porque no quedan más, entonces no debe haber otro cursor
  if (list.length === limit) {
    nextCursor = createCursor({ lastId: list.at(-1)?.id ?? null })
  }

  return { list, nextCursor }
}

