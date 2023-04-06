import {config} from 'dotenv'

config()

export default{

    
        URI: process.env.MONGODB_URI || 'mongodb://localhost/calculator',
     
}