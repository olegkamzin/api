import Router from 'express'
import ImagesController from '../controllers/image.js'
import role from '../middleware/role.js'
const router = new Router()

router.post('/', role('ADMIN'), ImagesController.upload)
router.delete('/', role('ADMIN'), ImagesController.delete)

export default router