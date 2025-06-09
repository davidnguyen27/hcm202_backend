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
    origin: 'http://localhost:5173',
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
  app.listen(3000, () => {
    console.log('Server is running at with port', PORT)
  })
})
