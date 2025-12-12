import type { REQUEST_ERRORS, VIDEO_ERRORS } from '../lib/constants'

export type UserFacingMessageKey =
  `REQUEST_ERROR_${keyof typeof REQUEST_ERRORS}`
| `VIDEO_ERROR_${keyof typeof VIDEO_ERRORS}`

export type UserFacingMessages = Record<UserFacingMessageKey, string>
