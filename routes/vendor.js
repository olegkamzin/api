import Router from 'express'
import VendorController from '../controllers/vendor.js'
const router = new Router()

router.get('/', VendorController.get)
router.get('/:product', VendorController.getOne)

export default router
