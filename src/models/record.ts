import {model, Schema, Document} from 'mongoose'

const recordSchema = new Schema({
    id:{
        type: Number,
    },
    operation_id:{
        type: Number,   
    },
    user_id:{
        type: Number, 
    },
    amount:{
        type: String,
        required: true
    },
    operation_response:{
        type: String,
        required: true    
    },
    date:{
        type: String,
        required: true
    },
})

export default model ('record', recordSchema)