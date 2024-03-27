import express from 'express'
import { refresh } from '../controllers/refresh.js'

const router = express.Router()

router.get('/refresh', refresh)

export default router
