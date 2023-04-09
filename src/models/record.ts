import {model, Schema, Document} from 'mongoose'

const recordSchema = new Schema({
    id:{
        type: Number,
    },
    operation_id:{
        type: Number,   
    },
    user_id:{
        type:String, 
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
})

export default model ('record', recordSchema)