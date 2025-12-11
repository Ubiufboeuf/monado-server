import { readdir, stat } from 'node:fs/promises'
import { sleep } from '../lib/timeUtils'
import { serverContext } from '../context'
import { FS_ROUTES } from '../lib/constants'
import { resolve } from 'node:path'

/* 
  Por la manera en la que está implementado esto, por más que sea una escucha recursiva,
  si los cambios están por dentro de las carpetas que se escuchan, no se actualizará nada.
  Esto es por la comprobación de FS_ROUTE y el cambio para evitar cambios de más,
  y aunque seguramente se pueda mejorar, no quiero tocar esto de nuevo en un rato.
*/

export async function updatePublicContent (filename: string | null) {
  console.clear()
  
  if (!filename) {
    console.error('El filename del evento es null. No se puede actualizar el contenido de public/')
    return
  }

  const eventFolder = filename.split('/')[0] ?? ''
  
  const directoriesToUpdate = [
    FS_ROUTES.STREAMS.toString(),
    FS_ROUTES.ASSETS.toString(),
    FS_ROUTES.INFO.toString()
  ]

  const filenameInDirectoryToUpdate = directoriesToUpdate
    .some((d) => d.includes(eventFolder))
  
  if (!filenameInDirectoryToUpdate) return
  
  // Comprobar si existe la carpeta public/
  let stats
  try {
    stats = await stat(FS_ROUTES.PUBLIC.fullPath)
  } catch (err) {
    console.error('Error leyendo public/:', err)
  }

  if (!stats || !stats.isDirectory()) return

  // Esperar 1000s para evitar problemas de la caché del fs
  await sleep(1000)
  
  for (const folder of directoriesToUpdate) {
    if (!folder.includes(eventFolder)) continue
    
    const fullPath = resolve(folder)
    console.log(`- folder [${folder}] - :`, fullPath)

    let folderContent
    let hasError = false
    try {
      console.log('readdir')
      folderContent = await readdir(fullPath)
    } catch {
      hasError = true
      console.error(`Error leyendo la carpeta ${fullPath}`)
    }

    if (!folderContent || !folderContent.length) {
      if (!hasError) console.log(`([${folder}] is empty)`)
      continue
    }

    for (const item of folderContent) {
      saveItemInPublicFolder(eventFolder, item)
    }
  }
}

function saveItemInPublicFolder (folder: string, item: string) {
  // let context
  // try {
  //   context = serverContext.getStore()
  // } catch (err) {
  //   console.error('Error obteniendo el contexto del servidor:', err)
  // }

  // if (!context) {
  //   console.error('no context:', context)
  //   return
  // }

  // context.streamsFolder.add(item)
  console.log(`[${FS_ROUTES.PUBLIC}/${folder}]: ${item}`)
  serverContext.streamsFolder.add(item)
}
