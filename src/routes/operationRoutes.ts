import {Router} from 'express'
import {
	FindAllOperation,
	findOperation,
	OperationAdd,
	OperationSub,
	OperationMult,
	OperationDiv,
	OperationSqua,
	OperationRandom
} from '../controllers/operationController';

const router = Router()

router.get('/', FindAllOperation)
router.get('/:id', findOperation)
router.get('/addition', OperationAdd)
router.get('/subtraction', OperationSub)
router.get('/multiplication', OperationMult)
router.get('/division', OperationDiv)
router.get('/square_root', OperationSqua)
router.get('/random', OperationRandom)

export default router