import mongoose from 'mongoose'
import config from './config/config'
;(async () => {
  try {
    const db = await mongoose.connect(config.URI)
    console.log(' Database is connected to:', db.connection.name)
    // self-invoked function
  } catch (error) {
    console.error(error)
  }
})()
