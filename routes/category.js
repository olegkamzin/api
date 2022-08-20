import Router from 'express'
import CategoryController from '../controllers/category.js'
import role from '../middleware/role.js'
const router = new Router()

router.get('/', CategoryController.get)
router.get('/:id', CategoryController.getOne)
router.post('/', role('ADMIN'), CategoryController.post)
router.put('/:id', role('ADMIN'), CategoryController.put)
router.delete('/:id', role('ADMIN'), CategoryController.delete)

export default router
