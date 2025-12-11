import type { UserFacingMessageKey, UserFacingMessages } from '../types/messageTypes'

const USER_FACING_MESSAGES: UserFacingMessages = {
  ROUTER_ERROR_MISSING_VIDEO_ID: 'Falta especificar el ID del video',
  ROUTER_ERROR_LOGICALLY_INNACCESIBLE_ROUTE: '¿Cómo llegaste hasta acá?',
  VIDEO_ERROR_NOT_FOUND: 'No se encontró el video con ID:'
}

export function getMessage (errorCode: string, ...extra: string[]) {
  const userMessage = USER_FACING_MESSAGES[errorCode as UserFacingMessageKey]

  if (!extra.length) {
    return userMessage ?? errorCode
  }

  return `${userMessage ?? errorCode} ${extra.join(' ')}`
}
