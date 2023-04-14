import mongoose, { Schema } from 'mongoose'

export interface IUser extends mongoose.Document {
  username: string
  password: string
  status: 'active' | 'inactive'
  balance: number
  token: string
}

const userSchema = new Schema(
  {
    userName: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      require: true,
      default: 'active',
    },
    amount: {
      type: Number,
      require: true,
    },
    token: {
      type: String,
    },
    lastTimeOnLine: {
      type: Date,
    },
  },
  {
    versionKey: false,
  }
)

userSchema.pre('save', function () {
  const user = this
})

export const User = mongoose.model<IUser>('User', userSchema)
