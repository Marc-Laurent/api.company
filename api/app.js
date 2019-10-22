import express from 'express'
import morgan from 'morgan'
import { json, urlencoded, text } from 'body-parser'
import helmet from 'helmet'
import config from './config/config'

let app = express()
let env = process.argv[2] || 'local'
let port = config[env] ? config[env]['port'] : 3001

app.use(morgan('combined'))

/**
 * CONFIGURATION bodyParser
*/
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(text())
app.use(json({ type: 'application/json' }))

/**
 * CONFIGURATION header
*/
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Credentials', true)
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET')
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')

    next()
})

/**
 * Header X-Powered-By disable
*/
app.disable('x-powered-by')

/**
 * Protection
 */
app.use(helmet())

app.listen(port)
console.log('port ... ' + port)

module.exports = app