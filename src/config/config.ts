import {config} from 'dotenv'

config()

export default{

    DB:{
        URI: process.env.MONGODB_URI || 'mongodb://localhost/calculator',
        USER: process.env.MONGODB_USER,
        PASSWORD: process.env.MONGODB_PASS,
    },

}