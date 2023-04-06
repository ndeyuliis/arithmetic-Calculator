import {config} from 'dotenv'

config()

export default{

        jwtSecret: '12345',
        URI: process.env.MONGODB_URI || 'mongodb://localhost/calculator',
     
}