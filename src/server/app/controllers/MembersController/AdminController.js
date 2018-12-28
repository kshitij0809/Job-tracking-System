import models from '../../models'

// import {
//   hashPassword,
//   verifyPassword,
//   verifyEmail,
//   // breakCogniId,
// } from '../../helpers/UsersHelper'

exports.profile = (req, res) => {
  
  res.status(200).json({ message: 'Success.' })
}


exports.createMember = (req, res) => {
  // Predefined user roles
  const roles = ['admin']
  if (!verifyPassword(req.body.password)) {
    res.status(412).json({ message: 'Password too short.' })
    return
  }

  if (!verifyEmail(req.body.email)) {
    res.status(412).json({ message: 'Invalid Email.' })
    return
  }

  if (!roles.includes(req.params.role)) {
    res.status(400).json({ message: 'Invalid Role.' })
    return
  }

  models.Member.create({
    email: req.body.email,
    password: hashPassword(req.body.password),
    role: req.params.role,
  }).then(() => {
    res.status(201).json({ message: 'User Registered Successfully.' })
  }).catch((err) => {
    res.status(500).json({ message: 'Something Went Wrong.', err: err.code })
  })
}


exports.members = (req, res) => {
  models.Member.findAll({
    attributes: ['email', 'id', 'role'],
  }).then((members) => {
    res.status(200).json({ members })
  })
}

exports.updateMembersPassword = (req, res) => {
  const { email } = req.body
  const { password1 } = req.body
  const { password2 } = req.body

  models.Member.findOne({
    where: { email },
  }).then((member) => {
    if (member === null) {
      res.status(404).json({ message: 'Not found.' })
      return
    }
    if (password2 === '' || password1 === '' || password2 === null || password1 === null) {
      res.status(400).json({ message: 'Please Enter Passwords.' })
      return
    }
    if (!verifyPassword(password1)) {
      res.status(400).json({ message: 'Password too short.' })
      return
    }
    if (password1 !== password2) {
      res.status(400).json({ message: 'Passwords Didn\'t Match.' })
      return
    }

    models.Member.update(
      { password: hashPassword(password1) },
      { where: { email } },
    ).then(() => {
      res.status(200).json({ message: 'Updated Successfully.' })
    })
  })
}

exports.blockUsers = (req, res) => {
  const { users } = req.body

  if (!users.length) {
    res.status(400).json({ message: 'No ids supplied.' })
    return
  }

  const userIds = []

  users.forEach((user) => {
    const id = breakCogniId(user)

    if (!id) {
      res.status(400).json({ message: 'Invalid Cogni id.' })
      return
    }

    userIds.push(id)
  })

  userIds.forEach((id) => {
    models.User.update(
      { blocked: true },
      { where: { id } },
    )
  })

  res.status(200).json({ message: 'Users Blocked.' })
}
