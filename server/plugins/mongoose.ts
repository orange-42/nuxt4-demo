import mongoose from 'mongoose'

export default defineNitroPlugin(async (nitroApp) => {
  const config = useRuntimeConfig()
  
  try {
    await mongoose.connect(config.mongodbUri)
    console.log('Connected to MongoDB')
  } catch (e) {
    console.error('Error connecting to MongoDB:', e)
  }
})
