import { FFmpegAdapter, MediaEngine } from '@yt-dlx/media';
import { MP4BoxAdapter, StreamsEngine } from '@yt-dlx/streams';
import { YtDlpDownloader, YtEngine } from '@yt-dlx/yt';
import { basename, extname } from 'node:path'

export async function addNewVideo (url: string) {
  let ytId
  try {
    const _url = new URL(url)
    ytId = _url.searchParams.get('v')
  } catch {/* empty */}

  if (!ytId) return
  
  // 1. Descargar video
  const yt = new YtEngine({ adapter: new YtDlpDownloader() })
  const ytVideoResult = await yt.download(url, 'best-video')

  // 2. Descargar audio
  const ytAudioResult = await yt.download(url, 'best-audio', { outputTemplate: 'audio.%(ext)s' })

  if (!ytVideoResult?.filePath || !ytAudioResult?.filePath) return
 
  // 3. Normalizar el video
  const media = new MediaEngine({ adapter: new FFmpegAdapter() })
  const mediaResult = await media.normalize(ytVideoResult.filePath, '.', ['360p', '144p'])

  // 4. Crear streams
  const files = [...mediaResult.outputFiles, ytAudioResult.filePath]
  const streams = new StreamsEngine({ adapter: new MP4BoxAdapter() })
  const result = await streams.fragment(
    files.map((file) => {
      const ext = extname(file)
      const slug = basename(file, ext)
      return { path: file, res: slug }
    }),
    `./public/streams/${ytId}`
  )

  return result
}
