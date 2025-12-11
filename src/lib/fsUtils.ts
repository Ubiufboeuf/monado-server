import { resolve } from 'node:path'
import type { FsRoutes, FsRoutesProps } from '../types/FsRouteTypes'
import { FsRoute } from '../models/FsRoute'

export function createFsRoutes ({ public: publicFolder }: FsRoutesProps): FsRoutes {
  const PUBLIC = publicFolder
  const STREAMS = `${publicFolder}/streams`
  const ASSETS = `${publicFolder}/assets`
  const INFO = `${publicFolder}/info`
  
  const routes = {
    PUBLIC,
    STREAMS,
    ASSETS,
    INFO
  }

  const fsRoutes: Record<string, FsRoute> = {}

  for (const routeKey in routes) {
    const route = routes[routeKey as keyof typeof routes]
    const fsRoute = new FsRoute(route)
    fsRoute.fullPath = resolve(route)

    fsRoutes[routeKey] = fsRoute
  }

  return fsRoutes as FsRoutes
}
