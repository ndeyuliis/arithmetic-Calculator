import {Router} from 'express'
import {
	FindAllOperation,
	findOperation,
	veriRecord
} from '../controllers/operationController';
import auth from '../middlewares/auth';

const router = Router()

router.get('/', FindAllOperation)
router.get('/:type/:num', auth, veriRecord)

export default router