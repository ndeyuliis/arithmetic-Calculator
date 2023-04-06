import {model, Schema, Document} from 'mongoose'

const userSchema = new Schema({
    id:{
        type: Number,
    },
    userName:{
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        trim:true
    },
    password:{
        type: String,
        required: true    
    },
    status:{
        type: String,
        required: true
  },
})

export default model ('user', userSchema)