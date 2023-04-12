import User from '../models/user'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { NextFunction, Request, Response } from 'express'
import config from '../config/config'
import Record from '../models/record'

const secret = String(process.env.SECRET)

async function createToken(user: String, password: String) {
  return jwt.sign({ user, password }, config.jwtSecret, {
    expiresIn: 86400,
  })
}

// singup
export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!(req.body.userName && req.body.password)) {
      next({ status: 400, message: 'Please send your email and password' })
    }
    const emailValid = validateEmail(req.body.userName)
    if (emailValid === false) {
      next({ status: 403, message: ' Email is incorrect' })
    }
    const userExist = await User.findOne({ userName: req.body.userName })

    if (userExist) {
      next({ status: 400, message: ' The user exist' })
    }
    const encryptPass = await register(req.body.password)

    const newUser = new User({
      password: encryptPass,
      userName: req.body.userName,
      status: 'active',
    })
    const userSaved = await newUser.save()
    res.status(201).json(userSaved)
  } catch (err) {
    next({ status: 500, message: ' Something went wrong' })
  }
}

// login
export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userName, password } = req.body
  try {
    if (!(userName && password)) {
      next({ status: 400, message: 'Email and password is required' })
    }
    const existEmail = await User.findOne({ userName })
    if (!existEmail) {
      next({ status: 400, message: 'Email does not exist' })
    } else if (existEmail.status == 'active') {
      const existPass = bcrypt.compareSync(password, existEmail.password)
      if (existPass === true) {
        const tokenSecurity = await createToken(userName, password)
        await User.updateOne(
          { userName },
          {
            $set: {
              token: tokenSecurity,
            },
          }
        )
        const newRecord = new Record({
          user_id: existEmail?._id,
          amount: 50000,
          user_balance: 50000,
        })
        await newRecord.save()

        return res.status(200).json({ token: tokenSecurity })
      } else {
        next({ status: 400, message: 'The email or Password is wrong' })
      }
    } else {
      next({ status: 400, message: 'The user is inactive' })
    }
  } catch (err) {
    next({ status: 500, message: ' Something went wrong' })
  }
}

// logout
export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.body.userName && !req.body.password) {
      next({ status: 400, message: 'User login can not be empty' })
    }
    const dateNow = Date.now()
    await User.updateOne(
      {
        userName: req.body.userName,
      },
      {
        $set: {
          lastTimeOnLine: dateNow,
          token: '',
        },
      }
    )

    res.send('The session has been closed')
  } catch (err) {
    next({ status: 500, message: err || ' Something went wrong' })
  }
}

function validateEmail(email: String) {
  const re = /\S+@\S+\.\S+/
  const result = re.test(String(email))
  return result
}

async function register(params: any) {
  const salt = await bcrypt.genSalt(10)
  const passwordHash = await bcrypt.hash(params, salt)
  return passwordHash
}
