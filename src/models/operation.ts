import { model, Schema, Document } from 'mongoose'

const schema = new Schema({
      type: String,
})

export interface IOperation extends Document{
  type: String;
}

export default model<IOperation>('Operation', schema)
