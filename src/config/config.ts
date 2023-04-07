import {config} from 'dotenv'

config()

export default{
        KEY: process.env.TOKEN_KEY || '1234',
        jwtSecret: process.env.SECRET || '123',
        URI: process.env.MONGODB_URI || 'mongodb://localhost/calculator1',
     
}