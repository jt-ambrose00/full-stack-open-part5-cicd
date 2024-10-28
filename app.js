const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
require('express-async-errors')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const mongoDbUri = process.env.NODE_ENV === 'test'
  ? process.env.TEST_MONGODB_URI
  : process.env.NODE_ENV === 'e2e'
  ? process.env.E2E_TEST_MONGODB_URI
  : process.env.MONGODB_URI
// logger.info('connecting to', mongoDbUri)

mongoose.connect(mongoDbUri)
    .then(() => {
        logger.info('connected to MongoDB')
    })
    .catch((error) => {
        logger.error('error connection to MongoDB:', error.message)
    })

app.use(cors())
app.use(express.static('dist'))
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.get('/version', (req, res) => {
    res.send('6') // change this string to ensure a new version deployed
})

app.get('/health', (req, res) => {
    res.send('ok')
})

if (process.env.NODE_ENV === 'test') {
    const testingRouter = require('./controllers/testing')
    app.use('/api/testing', testingRouter)
}

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
