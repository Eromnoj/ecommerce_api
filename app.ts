require('express-async-errors')
import express from 'express'
const app = express()

import dotenv from 'dotenv'
dotenv.config()

// Security import
import cors from 'cors'
import helmet from 'helmet'
import xss from 'xss-clean'
import rateLimiter from 'express-rate-limit'
import cookieParser from 'cookie-parser'
// Routes
import authRoute from './routes/authenticationRoute'
import productRoute from './routes/productsRoute'
// Middleware
import notFound from './middlewares/notFound'
import errorHandler from './middlewares/ErrorHandler'

// extra package Rate limiter
app.set('trust proxy', 1)
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, //15 minutes (milliseconds)
    max: 200
  })
)

app.use(express.json());

//extra security packages
app.use(helmet())
app.use(cors())
app.use(xss())
app.use(cookieParser(process.env.JWT_SECRET))

app.use('/api/auth', authRoute)
app.use('/api/product', productRoute)

app.use(notFound)
app.use(errorHandler)
const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(`Server started on port ${port}`)
})
