import {Router} from 'express'
import {
	FindAllUsers,
	findUser
} from '../controllers/userController';

const router = Router()

router.get('/', FindAllUsers)
router.get('/:id', findUser)

export default router