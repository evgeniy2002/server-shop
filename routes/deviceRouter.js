const Router = require('express')
const router = new Router()
const deviceController = require('../controllers/deviceController')

router.post('/', deviceController.create)
router.get('/', deviceController.getAll)
router.get('/:id', deviceController.getOne)
router.put('/', deviceController.updateCountEye)
router.delete('/', deviceController.deleteDevice)
// router.post('/price', deviceController.handlePrice)

module.exports = router