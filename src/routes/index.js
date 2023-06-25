const express = require('express')
const router = express.Router()
const { Pagination } = require('../middleware/pagination')
const controller = require('../controller/index')

router.use(Pagination)

router.get('/user', controller.getUser)

module.exports = router  