/*
 * Admin Routes (/api/admin)
 */

import express from 'express'

import RoleMiddleware from '../../app/middlewares/RoleMiddleware'

import {
  SUPER_ADMIN_ROUTE,
 
} from '../namespace'

import {
  ADMIN_ROLE,
  
} from '../roles'

const router = express.Router()

// Route Groups with middlewares
router.use(
  SUPER_ADMIN_ROUTE,
  RoleMiddleware.allowedRoles([ADMIN_ROLE]),
)


router.use(SUPER_ADMIN_ROUTE, require('./super'))

module.exports = router
