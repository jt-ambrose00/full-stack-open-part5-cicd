const app = require('./app')
const config = require('./utils/config')
const logger = require('./utils/logger')

app.get('/version', (req, res) => {
    res.send('1') // change this string to ensure a new version deployed
})

app.listen(config.PORT, () => {
    logger.info(`Server running on port ${config.PORT}`)
})
