import Router from 'express'
import BrandController from '../controllers/brand.js'
import role from '../middleware/role.js'
const router = new Router()

router.get('/', BrandController.get)
router.post('/', role('ADMIN'), BrandController.post)
router.put('/:id', role('ADMIN'), BrandController.put)
router.delete('/:id', role('ADMIN'), BrandController.delete)

export default router
