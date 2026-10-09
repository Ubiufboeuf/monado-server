import { Router } from 'express'
import { resolve } from 'node:path'
import express from 'express'
import { DIRECTORIES } from '@/constants/fs'

export const videoRouter = Router()

videoRouter.use('/:id', (req, res, next) => {
  const { id } = req.params
  const videoPath = `${resolve(DIRECTORIES.STREAMS)}/${id}`
  
  express.static(videoPath)(req, res, next)
})
