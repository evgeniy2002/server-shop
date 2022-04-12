const Router = require('express')
const router = new Router()
const deviceRouter = require('./deviceRouter')
const typeRouter = require('./typeRouter')
const searchRouter = require('./searchRouter')
const brandRouter = require('./brandRouter')
const authRouter = require('./authRouter')
const infoRouter = require('./infoRouter')

router.use('/type', typeRouter)
router.use('/device', deviceRouter)
router.use('/search', searchRouter)
router.use('/brand', brandRouter)
router.use('/admin_panel', authRouter)
router.use('/info', infoRouter)

module.exports = router