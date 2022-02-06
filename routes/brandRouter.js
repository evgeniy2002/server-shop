const Router = require('express')
const router = new Router()
const brandController = require('../controllers/brandController')

router.get('/', brandController.getAllBrand)
router.post('/', brandController.createBrand)
router.delete('/', brandController.deleteBrand)
router.put('/', brandController.updateInfo)

module.exports = router