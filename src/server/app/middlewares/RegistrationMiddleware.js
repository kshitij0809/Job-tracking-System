require('dotenv').config()

exports.enduser = (req, res, next) => {
  if (!JSON.parse(process.env.END_USER_REGISTRATIONS)) {
    res.status(400).json({ message: 'Spp Registration not yet started.' })
    return
  }
  next()
}
