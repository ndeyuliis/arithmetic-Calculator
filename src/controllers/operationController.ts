import { Operation } from '../models/operation'
import { User } from '../models/user'
import { Record } from '../models/record'
import RandomOrg from 'random-org'
import { NextFunction, Request, Response } from 'express'
import { ParamsDictionary, Query } from 'express-serve-static-core'

export const FindAllOperation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await Operation.find()
    .then((operations) => {
      res.json(operations)
    })
    .catch((err) => {
      next({
        status: 400,
        message: err.message || 'Can not find the operations',
      })
    })
}

export const createOperation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.body.type) {
      const newOperation = { type: req.body.type }
      const operation = new Operation(newOperation)
      await operation.save()
      res.status(200).json({ msg: 'The type of operation was added' })
    } else {
      next({ status: 403, message: 'Please add type of operation' })
    }
  } catch (error) {
    next({ status: 500, message: ' Something went wrong' })
  }
}

enum OperationType {
  addition = 'addition',
  subtraction = 'subtraction',
  division = 'division',
  square_root = 'square_root',
  multiplication = 'multiplication',
  random_string = 'random',
}
interface Params {
  type: OperationType
  num: number
}

export const veriRecord = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log(req.body.num, 'number param', req.params.type, 'type param')

    const userData = await User.findOne({ userName: req.body.userName })
    const recordData = await Record.find({ user_id: userData?._id })
      .sort({ $natural: -1 })
      .limit(1)

    const newOperation = { type: req.params.type }
    const operationData = await Operation.find(newOperation)
    console.log(operationData, 'operation')
    if (recordData[0] != undefined) {
      const totalOperation = await operations(
        recordData[0],
        OperationType[req.params.type as keyof typeof OperationType],
        req.body.num
      )
      if (typeof totalOperation == 'number' && totalOperation < 0) {
        res.status(200).json({ msg: 'enough to cover the request' })
      } else {
        const dateNow = Date.now()
        const newRecord = new Record({
          user_id: userData?._id,
          operation_id: operationData[0]._id,
          amount: recordData[0].amount,
          operation_response: totalOperation,
          user_balance:
            typeof totalOperation == 'number'
              ? totalOperation
              : recordData[0].user_balance,
          date: dateNow,
        })
        const saveRecord = await newRecord.save()
        console.log(saveRecord, 'grabado')
        res.status(200).json({ msg: 'Operation correct' })
      }
    } else {
      next({ status: 403, message: 'The user must login ' })
    }
  } catch (err) {
    next({ status: 500, message: ' Something went wrong' })
  }
}

const operationFunctions = {
  addition: (balance: Number, value: Number) => add(balance, value),
  subtraction: (balance: Number, value: Number) => subtract(balance, value),
  multiplication: (balance: Number, value: Number) => multiply(balance, value),
  division: (balance: Number, value: Number) => divide(balance, value),
  square_root: (balance: Number) => square_root(balance),
  random: (value: Number) => randomInteger(value),
}
interface Record {
  user_balance: Number
}

const operations = async (
  record: Record,
  typeOperation: OperationType,
  valueUser: Number
): Promise<number | String> => {
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
