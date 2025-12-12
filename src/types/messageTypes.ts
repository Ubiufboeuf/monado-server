import type { ROUTER_ERRORS, VIDEO_ERRORS } from '../lib/constants'

export type UserFacingMessageKey =
  `ROUTER_ERROR_${keyof typeof ROUTER_ERRORS}`
| `VIDEO_ERROR_${keyof typeof VIDEO_ERRORS}`

export type UserFacingMessages = Record<UserFacingMessageKey, string>
