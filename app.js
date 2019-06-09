const express = require('express')
const bodyParser = require('body-parser')
const userRoutes = require('./routers/userRoutes')

const app = express()
const version = '/v1'

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(version, userRoutes)

module.exports = app
