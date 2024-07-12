import mongoose from 'mongoose'
import { env } from '../lib/env'

export const connectToDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${env.DB_USER}:${env.DB_PASSWORD}@${env.DB_HOST}/?retryWrites=true&w=majority&appName=${env.DB_NAME}`,
      { useNewUrlParser: true, useUnifiedTopology: true }
    )

    console.log('Connected to mongo!!!')
  } catch (err) {
    console.log('Could not connect to MongoDB')
  }
}

export const closeDB = () => {
  if (env.DB_METHOD === 'drop') {
    mongoose.connection.dropDatabase().catch((err) => {
      console.log(err)
    })
  }
  mongoose.connection.close(function () {
    console.log('Mongoose connection disconnected')
  })
}
