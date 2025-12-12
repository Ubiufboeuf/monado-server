import type { UserFacingMessages } from '../types/messageTypes'
import { createFsRoutes } from './fsUtils'

export const DEFAULT_PORT = 4000

export const REQUEST_ERRORS = {
  MISSING_VIDEO_ID: 'REQUEST_ERROR_MISSING_VIDEO_ID',
  LOGICALLY_INNACCESIBLE_ROUTE: 'REQUEST_ERROR_LOGICALLY_INNACCESIBLE_ROUTE'
} as const

export const VIDEO_ERRORS = {
  NOT_FOUND: 'VIDEO_ERROR_NOT_FOUND'
}

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
    THUMBNAIL: '/thumbnail',
    INFO: '/info'
  }
} as const

export const REQUEST_EXAMPLES = {
  VIDEO: `${ROUTES.VIDEO.BASE}/[ID]`,
  THUMBNAIL: `${ROUTES.VIDEO.BASE}${ROUTES.VIDEO.THUMBNAIL}/[ID]`
} as const

export const USER_FACING_MESSAGES: UserFacingMessages = {
  REQUEST_ERROR_MISSING_VIDEO_ID: 'Falta especificar el ID del video',
  REQUEST_ERROR_LOGICALLY_INNACCESIBLE_ROUTE: '¿Cómo llegaste hasta acá?',
  VIDEO_ERROR_NOT_FOUND: 'No se encontró el video con ID:'
}
