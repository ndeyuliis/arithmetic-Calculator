import jwt from 'jsonwebtoken'
import config from '../config/config'
import User from '../models/user'
import { Request, Response, NextFunction } from 'express'

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log(req.header('authorization'))
    if (
      !req.header('authorization') ||
      req.header('authorization') == undefined
    ) {
      next({ status: 403, message: 'A token is required for authentication' })
    } else {
      const token: string = req.header('authorization') || ''

      console.log(token, config.jwtSecret)
      const payload = jwt.verify(token, config.jwtSecret)
      const existEmail = await User.findOne({ userName: req.body.userName })
      console.log(payload, 'error token')
      if (existEmail?.token === token) {
      } else {
        next({ status: 403, message: 'Please login' })
      }
    }
  } catch (err) {
    next({ status: 500, message: err || ' Something went wrong' })
  }
  return next()
}
export default verifyToken
