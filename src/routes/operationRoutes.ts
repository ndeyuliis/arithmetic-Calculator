import { Router, Express } from 'express'
import {
  FindAllOperation,
  createOperation,
  veriRecord,
} from '../controllers/operationController'
import auth from '../middlewares/auth'
const router = Router()

router.get('/', FindAllOperation)
router.put('/:type', auth, veriRecord)
router.post('/create', createOperation)

export default router
