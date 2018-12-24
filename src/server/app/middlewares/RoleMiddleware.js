exports.allowedRoles = roles => (req, res, next) => {
  if (!roles.includes(res.locals.role)) {
    res.status(403).json({ message: 'You are not authorized to view the requested resource.' })
    return
  }
  next()
}
