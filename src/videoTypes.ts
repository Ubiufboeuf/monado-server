export interface Video {
	id: string | undefined
	title: string | undefined
	uploader: string | undefined
	uploader_id: string | undefined
	channel_follower_count: number | undefined
	channel_is_verified: boolean | undefined
	upload_date: string | undefined
	duration: number | undefined
	width: number | undefined
	height: number | undefined
	mixed_size: number | undefined
	aspect_ratio: string | undefined
	audio: AudioMetadata | null
	videos: ResolutionMetadata[]
	min_video_resolution: string | undefined
	max_video_resolution: string | undefined
	thumbnails: Thumbnail[]
	min_thumbnail: string | undefined
	max_thumbnail: string | undefined
	release_timestamp: number
}

export interface AudioMetadata {
	codec: string
	codec_long_name: string
	channel_layout: string | undefined
	channels: number | undefined
	bit_rate: number
	bit_rate_kbps: number
	duration: number
	sample_rate: number | undefined
	size: number | undefined
}

export interface ResolutionMetadata {
	id: string
	codec: string
	codec_long_name: string
	bit_rate: number
	bit_rate_kbps: number
	duration: number
	size: number | undefined
	height: number
	width: number
	aspect_ratio: string | undefined
	fps: number | undefined
}

export interface Thumbnail {
  id: string
  height: number
  width: number
  url: string | null
}
