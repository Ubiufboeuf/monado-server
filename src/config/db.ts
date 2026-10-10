import { createClient, type Client } from '@libsql/client'
import { TURSO_AUTH_TOKEN, TURSO_DATABASE_URL } from '@/constants/db'

export let db: Client

export async function connectToDB () {
  if (!TURSO_DATABASE_URL) {
    throw new Error('No se pudo conectar a la base de datos', { cause: 'URL DB es \'undefined\'' })
  }

  db = createClient({
    url: TURSO_DATABASE_URL,
    authToken: TURSO_AUTH_TOKEN
  })

  await checkIfConnectedToDB(db)
}

async function checkIfConnectedToDB (db: Client) {
  try {
    await db.execute('PRAGMA foreign_keys = ON;')
  } catch (error) {
    if (error instanceof Error && error.cause === 'SCHEMA_NOT_FOUND') throw error
    
    throw new Error('No se pudo conectar a la base de datos', { cause: error })
  }
}
