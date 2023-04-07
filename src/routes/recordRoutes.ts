import {Router} from 'express'
import {
	FindAllRecords,
	findRecord
} from '../controllers/recordController';

const router = Router()

router.get('/', FindAllRecords)
router.get('/:id', findRecord)

export default router