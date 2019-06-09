const validateData = (req, res, next) => {
  const { email } = req.body
  const regex = /\S+@\S+\.\S+/
  if (!regex.test(email)) {
    return res.status(400).send({ errors: {
      email: 'the email must be like "john.doe@mail.com"'
    } })
  }

  next()
}

module.exports = {
  validateData
}
