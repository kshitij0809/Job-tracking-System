import moment from 'moment'
import models from '../models'
import { generateToken } from '../helpers/TokenHelper'

import { memberLog } from '../logs'

exports.verify = (req, res, next) => {
  memberLog(req.connection.remoteAddress, req.headers)
  const authHeader = req.get('Authorization')
  const userAgent = req.headers['user-agent']
  if (authHeader !== undefined) {
    const token = authHeader.substr(6)
    if (!token) {
      // if no token is supplied in Authorization header
      res.status(401).json({ message: 'Invalid token.' })
    } else {
      // Find token in db
      models.MemberToken.findOne({
        where: { token },
        include: [{
          model: models.Member,
          attributes: ['id', 'role'],
        }],
      }).then((r) => {
        if (!r) {
          // if token doesnot exist in db
          res.status(403).json({ message: 'Invalid Token.' })
        } else if (moment() > r.dataValues.expirationTime) {
          // If token expired
           var MemberId=r.Member.dataValues.id
                   
           models.Token.update(
              { 
                token: generateToken(r.Member.dataValues.id, r.Member.dataValues.email),
                MemberId: r.Member.dataValues.id,
                expirationTime: moment().day(10), 
              },
              { where: { MemberId } },
            ).then(() => {
                res.locals.User = r.Member.dataValues
                res.locals.MemberId = r.Member.dataValues.id
                res.locals.role = r.Member.dataValues.role
                next()
            })
        } else if (r.dataValues.userAgent !== userAgent) {
          // If user agent is different then reject request
          res.status(403).json({ message: 'We have detected a browser change. Please login again.' })
        } else {
          res.locals.MemberId = r.Member.dataValues.id
          res.locals.role = r.Member.dataValues.role
          next()
        }
      })
    }
  } else {
    res.status(401).json({ message: 'Please Provide Token.' })
  }
}
