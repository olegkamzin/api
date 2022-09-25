import Router from 'express'
import VendorController from '../controllers/vendor.js'
const router = new Router()

router.get('/', VendorController.get)

export default router
