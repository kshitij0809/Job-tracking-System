exports.verifyEmail = (req, res, next) => {
  if (!res.locals.User.verified) {
    // If email not verified
    res.status(412).json({ message: 'Please verify your email.' })
    return
  }
  next()
}
