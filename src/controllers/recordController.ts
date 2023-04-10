import { json } from 'express'
import Record from '../models/record'
import { Request, Response } from 'express'

export const FindAllRecords = async (req: Request, res: Response) => {
  await Record.find()
    .then((records) => {
      res.json(records)
    })
    .catch((err) => {
      res.status(404).json({
        message: err.message || 'Can not find the records',
      })
    })
}

export const findRecord = async (req: Request, res: Response) => {
  try {
    const record = await Record.findById(req.params.id)
    if (!record)
      return res.status(404).json({ message: 'El record don´t existe' })
    res.json(record)
  } catch (error) {
    res.status(500).json({
      message: `Error find record by id `,
    })
  }
}

export const findRecordUser = async (req: Request, res: Response) => {
  try {
    let page = Number(req.query.page) || 1
    let size = Number(req.query.size) || 1
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
    res.status(500).json({
      message: `Error find record by id `,
    })
  }
}

export const deleteAllRecord = async (req: Request, res: Response) => {
  try {
    await Record.deleteMany()
    res.status(200).json({ msg: 'All Data successfully deleted' })
  } catch (err) {
    res.status(400).json({ msg: err })
  }
}
