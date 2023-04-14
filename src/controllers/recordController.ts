import { json } from 'express'
import { IRecord, Record } from '../models/record'
import { NextFunction, Request, Response } from 'express'
import { User } from '../models/user'
import { Operation } from '../models/operation'

export const FindAllRecords = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await Record.find()
      .then((records) => {
        res.json(records)
      })
      .catch((err) => {
        next({
          status: 400,
          message: err.message || 'Can not find the records',
        })
      })
  } catch (err) {
    next({ status: 500, message: ' Something went wrong' })
  }
}

export const findRecord = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const record = await Record.findById(req.params.id)
      .populate('Operation', 'type')
      .populate('User', 'userName')
      .exec()
    //console.log(record)
    if (!record) next({ status: 400, message: 'El record don´t exist' })
    res.json(record)
  } catch (error) {
    next({ status: 500, message: ' Something went wrong' })
  }
}

export const findRecordUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let page = Number(req.query.page) || 1
    let size = Number(req.query.size) || 10
    const skip = (page - 1) * size

    console.log(skip, 'skip')
    const recordLength = await Record.find({ user_id: req.params.id })
    const totalRecord = recordLength.length
    const totalPag = totalRecord / size

    const record = await Record.find({ user_id: req.params.id })
      .skip(skip)
      .limit(size)
    res.status(200).json({
      record,
      size,
      page: page + '/' + totalPag,
      totalRecord,
    })
  } catch (error) {
    next({ status: 500, message: ' Something went wrong' })
  }
}

export const deleteAllRecord = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await Record.deleteMany()
    res.status(200).json({ msg: 'All Data successfully deleted' })
  } catch (err) {
    next({ status: 500, message: ' Something went wrong' })
  }
}
