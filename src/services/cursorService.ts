import type { Cursor } from '../types/cursorTypes'

export function createCursor ({ lastId }: { lastId: string | undefined | null }): Cursor {
  return {
    lastId: lastId ?? null
  }
}

export function cursorFromB64 (cursor: string) {
  let currentCursorStr
  try {
    currentCursorStr = Buffer.from(cursor, 'base64url').toString('utf8')
  } catch (err) {
    console.error('Error creando el buffer del cursor:', err)
  }

  if (!currentCursorStr) return

  let currentCursor: Cursor | null = null
  try {
    currentCursor = JSON.parse(currentCursorStr)
  } catch (err) {
    console.error('Error convirtiendo el cursor como texto a JSON:', err)
  }

  if (!currentCursor) return

  const newCursor = createCursor({ lastId: currentCursor.lastId })

  return newCursor
}

export function cursorToB64 (cursor: Cursor) {
  const json = JSON.stringify(cursor)
  return Buffer.from(json, 'utf8').toString('base64url')
}
