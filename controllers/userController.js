const { save } = require('../models/userModel')

const saveUser = (req, res) => {
  const { name, email } = req.body

  save({ name, email })
  res.status(201).send({})
}

module.exports = {
  saveUser
}
