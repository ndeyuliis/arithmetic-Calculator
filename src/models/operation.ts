import { model, Schema } from 'mongoose'

const operationSchema = new Schema(
  {
    type: {
      type: String,
    },
  },
  {
    versionKey: false,
  }
)

export default model('operation', operationSchema)
