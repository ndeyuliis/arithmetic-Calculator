import {model, Schema, Document} from 'mongoose'

const operationSchema = new Schema({
    id:{
        type: Number,
    },
    type:{
        type:String,
    }
})

export default model ('operation', operationSchema)