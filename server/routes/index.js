import express from 'express'
import authRoutes from './authRoutes.js'
import apiRoutes from './apiRoutes.js'
const router = express.Router()

router.use('/', authRoutes)
router.use('/api', apiRoutes)

export default router;