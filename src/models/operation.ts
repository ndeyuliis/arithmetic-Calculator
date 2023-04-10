import {model, Schema, Document} from 'mongoose'

const operationSchema = new Schema({
     type:{
        type:String,
    },
},{
        versionKey: false,
})

export default model ('operation', operationSchema)