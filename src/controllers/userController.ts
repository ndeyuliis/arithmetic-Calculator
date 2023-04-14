import { User } from '../models/user'
import { NextFunction, Request, Response } from 'express'

export const FindAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await User.find()
      .then((usersFind) => {
        res.json(usersFind)
      })
      .catch((err) => {
        next({ status: 400, message: err.message || 'Can not find the Users' })
      })
  } catch (err) {
    next({ status: 500, message: ' Something went wrong' })
  }
}

export const findUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userFind = await User.findById(req.params.id)
    if (!userFind) next({ status: 400, message: 'User does not exist' })
    res.json(userFind)
  } catch (error) {
    next({ status: 500, message: ' Something went wrong' })
  }
}
