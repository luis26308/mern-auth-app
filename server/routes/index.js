import express from 'express'
import authRouter from './authRoutes.js'
import imageRouter from './imageRoutes.js'

const router = express.Router()

router.use(authRouter)
router.use(imageRouter)

export default router
