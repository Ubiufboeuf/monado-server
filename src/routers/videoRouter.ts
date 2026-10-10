import { Router } from 'express'
import { resolve } from 'node:path'
import express from 'express'
import { DIRECTORIES } from '@/constants/fs'
import { getVideoInfo } from '@/services/video/info'

export const videoRouter = Router()

videoRouter.use('/info/:id', async (req, res) => {
  const { id } = req.params

  const videoInfo = await getVideoInfo(id)
  if (!videoInfo.success) {
    return res.json({
      success: videoInfo.success,
      error: videoInfo.error
    })
  }
  
  res.json({
    success: true,
    video: videoInfo.data
  })
})

videoRouter.use('/:id', (req, res, next) => {
  const { id } = req.params
  const videoPath = `${resolve(DIRECTORIES.STREAMS)}/${id}`
  
  express.static(videoPath)(req, res, next)
})
