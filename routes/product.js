import Router from 'express'
import ProductController from '../controllers/product.js'
import role from '../middleware/role.js'
const router = new Router()

router.get('/', ProductController.get)
router.get('/:id', ProductController.getOne)
router.post('/', role('ADMIN'), ProductController.post)
router.put('/:id', role('ADMIN'), ProductController.put)
router.delete('/:id', role('ADMIN'), ProductController.delete)

export default router
