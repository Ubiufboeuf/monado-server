import type { Video } from '../types/videoTypes'

const videos = new Map<string, Video>()

export function getVideoById (id: string) {
  if (!videos.has(id)) return

  return videos.get(id)
}
