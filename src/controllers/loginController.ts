import User from '../models/user';
import bcrypt, { hash } from 'bcrypt';
import jwt from 'jsonwebtoken';
import {Request, Response} from 'express'
import config from '../config/config'

function createToken(user) {
return jwt.sign({id: user.id, email: user.email}, config.jwtSecret, {
	expiresIn: 86400
})
}

// singup
export const createUser = async (req: Request , res: Response) => {
	try {
		if (!(req.body.userName && req.body.password )) {
			return res.status(400).json({msg: 'Please send your email and password'});
		}
		const emailValid = validateEmail(req.body.userName);
		if (emailValid === false) {
			return res.status(409).send('Email is incorrect');
		}
		const userExist = await User.findOne({ userName: req.body.userName });

		if (userExist) {
			return res.status(400).json({msg: ' The user exist'});
		}
		const encryptPass = await register(req.body.password);

		const newUser = new User({
			password: encryptPass,
			userName: req.body.userName,
		});
		const userSaved = await newUser.save();
		res.status(201).json(newUser);
	} catch (err) {
		res.status(500).send('error')
	}
};

// login
export const loginUser = async (req, res) => {
		const { userName, password } = req.body;
	if (!(userName && password)) {
		return res.status(400).send('Email and password is required');
	}
	const existEmail = await User.findOne({ userName });
	if (!existEmail) {
		return res.status(400).send('Email does not exist');
	} else {
		const existPass = bcrypt.compareSync(password, existEmail.password);
		if (existPass === true) {
			return res.status(200).json({token: createToken(existPass)})
		} else {
			return res.status(400).send('The email or Password is wrong');
		}
	}
};

// logout
export const updateUser = async (req, res) => {
	if (!req.body.email && !req.body.password) {
		return res.status(400).send({
			message: 'User login can not be empty',
		});
	}
	const dateNow = Date.now();
	User.findOneAndUpdate(
		req.body.email,
		{
			lastTimeOnLine: dateNow,
		},
		{ new: true }
	)
		.then((note) => {
			if (!note) {
				return res.status(401).send({
					message: 'Problem with user',
				});
			}
			res.send('The session has been closed');
		})
		.catch((err) => {
			res.json(err);
		});
};

function validateEmail(email) {
	const re = /\S+@\S+\.\S+/;
	const result = re.test(email);
	return result;
}

async function register(params) {
	const salt = await bcrypt.genSalt(10);
	const passwordHash = await bcrypt.hash(params, salt)
	return passwordHash;
}
