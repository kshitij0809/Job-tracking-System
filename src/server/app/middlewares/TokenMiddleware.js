import moment from 'moment'
import models from '../models'

exports.verify = (req, res, next) => {
  const authHeader = req.get('Authorization')
  if (authHeader !== undefined) {
    // Extract token from Authorization header
    const token = authHeader.substr(6)

    if (!token) {
      // if no token is supplied in Authorization header
      res.status(401).json({ message: 'Invalid token.' })
    } else {
      // Find token in db
      models.Token.findOne({
        where: { token },
        include: [{
          model: models.User,
          attributes: ['id', 'role', 'verified', 'isCompleted', 'name', 'imageUrl', 'type', 'email', 'mobile', 'registrationReferalCodeStatus', 'paymentReferalCodeStatus', 'workshopPaymentStatus', 'centralPaymentStatus'],
        }],
      }).then((r) => {
        if (!r) {
          // if token doesnot exist in db
          res.status(403).json({ message: 'Invalid Token.' })
          return
        } else if (moment() > r.dataValues.expirationTime) {
          // If token expired
          res.status(403).json({ message: 'Token Expired.' })
          return
        } else if (r.User.dataValues.deleted) {
          // If user has been deleted
          res.status(404).json({ message: 'User not found.' })
          return
        }

        res.locals.User = r.User.dataValues
        res.locals.UserId = r.User.dataValues.id
        res.locals.role = r.User.dataValues.role
        next()
      })
    }
  } else {
    res.status(401).json({ message: 'Please Provide Token.' })
  }
}
