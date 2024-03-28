import express from 'express'
import { refresh } from '../controllers/refresh.js'
import { debug } from '../controllers/debug.js'

const router = express.Router()

router.get('/refresh', refresh)
router.get('/debug', debug)

export default router
