import jwt from 'jsonwebtoken';
import config from '../config/config'

const verifyToken = (req, res, next) => {
	const token = req.headers['token'];

	if (!token) {
		return res.status(403).send('A token is required for authentication');
	}
	try {
		const decoded = jwt.verify(token, config.jwtSecret);
		req.user = decoded;
	} catch (err) {
		return res.status(401).send('Invalid Token');
	}
	return next();
};
export default verifyToken;
