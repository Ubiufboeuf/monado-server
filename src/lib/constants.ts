import type { UserFacingMessages } from '../types/messageTypes'
import { createFsRoutes } from './fsUtils'

export const DEFAULT_PORT = 4000

export const ERRORS = {
  MISSING_VIDEO_ID: 'MISSING_VIDEO_ID',
  LOGICALLY_INNACCESIBLE_ROUTE: 'LOGICALLY_INNACCESIBLE_ROUTE',
  VIDEO_NOT_FOUND: 'VIDEO_NOT_FOUND'
} as const

export const FS_ROUTES = createFsRoutes({
  public: 'public'
})

// ROUTES son las constantes con los valores para crear los endpoints,
// pero no son los endpoints.
// Ej, ROUTES.VIDEO.ID no es un endpoint, es una ruta con la que se crea el endpoint /video/:id
export const ROUTES = {
  BASE: '/',
  STREAMS: '/streams',
  VIDEOS: '/videos',
  VIDEO: {
    BASE: '/video',
    ID: '/:id',
    THUMBNAIL: '/:id/thumbnail',
    INFO: '/:id/info'
  }
} as const

export const REQUEST_EXAMPLES = {
  VIDEO: `${ROUTES.VIDEO.BASE}/[ID]`,
  THUMBNAIL: `${ROUTES.VIDEO.BASE}${ROUTES.VIDEO.THUMBNAIL}/[ID]`
} as const

export const USER_FACING_MESSAGES: UserFacingMessages = {
  MISSING_VIDEO_ID: 'Falta especificar el ID del video',
  LOGICALLY_INNACCESIBLE_ROUTE: '¿Cómo llegaste hasta acá?',
  VIDEO_NOT_FOUND: 'No se encontró el video con ID:'
}
