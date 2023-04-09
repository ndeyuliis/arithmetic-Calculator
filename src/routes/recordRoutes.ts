import {Router} from 'express'
import {
	FindAllRecords,
	findRecord,
	deleteAllRecord,
	findRecordUser
} from '../controllers/recordController';

const router = Router()

router.get('/', FindAllRecords)
router.get('/:id', findRecord)
router.get('/user/:id', findRecordUser)

router.delete('/delete', deleteAllRecord)


export default router