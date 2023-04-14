import mongoose, { Schema } from 'mongoose'
import { IUser } from './user'
import { IOperation } from './operation'

export interface IRecord extends mongoose.Document {
  operation: IOperation['_id']
  user: IUser['_id']
  amount: number
  user_balance: number
  operation_response: string
  date: Date
}

const recordSchema = new Schema(
  {
    id: {
      type: Number,
    },
    operation_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'operation',
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
    amount: {
      type: String,
    },
    user_balance: {
      type: Number,
      required: true,
    },
    operation_response: {
      type: String,
    },
    date: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    versionKey: false,
  }
)

export const Record = mongoose.model<IRecord>('Record', recordSchema)
