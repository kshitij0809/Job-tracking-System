/*
 * Session Routes (/api/session)
 */

import express from 'express'

const router = express.Router()

router.use('/users', require('./users'))
router.use('/members', require('./members'))

module.exports = router
