import type { Video } from '../types/videoTypes'

export function isValidVideo (data: unknown): data is Video {
  if (
    typeof data !== 'object' ||
    data === null ||
    !('id' in data) ||
    !('title' in data) ||
    !('duration' in data) ||
    !('videos' in data) ||
    !('thumbnails' in data)
  ) return false

  // chequear campos realmente esenciales
  const hasId = typeof data.id === 'string' && data.id.length > 0
  const hasTitle = typeof data.title === 'string'
  const hasDuration = typeof data.duration === 'number' && data.duration >= 0

  // videos debe ser un array, aunque esté vacío
  const hasVideos = Array.isArray(data.videos)

  // thumbnails igual, debería ser un array, aunque esté vacío
  const hasThumbnails = Array.isArray(data.thumbnails)

  return hasId && hasTitle && hasDuration && hasVideos && hasThumbnails
}
