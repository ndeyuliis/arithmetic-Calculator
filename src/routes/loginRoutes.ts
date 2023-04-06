import {Router} from 'express'
import {
	createUser,
	findUser,
	updateUser
} from '../controllers/loginController';
import auth from '../middlewares/auth';


const router = Router()


router.post('/singup', createUser)

router.post('/login', findUser)

router.put('/logout', updateUser)

router.post('/refresh', auth, (req, res) => {
	res.status(200).send('Welcome');
});

router.get('/ping', (req, res) => {
	res.status(200).send('pong');
});

// in case the link does not exist
router.use((req, res, next) => {
	res.status(404);
	res.json({
		message: 'Error: Path not found',
	});
});

export default router;