import { readdir, stat } from 'node:fs/promises'
import { resolve } from 'node:path'
import { createThrottleCallback } from '../lib/timeUtils'
import { serverContext } from '../context'

export async function updatePublicContent () {
  // Crear callback para la lectura de public/ esperando 400ms para evitar problemas de caché del fs
  const throttleReadPublic = await createThrottleCallback(() => readdir(resolve('public')) ?? [], { initialTimeout: 400 })
  
  // Ejecutar callback
  const publicFolder = await throttleReadPublic()

  for (const name of publicFolder) {
    // Por cada elemento, intentar conseguir su estado
    let stats
    try {
      stats = await stat(resolve(`public/${name}`))
    } catch (err) {
      console.error(`Error consiguiendo el estado de public/${name} :`, err)
    }

    if (!stats?.isDirectory()) continue
    
    // Guardar nombre de la carpeta
    saveItemInPublicFolder(name)
  }
}

function saveItemInPublicFolder (name: string) {
  let context
  try {
    context = serverContext.getStore()
  } catch (err) {
    console.error('Error obteniendo el contexto del servidor:', err)
  }

  if (!context) return

  context.publicContent.add(name)
}
