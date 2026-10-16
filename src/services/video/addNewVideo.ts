import { FFmpegAdapter, MediaEngine } from '@yt-dlx/media'
import { MP4BoxAdapter, StreamsEngine } from '@yt-dlx/streams'
import { YtDlpDownloader, YtEngine } from '@yt-dlx/yt'
import { mkdir, rename, rm } from 'node:fs/promises'
import { basename, extname, dirname } from 'node:path'

async function orchestrator (tempDir: string, url: string) {
  const yt = new YtEngine({ adapter: new YtDlpDownloader() })
  const media = new MediaEngine({ adapter: new FFmpegAdapter() })
  const streams = new StreamsEngine({ adapter: new MP4BoxAdapter() })

  // const info = Schema.safeParse(await yt.info(url))
  // if (info) {
  //   // If exists in DB, return
  // }

  const ytVideoResult = await yt.download(url, 'worst-video', { outputDir: tempDir })
  const ytAudioResult = await yt.download(url, 'worst-audio', { outputDir: tempDir, outputTemplate: 'audio.%(ext)s' })
  if (!ytVideoResult?.filePath || !ytAudioResult?.filePath) return
 
  const mediaResult = await media.normalize(ytVideoResult.filePath, tempDir, ['360p', '144p'])
  if (!mediaResult.outputFiles.length) return

  const files = [...mediaResult.outputFiles, ytAudioResult.filePath]
  const streamsResult = await streams.fragment(
    files.map((file) => {
      const ext = extname(file)
      const slug = basename(file, ext)
      return { path: file, res: slug }
    }),
    `${tempDir}/streams`
  )

  return dirname(streamsResult.outputManifest)
}

export async function addNewVideo (url: string) {
  let ytId
  try {
    const _url = new URL(url)
    ytId = _url.searchParams.get('v')
  } catch {/* empty */}

  if (!ytId) return undefined

  const tempDir = `temp/${ytId}-${crypto.randomUUID()}`
  const destination = `public/streams/${ytId}`

  try {
    await mkdir(tempDir, { recursive: true })
    await mkdir(dirname(destination), { recursive: true })

    const streamsResult = await orchestrator(tempDir, url)
    if (!streamsResult) return

    await rename(streamsResult, destination)
  } finally {
    await rm(tempDir, { recursive: true, force: true }) 
  }

  return destination
}
