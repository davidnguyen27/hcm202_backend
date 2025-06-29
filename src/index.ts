import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { connectDB } from '~/utils/Database'
import apiRoute from '~/routes/index'
import { errorMiddleware } from '~/middlewares/errorHandler'

dotenv.config()
const app = express()
app.use(express.json())

app.use(
  cors({
    origin: 'https://hcm202-product.vercel.app',
    credentials: true
  })
)

// Routes
app.use('/api', apiRoute)

// Middleware error
app.use(errorMiddleware)

// DB + Server
const PORT = process.env.PORT || 3000
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log('Server is running at with port', PORT)
  })
})
