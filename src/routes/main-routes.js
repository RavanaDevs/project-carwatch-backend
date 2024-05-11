import express from 'express'
import { refresh } from '../controllers/refresh.js'
import { debug } from '../controllers/debug.js'
import  {addTrain}   from '../controllers/test.js'
import { addProfile, deleteProfile, getAllProfiles, getOneProfile, updateProfile } from '../controllers/profile.js'

const router = express.Router()

router.get('/refresh', refresh)
router.get('/debug', debug)
router.post("/test", addTrain)

router.post('/profile', addProfile)
router.get('/profile',getOneProfile)
router.get('/profile/all',getAllProfiles)
router.put('/profile',updateProfile)
router.delete('/profile',deleteProfile)

export default router
