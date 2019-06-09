const express = require('express')
const { validateData } = require('../middlewares/userMiddleware')
const { saveUser } = require('../controllers/userController')

const api = express.Router()

api.post('/users', validateData, saveUser)

module.exports = api
