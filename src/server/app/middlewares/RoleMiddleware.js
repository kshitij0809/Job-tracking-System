exports.allowedRoles = roles => (req, res, next) => {

  // const authHeader = req.headers.role
  // res.locals.role=authHeader
  console.log("res===>>",res.locals)
  if (!roles.includes(res.locals.role)) {
    res.status(403).json({ message: 'You are not authorized to view the requested resource.' })
    return
  }
  next()
}
