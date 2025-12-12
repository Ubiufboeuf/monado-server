import { readdir, stat } from 'node:fs/promises'
import { serverContext } from '../context'
import { FS_ROUTES } from '../lib/constants'
import { resolve } from 'node:path'

export async function updatePublicContent (filename: string | null) {
  // console.clear()
  console.log('\n- - - UpdatePublicContent - - -')

  const eventFolder = filename
    ? `${FS_ROUTES.PUBLIC}/${filename.split('/')[0]}`
    : null
  
  const directoriesToUpdate = [
    FS_ROUTES.STREAMS.toString(),
    FS_ROUTES.ASSETS.toString(),
    FS_ROUTES.INFO.toString()
  ]

  // Esto era parte de lo necesario para hacerlo granular,
  // pero prácticamente todo el intento de hacer esto granular estaba mal implementado
  // const filenameInDirectoriesToUpdate = eventFolder
  //   ? directoriesToUpdate
  //     .some((d) => d.includes(eventFolder))
  //   : null
  
  // if (!filenameInDirectoriesToUpdate) return
  
  // Comprobar si existe la carpeta public/
  let stats
  try {
    stats = await stat(FS_ROUTES.PUBLIC.fullPath)
  } catch (err) {
    console.error('Error leyendo public/:', err)
  }

  if (!stats || !stats.isDirectory()) return
  
  for (const folder of directoriesToUpdate) {
    // Esto es para comprobar si es uno de los directorios principales de los videos en public/
    // if (!folder.includes(eventFolder)) continue
    
    const fullPath = resolve(folder)
    console.log(`\n- folder [${folder}] - :`, fullPath)

    let folderContent
    let hasError = false
    try {
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
      console.log(`[${folder}]: ${item} | eventFolder: ${eventFolder}`)
      saveItemInPublicFolder(item)
    }
  }
}

function saveItemInPublicFolder (item: string) {
  serverContext.streamsFolder.add(item)
}
