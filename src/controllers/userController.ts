import Users from '../models/user'
import { Request, Response } from 'express'

export const FindAllUsers = async (req: Request, res: Response) => {
  await Users.find()
    .then((usersFind) => {
      res.json(usersFind)
    })
    .catch((err) => {
      res.status(404).json({
        message: err.message || 'Can not find the Users',
      })
    })
}

export const findUser = async (req: Request, res: Response) => {
  try {
    const userFind = await Users.findById(req.params.id)
    if (!userFind)
      return res.status(404).json({ message: 'User does not exist' })
    res.json(userFind)
  } catch (error) {
    res.status(500).json({
      message: `error returning user `,
    })
  }
}
