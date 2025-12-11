import type { Video } from '../videoTypes'

const videos = new Map<string, Video>()

export function getVideoById (id: string) {
  if (!videos.has(id)) return

  return videos.get(id)
}
