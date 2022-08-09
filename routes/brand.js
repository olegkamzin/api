import Router from 'express'
import BrandController from '../controllers/brand.js'
import role from '../middleware/role.js'
const router = new Router()

router.get('/', BrandController.getAll)
router.post('/', role('ADMIN'), BrandController.create)
router.put('/:id', role('ADMIN'), BrandController.edit)
router.delete('/:id', role('ADMIN'), BrandController.delete)

export default router