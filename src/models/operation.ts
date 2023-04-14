import mongoose, { Schema } from 'mongoose'

const operationSchema = new Schema({
  type: String,
})

export interface IOperation extends mongoose.Document {
  type:
    | 'addition'
    | 'subtraction'
    | 'multiplication'
    | 'division'
    | 'square_root'
    | 'random_string'
}

export const Operation = mongoose.model<IOperation>(
  'Operation',
  operationSchema
)
