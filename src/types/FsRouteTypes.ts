import type { FsRoute } from '../models/FsRoute'

export interface FsRoutesProps {
  public: string
}

type FsRoutesKeys =
  'PUBLIC'
| 'STREAMS'
| 'ASSETS'
| 'INFO'

export type FsRoutes = Record<FsRoutesKeys, FsRoute>
