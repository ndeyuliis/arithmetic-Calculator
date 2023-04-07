import {Router} from 'express'
import userRoutes from './userRoutes'
import loginRoutes from './loginRoutes';


const router = Router()


// User routes
router.use('/user', userRoutes)
router.use('/register', loginRoutes)


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