/*
 * Super Admin Routes (/api/admin/super)
 */

import express from 'express'

// Controllers
import AdminController from '../../app/controllers/MembersController/AdminController'

const router = express.Router()

router.get(
  '/',
  AdminController.profile,
)

router.post(
  '/create_member/:role',
  AdminController.createMember,
)

router.get(
  '/members',
  AdminController.members,
)

router.post(
  '/update/members/password',
  AdminController.updateMembersPassword,
)

router.post(
  '/block',
  AdminController.blockUsers,
)


module.exports = router
