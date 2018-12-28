import moment from 'moment'
import models from '../models'
import RefreshTokenMiddleware from './RefreshTokenMiddleware'
import { generateToken } from '../helpers/TokenHelper'



exports.verify = (req, res, next) => {
  const authHeader = req.get('Authorization')
  if (authHeader !== undefined) {
    
    // Extract token from Authorization header
    const token = authHeader.substr(7)

    if (!token) {
      // if no token is supplied in Authorization header
      res.status(401).json({ message: 'Invalid token.' })
    } else {
      // Find token in db
      models.Token.findOne({
        where: { token },
        include: [{
          model: models.User,
          attributes: ['id', 'role', 'verified', 'name', 'type', 'email'],
        }],
      }).then((r) => {
        if (!r) {
          // if token doesnot exist in db
          res.status(403).json({ message: 'Invalid Token.' })
          return
        } else if (moment() > r.dataValues.expirationTime) {
          var UserId=r.User.dataValues.id
                   
           models.Token.update(
              { 
                token: generateToken(r.User.dataValues.id, r.User.dataValues.email),
                UserId: r.User.dataValues.id,
                expirationTime: moment().day(10), 
              },
              { where: { UserId } },
            ).then(() => {
                res.locals.User = r.User.dataValues
                res.locals.UserId = r.User.dataValues.id
                res.locals.role = r.User.dataValues.role
                next()
            })
          // RefreshTokenMiddleware.verify
       // next()
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
