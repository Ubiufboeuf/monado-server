import type { UserFacingMessageKey } from '../types/messageTypes'
import { USER_FACING_MESSAGES } from './constants'

export function getMessage (errorCode: string, ...extra: string[]) {
  const userMessage = USER_FACING_MESSAGES[errorCode as UserFacingMessageKey]

  if (!extra.length) {
    return userMessage ?? errorCode
  }

  return `${userMessage ?? errorCode} ${extra.join(' ')}`
}
