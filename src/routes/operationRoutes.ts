import {Router} from 'express'
import {
	FindAllOperation,
	createOperation,
	veriRecord
} from '../controllers/operationController';
import auth from '../middlewares/auth';

const router = Router()

router.get('/', FindAllOperation)
router.get('/:type/:num', auth, veriRecord)
router.put('/create', createOperation )

export default router