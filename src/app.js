const express = require('express')

// Importing Routes
const authRoutes = require('./routes/auth.routes')
const chatRoutes = require('./routes/chat.routes')
const cookieParser = require('cookie-parser')


const app = express()

// Middlewares
app.use(express.json())
app.use(cookieParser())

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/chat', chatRoutes)



module.exports = app