import {model, Schema} from 'mongoose'
import mongoose from 'mongoose';

const recordSchema = new Schema({
    id:{
        type: Number,
    },
    operation_id:{
        type: mongoose.Schema.Types.ObjectId,   
    },
    user_id:{
        type: mongoose.Schema.Types.ObjectId
    },
    amount:{
        type: String,
    },
    user_balance:{
        type: Number,
        required: true    
    },
    operation_response:{
        type: String,
    },
    date:{
        type: Date,
    },
},{
    versionKey: false,
})

export default model ('record', recordSchema)