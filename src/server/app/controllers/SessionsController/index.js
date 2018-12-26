import moment from 'moment'
import models from '../../models'

import {
  hashPassword,
  comparePassword,
  confirmationCode,
  verifyPassword,
  verifyEmail,
} from '../../helpers/UsersHelper'
import { generateToken } from '../../helpers/TokenHelper'
// import { generateReferalCode } from '../../helpers/SppHelper'

// import { verificationMail } from '../../mailers'

require('dotenv').config()

// handle user login
exports.usersLogin = (req, res) => {
  models.User.findOne({
    where: { email: req.body.email },
    attributes: ['id', 'password', 'email', 'name', 'role', 'verified', 'type'],
  }).then((user) => {
    if (user === null) {
      res.status(404).json({ message: 'No User Found.' })
      return
    }

    if (user.blocked) {
      res.status(404).json({ message: 'You have been blocked by admin.' })
      return
    }

    if (!user.dataValues.verified) {
      res.status(412).json({ message: 'Please Verify your email.' })
      return
    }

    if ((user.dataValues.type === 'remote' || user.dataValues.type === null) && comparePassword(req.body.password, user.dataValues.password)) {
      models.Token.destroy({
        where: {
          UserId: user.dataValues.id,
        },
      }).then(() => {
        models.Token.create({
          token: generateToken(user.dataValues.id, user.dataValues.email),
          UserId: user.dataValues.id,
          expirationTime: moment().day(30),
        }).then((r) => {
          res.status(200).json({
            message: 'Sucessfully Logged In.',
            token: r.dataValues.token,
            name: user.dataValues.name,
            email: user.dataValues.email,
            role: user.dataValues.role,
          })
        })
      }).catch((err) => {
        res.status(500).json({ message: 'Something Went Wrong.', err: err.code })
      })
    } else if (user.dataValues.type !== 'remote' && user.dataValues.type !== null) {
      res.status(400).json({
        message: `Please login using ${user.dataValues.type}.`,
      })
    } else {
      res.status(400).json({ message: 'Please enter correct credentials.' })
    }
  })
}

// handle member login
exports.membersLogin = (req, res) => {
  models.Member.findOne({
    where: { email: req.body.email },
    attributes: ['id', 'password', 'email', 'role'],
  }).then((member) => {
    if (member == null) {
      res.status(404).json({ message: 'No User Found.' })
    } else if (comparePassword(req.body.password, member.dataValues.password)) {
      models.MemberToken.create({
        token: generateToken(member.dataValues.id, member.dataValues.email),
        MemberId: member.dataValues.id,
        expirationTime: moment().day(7),
        userAgent: req.headers['user-agent'],
        ip: req.connection.remoteAddress,
      }).then((r) => {
        res.status(200).json({
          message: 'Successfully Loggen In.',
          token: r.dataValues.token,
          email: member.dataValues.email,
          role: member.dataValues.role,
        })
      }).catch((err) => {
        res.status(500).json({ message: 'Something Went Wrong.', err: err.code })
      })
    } else {
      res.status(401).json({ message: 'Please enter correct credentials!' })
    }
  })
}

// handle user logout
exports.usersLogout = (req, res) => {
  const authHeader = req.get('Authorization')
  if (authHeader === undefined) {
    res.status(400).json({ message: 'Bad Token.' })
    return
  }

  const token = authHeader.substr(7)
  models.Token.destroy({
    where: {
      token,
    },
  }).then(() => {
    res.status(200).json({
      message: 'Successfully Logged Out.',
    })
  })
}

// handle member logout
exports.membersLogout = (req, res) => {
  const authHeader = req.get('Authorization')
  if (authHeader === undefined) {
    res.status(400).json({ message: 'Bad Token.' })
    return
  }

  const token = authHeader.substr(7)
  models.MemberToken.destroy({
    where: {
      token,
    },
  }).then(() => {
    res.status(200).json({ message: 'Successfully Logged Out.' })
  })
}

/**
 * Token generation util
 * @param  {[string]} email [user email]
 * @param  {[Object]} res   [response object]
 * @return
 */
const tokenGenerate = (email, res) => {
  models.User.findOne({
    where: {
      email,
    },
    attributes: ['id', 'password', 'email', 'role'],
  }).then((user) => {
    models.Token.destroy({
      where: { UserId: user.dataValues.id },
    }).then(() => {
      models.Token.create({
        token: generateToken(user.dataValues.id, user.dataValues.email),
        UserId: user.dataValues.id,
        expirationTime: moment().day(30),
      }).then((r) => {
        res.status(200).json({
          message: 'Sucessfully Logged In.',
          token: r.dataValues.token,
          name: user.dataValues.name,
          email: user.dataValues.email,
          role: user.dataValues.role,
        })
      })
    }).catch(() => {
      res.status(500).json({ message: 'Something Went Wrong.' })
    })
  })
}

// handle signup
exports.signup = (req, res) => {
  // Predefined user roles
  const roles = [process.env.END_USER]
  if (!roles.includes(req.params.role)) {
    res.status(400).json({ message: 'Invalid Role.' })
    return
  }

 // console.log("hello reeeeeeee")
  if (req.params.role === process.env.END_USER &&
   !JSON.parse(process.env.END_USER_REGISTRATIONS)) {
    res.status(400).json({ message: 'End User Registations has not yet started.' })
    return
  }

  if (req.body.type === 'remote' && !verifyPassword(req.body.password)) {
    res.status(412).json({ message: 'Password too short.' })
    return
  }

  if (!verifyEmail(req.body.email)) {
    res.status(412).json({ message: 'Invalid Email.' })
    return
  }

  let enduserRegistration = false
  if (req.params.role === process.env.END_USER) {
    enduserRegistration = true
  }

  models.User.findOne({
    where: {
      email: req.body.email,
    },
    attributes: ['id', 'password', 'email', 'role', 'type'],
  }).then((user) => {
    if (user !== null && req.body.type === 'remote') {
      // if the email is already registered with password
      res.status(400).json({
        message: 'Email already registered.',
      })
    } else if (req.body.type !== 'remote' && user === null
    && (req.body.type === 'facebook' || req.body.type === 'google')) {
      // if the login with oauth for first time
      models.User.create({
        verified: true,
        email: req.body.email,
        name: req.body.name,
        password: null,
        role: req.body.role,
        type: req.body.type,
        accessToken: req.body.accessToken,
        expiresIn: req.body.expiresIn,
        oauthId: req.body.id,
        imageUrl: req.body.imageUrl,
      }).then((result) => {
        // Generate referalCode for spp
        if (req.params.role === process.env.SPP) {
          models.ReferalCodes.create({
            Code: generateReferalCode(result.dataValues.id),
            SppId: result.dataValues.id,
          })
        }
        tokenGenerate(req.body.email, res)
      }).catch(() => {
        res.status(500).json({
          message: 'Something Went Wrong.',
        })
      })
    } else if (req.body.type !== 'remote'
    && user !== null && req.body.accessToken
    && user.dataValues.type !== 'remote'
    && (req.body.type === 'facebook' || req.body.type === 'google')) {
      // if already has signup with the password but this time trying with oauth
      // second case when logging in again using oauth
      models.User.update({
        type: req.body.type,
        verified: true,
        accessToken: req.body.accessToken,
        expiresIn: req.body.expiresIn,
        oauthId: req.body.id,
      }, {
        where: { email: req.body.email },
      }).then(() => {
        tokenGenerate(req.body.email, res)
      })
    } else if (user === null && req.body.type === 'remote') {
      // If user doesnot exist and signup with password for the first time
      const code = confirmationCode(req.body.email, req.params.role)
      models.User.create({
        email: req.body.email,
        password: hashPassword(req.body.password),
        name: req.body.name,
        type: req.body.type,
        role: req.params.role,
        confirmationCode: code,
        mobile: req.body.mobile,
        enduserRegistration,
        // imageUrl: process.env.DEFAULT_IMAGE,
        // expanseRegistration: false,
        verificationTokenExpirationTime: moment().add(2, 'days'),
      }).then((result) => {
        // Timeout to prevent password algorithm guessing attack
        setTimeout(() => {
          // Verfication Mail
          // verificationMail(req.body.email, code)
          models.Token.create({
            token: generateToken(result.dataValues.id, result.dataValues.email),
            UserId: result.dataValues.id,
            expirationTime: moment().day(30),
          }).then((r) => {
              res.status(201).json({
                token: r.dataValues.token,
                message: 'User Registered Successfully.',
              })
              return
            
           
          })
        }, 1000)
      }).catch(() => {
        res.status(500).json({
          message: 'Something Went Wrong.',
        })
      })
    } else {
      // if none of the above case is matched!!
      res.status(400).json({
        message: 'Please Send Relevant Details.',
      })
    }
  })
}




