import type { ERRORS } from '../lib/constants'

export type UserFacingMessageKey = keyof typeof ERRORS
export type UserFacingMessages = Record<UserFacingMessageKey, string>
