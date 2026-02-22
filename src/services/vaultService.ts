import { readdir, readFile, watch, writeFile } from 'node:fs/promises'
import { FS_ROUTES } from '../lib/constants'
import { join } from 'node:path'
import { vault } from '../models/Vault'
import type { Video } from '../types/videoTypes'
import { isValidVideo } from '../lib/validations'
import type { VaultTarget } from '../types/vaultTypes'

const defaultInfo = '{}'
const vaultDirectories: Record<VaultTarget, string> = {
  assets: FS_ROUTES.ASSETS.fullPath,
  info: FS_ROUTES.INFO.fullPath,
  streams: FS_ROUTES.STREAMS.fullPath
}

let isSyncing = false

export async function syncVault () {
  /** - Pasos para sincronizar el vaúl
   * 1. Leer las carpetas del vaúl (assets/, info/ y streams/)
   * 2. Comprobar diferencias entre estas para ver si contar o no un video
   * 3. Cargar información de estos
   * 4. Añadirlos al vaúl en memoria
   */

  // 1. Leer las carpetas del vaúl
  const [streams, info, assets] = await Promise.all([
    readFromVault('streams'),
    readFromVault('info'),
    readFromVault('assets')
  ])

  const streamsSet = new Set(streams)
  const infoSet = new Set(info.map((file) => file.replace('.json', '')))
  const assetsSet = new Set(assets)
  
  vault.deleteExtraEntries(streamsSet)

  for (const video of streams) {
    const existVideoInfo = infoSet.has(video)
    const existVideoAssets = assetsSet.has(video)
    
    // 2. Comprobar si añadir o no el video
    if (!existVideoInfo) continue

    // 3. Cargar información del video
    const videoInfo = await readVideoInfo(video, info)

    if (!videoInfo) {
      console.error(`No se encontró información del video ${video}.`)
      continue
    }

    if (!existVideoAssets) {
      console.warn(`No se encontraron assets del video ${video}`)
    }

    // 4. Agregar al vaúl en memoria
    vault.addEntry(video, videoInfo, existVideoAssets)
  }
}

async function readFromVault (target: VaultTarget): Promise<string[]> {
  let dir

  try {
    dir = await readdir(vaultDirectories[target], 'utf8')
  } catch {
    console.error(`Error leyendo la carpeta de ${target}`)
  }

  return dir || []
}

async function readVideoInfo (id: string, infoDirectory: string[]): Promise<Video | undefined> {
  const fileName = infoDirectory.find((file) => file.includes(id))

  if (!fileName) return
  
  let file
  try {
    file = await readFile(join(vaultDirectories.info, fileName), 'utf8')
  } catch {
    console.error(`Error leyendo el archivo de información de ${id} (${fileName})`)
  }

  if (!file) return
  
  let info
  try {
    info = JSON.parse(file)
  } catch {
    console.error(`Error parseando la información del video ${id} a JSON`)
  }

  if (!isValidVideo(info)) return

  return info
}

export async function trackVault () {
  const syncFilePath = join(FS_ROUTES.PUBLIC.fullPath, 'sync.json')
  let syncFile = ''

  try {
    syncFile = await readFile(syncFilePath, 'utf8')
  } catch {/* empty */}

  if (!syncFile) {
    try {
      await writeFile(syncFilePath, defaultInfo)
    } catch (err) {
      console.error('Error leyendo el archivo de sincronización del vaúl:', err)
      return
    }

    syncFile = defaultInfo
  }
  
  const iterator = watch(syncFilePath)

  for await (const { eventType } of iterator) {
    console.log('iteración')
    if (eventType !== 'change' || isSyncing) continue

    isSyncing = true
    
    try {
      await syncVault()
    } finally {
      isSyncing = false
      console.log('iteración terminada')
    }
  }
}

