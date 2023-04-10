import Operation from '../models/operation'
import User from '../models/user'
import Record from '../models/record'
import RandomOrg from 'random-org'
import { Request, Response } from 'express'

export const FindAllOperation = async (req: Request, res: Response) => {
  await Operation.find()
    .then((operations) => {
      res.json(operations)
    })
    .catch((err) => {
      res.status(404).json({
        message: err.message || 'Can not find the operations',
      })
    })
}

export const createOperation = async (req: Request, res: Response) => {
  if (req.body.type) {
    const newOperation = new Operation({
      type: req.body.type,
    })
    await newOperation.save()
    res.status(200).json({ msg: 'The type of operation was added' })
  } else {
    res.status(400).json({ msg: 'Please add type of operation' })
  }
}

export const veriRecord = async (req: Request, res: Response) => {
  console.log(req.params.num, req.params.type)
  const userData = await User.findOne({ userName: req.body.userName })
  const recordData = await Record.find({ user_id: userData?._id })
    .sort({ $natural: -1 })
    .limit(1)
  const operationData = await Operation.find({ type: req.params.type })
  console.log(operationData, 'operation')
  if (recordData[0] != undefined) {
    const totalOperation = await operations(
      recordData[0],
      req.params.type,
      req.params.num
    )
    if (totalOperation < 0) {
      res.status(200).json({ msg: 'enough to cover the request' })
    } else {
      const dateNow = Date.now()
      const newRecord = new Record({
        user_id: userData?._id,
        operation_id: operationData[0]._id,
        amount: recordData[0].amount,
        operation_response: totalOperation,
        user_balance: !isNaN(totalOperation)
          ? totalOperation
          : recordData[0].user_balance,
        date: dateNow,
      })
      await newRecord.save()
      res.status(200).json({ msg: 'Operation correct' })
    }
  } else {
    res.status(400).json({ msg: 'The user must login ' })
  }
}

const operationFunctions = {
  addition: (balance:Number, value:Number) => add(balance, value),
  subtraction: (balance:Number, value:Number) => subtract(balance, value),
  multiplication: (balance:Number, value:Number) => multiply(balance, value),
  division: (balance:Number, value:Number) => divide(balance, value),
  square_root: (balance: Number) => square_root(balance),
  random: (value: Number) => randomInteger(value),
}

const operations = async (record, typeOperation, valueUser) => {
  console.log(record, 'record')
  const operation = operationFunctions[typeOperation]
  console.log(operation, 'operation')
  if (!operation) {
    console.error('Sorry, please enter a valid operator!')
    return 'Sorry, please enter a valid operator!'
  }

  const result = await operation(record.user_balance, valueUser)
  console.log(result, 'result operation')
  return result
}

const add = async (amount: Number, value: Number): Promise<number> => {
  return Number(amount) + Number(value)
}

const subtract = async (amount: Number, value: Number): Promise<number> => {
  return Number(amount) - Number(value)
}

const multiply = async (amount: Number, value: Number): Promise<number> => {
  return Number(amount) * Number(value)
}

const divide = async (amount: Number, value: Number): Promise<number> => {
  return Number(amount) / Number(value)
}
const square_root = async (value: Number): Promise<number> => {
  return Math.sqrt(Number(value))
}

const randomInteger = async (value: Number): Promise<string> => {
  const random = new RandomOrg({
    apiKey: '1f84e5d7-6c21-4cca-8c8a-770240cf3773',
  })
  const valueFinal = await random
    .generateStrings({ n: Number(value), length: 10, characters: 'string' })
    .then(function (result) {
      return result.random.data
    })
  console.log(valueFinal[0])
  return String(valueFinal[0])
}
