import type { UserFacingMessages } from '../types/messageTypes'
import { createFsRoutes } from './fsUtils'

export const DEFAULT_PORT = 4000

export const ERRORS = {
  MISSING_VIDEO_ID: 'MISSING_VIDEO_ID',
  LOGICALLY_INNACCESIBLE_ROUTE: 'LOGICALLY_INNACCESIBLE_ROUTE',
  VIDEO_NOT_FOUND: 'VIDEO_NOT_FOUND',
  POSTER_NOT_FOUND: 'POSTER_NOT_FOUND',
  THUMBNAILS_NOT_FOUND: 'THUMBNAILS_NOT_FOUND',
  INTERNAL_FETCHING_THUMBNAILS: 'INTERNAL_FETCHING_THUMBNAILS',
  THUMBNAIL_NOT_FOUND: 'THUMBNAIL_NOT_FOUND',
  BAD_STREAMS_REQUEST: 'BAD_STREAMS_REQUEST',
  STREAM_NOT_FOUND: 'STREAM_NOT_FOUND',
  INTERNAL_BAD_STREAM: 'INTERNAL_BAD_STREAM',
  INTERNAL_COULD_NOT_LOAD_VIDEOS: 'INTERNAL_COULD_NOT_LOAD_VIDEOS'
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
    POSTER: '/:id/poster',
    THUMBNAIL: '/:id/thumbnail',
    INFO: '/:id/info'
  },
  SEARCH: '/search'
} as const

export const REQUEST_EXAMPLES = {
  VIDEO: `${ROUTES.VIDEO.BASE}/[ID]`,
  THUMBNAIL: `${ROUTES.VIDEO.BASE}${ROUTES.VIDEO.THUMBNAIL}/[ID]`,
  VIDEO_STREAM: `${ROUTES.STREAMS}/[ID]`
} as const

export const USER_FACING_MESSAGES: UserFacingMessages = {
  MISSING_VIDEO_ID: 'Falta especificar el ID del video',
  LOGICALLY_INNACCESIBLE_ROUTE: '¿Cómo llegaste hasta acá?',
  VIDEO_NOT_FOUND: 'No se encontró el video con ID:',
  POSTER_NOT_FOUND: 'No se encontró el poster del video',
  THUMBNAILS_NOT_FOUND: 'No se encontraron las carátulas del video',
  INTERNAL_FETCHING_THUMBNAILS: 'Error interno al conseguir las carátulas del video',
  THUMBNAIL_NOT_FOUND: 'No se encontró la carátula',
  BAD_STREAMS_REQUEST: 'Falta especificar el ID del video',
  STREAM_NOT_FOUND: 'No se encontró el video',
  INTERNAL_BAD_STREAM: 'Error interno al conseguir el stream del video',
  INTERNAL_COULD_NOT_LOAD_VIDEOS: 'No se pudieron cargar los videos'
}
