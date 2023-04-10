import jwt from 'jsonwebtoken'
import config from '../config/config'
import User from '../models/user'
import { Request, Response, NextFunction } from 'express'

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  const token = String(req.headers['token'])
  if (!token || token == undefined) {
    return res.status(403).send('A token is required for authentication')
  }
  try {
    jwt.verify(token, config.jwtSecret)
    const existEmail = await User.findOne({ userName: req.body.userName })
    console.log(existEmail?.token, token)
    if (existEmail?.token === token) {
    } else {
      return res.status(401).send('Please login')
    }
  } catch (err) {
    return res.status(401).send('Invalid Token')
  }
  return next()
}
export default verifyToken
