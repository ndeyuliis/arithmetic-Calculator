import {Router} from 'express'
import {
	FindAllOperation,
	findOperation
} from '../controllers/operationController';

const router = Router()

router.get('/', FindAllOperation)
router.get('/:id', findOperation)

export default router