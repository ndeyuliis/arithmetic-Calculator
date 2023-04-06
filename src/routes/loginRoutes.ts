import {Router} from 'express'
import {
	createUser,
	findUser,
	updateUser
} from '../controllers/loginController';

const router = Router()


router.post('/singup', createUser)

router.post('/login', findUser)

router.put('/logout', updateUser)



export default router;