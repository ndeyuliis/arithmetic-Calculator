import {Router} from 'express'
import {
	FindAllRecords,
	findRecord,
	deleteAllRecord
} from '../controllers/recordController';

const router = Router()

router.get('/', FindAllRecords)
router.get('/:id', findRecord)
router.delete('/delete', deleteAllRecord)


export default router