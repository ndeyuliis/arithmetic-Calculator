import { Router } from 'express'
import userRoutes from './userRoutes'
import loginRoutes from './loginRoutes'
import operationRoutes from './operationRoutes'
import recordRoutes from './recordRoutes'

const router = Router()

// Routes
router.use('/user', userRoutes)
router.use('/register', loginRoutes)
router.use('/operation', operationRoutes)
router.use('/record', recordRoutes)

router.get('/ping', (req, res) => {
  res.status(200).send('pong')
})

// in case the link does not exist
router.use((req, res, next) => {
  next({ status: 400, message: ' This path not found' })
})

export default router
