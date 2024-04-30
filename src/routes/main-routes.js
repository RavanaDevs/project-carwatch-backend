import express from 'express'
import { refresh } from '../controllers/refresh.js'
import { debug } from '../controllers/debug.js'
import  {addTrain}   from '../controllers/test.js'

const router = express.Router()

router.get('/refresh', refresh)
router.get('/debug', debug)
router.post("/test", addTrain)

export default router
