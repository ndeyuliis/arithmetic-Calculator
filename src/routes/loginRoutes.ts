import {Router} from 'express'
import {
	createUser,
	loginUser,
	updateUser
} from '../controllers/loginController';
import auth from '../middlewares/auth';


const router = Router()

// Login routes
router.post('/singup', createUser)
router.post('/login', loginUser)
router.put('/logout', updateUser)
router.post('/refresh', auth, (req, res) => {
	res.status(200).send('Welcome');
});

export default router


