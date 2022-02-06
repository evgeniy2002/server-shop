const Router = require('express')
const router = new Router()
const typeController = require('../controllers/typeController') 

router.post('/', typeController.create)
router.get('/', typeController.getAll)
router.put('/', typeController.updateCountEye)
router.delete('/', typeController.deleteType)

module.exports = router