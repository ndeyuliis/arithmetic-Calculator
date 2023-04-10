import {model, Schema, Document} from 'mongoose'

const operationSchema = new Schema({
     type:{
        type:String,
    }
})

export default model ('operation', operationSchema)