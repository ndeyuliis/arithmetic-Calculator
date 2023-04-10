import User from '../models/user'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { Request, Response } from 'express'
import config from '../config/config'
import Record from '../models/record'

async function createToken(user: String, password: String) {
  return jwt.sign({ user, password }, config.jwtSecret, {
    expiresIn: 86400,
  })
}

// singup
export const createUser = async (req: Request, res: Response) => {
  try {
    if (!(req.body.userName && req.body.password)) {
      return res
        .status(400)
        .json({ msg: 'Please send your email and password' })
    }
    const emailValid = validateEmail(req.body.userName)
    if (emailValid === false) {
      return res.status(409).send('Email is incorrect')
    }
    const userExist = await User.findOne({ userName: req.body.userName })

    if (userExist) {
      return res.status(400).json({ msg: ' The user exist' })
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
    res.status(500).send('error')
  }
}

// login
export const loginUser = async (req: Request, res: Response) => {
  const { userName, password } = req.body
  if (!(userName && password)) {
    return res.status(400).send('Email and password is required')
  }
  const existEmail = await User.findOne({ userName })
  if (!existEmail) {
    return res.status(400).send('Email does not exist')
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
      return res.status(400).send('The email or Password is wrong')
    }
  } else {
    return res.status(400).send('The user is inactive')
  }
}

// logout
export const updateUser = async (req: Request, res: Response) => {
  try {
    if (!req.body.userName && !req.body.password) {
      return res.status(400).send({
        message: 'User login can not be empty',
      })
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
    res.json(err)
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
