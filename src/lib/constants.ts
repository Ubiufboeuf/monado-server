import { createFsRoutes } from './fsUtils'

export const DEFAULT_PORT = 4000

export const ROUTER_ERRORS = {
  MISSING_VIDEO_ID: 'ROUTER_ERROR_MISSING_VIDEO_ID',
  LOGICALLY_INNACCESIBLE_ROUTE: 'ROUTER_ERROR_LOGICALLY_INNACCESIBLE_ROUTE'
}

export const VIDEO_ERRORS = {
  NOT_FOUND: 'VIDEO_ERROR_NOT_FOUND'
}

export const FS_ROUTES = createFsRoutes({
  public: 'public'
})

export const ROUTES = {
  BASE: '/',
  STREAMS: '/streams',
  VIDEOS: '/videos',
  VIDEO: '/video',
  THUMBNAIL: '/video/thumbnail',
  INFO: '/video/info'
}

export const REQUEST_EXAMPLES = {
  VIDEO: `${ROUTES.VIDEO}/[ID]`
}
