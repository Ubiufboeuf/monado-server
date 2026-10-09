import { ENV_ORIGINS } from '@/constants/api'
import type { NextFunction, Request, Response } from 'express'

export const corsMiddleware = ({ acceptedOrigins = [] }: { acceptedOrigins?: string[] } = {}) => (req: Request, res: Response, next: NextFunction) => {
  const origins: string[] = [...ENV_ORIGINS, ...acceptedOrigins]
  
  const origin = req.header('origin')
  const isPreflight = req.method === 'OPTIONS'

  if (origin && origins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin)

    if (isPreflight) {
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
      res.status(204).end()
      return
    }
  }

  next()
}
