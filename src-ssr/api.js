const express = require('express')
const router = express.Router()
const { genUUID, wrapAsync } = require('./common')
// const _ = require('lodash')

router.post(
  '/login',
  wrapAsync(async () => genUUID()),
)

module.exports = router
