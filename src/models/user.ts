import {model, Schema, Document} from 'mongoose'

const userSchema = new Schema({
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
        require: true
    },
    amount: {
        type: Number,
        require: true
    },    
    token:{
    type: String,
    },
})

userSchema.pre('save', function () {
    const user = this
    
})

export default model ('user', userSchema)