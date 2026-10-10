import type { InArgs } from '@libsql/client'

export interface DatabaseStatement {
  sql: string
  args: InArgs
}

export type DatabaseStatements = Array<DatabaseStatement>
