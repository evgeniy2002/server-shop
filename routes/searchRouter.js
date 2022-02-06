const Router = require('express')
const router = new Router()
const searchController = require('../controllers/searchController')

router.get('/', searchController.getSearchDevice)

module.exports = router
