import type { Video } from '@/types/videoTypes'

const videos: Video[] = [
  { id: '798etN3reyk', title: 'mercy (jing yuan) - halacg' },
  { id: 'siJE6CADALM', title: 'fantastical colored heartbeat - sanz' },
  { id: 'wKVJi-FLvak', title: 'rubia - hi3' }
]

export async function getRecomendationsById (id: string): Promise<Video[]> {
  if (id) return videos
  return videos
}
