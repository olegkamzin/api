import Router from 'express'
import ProductController from '../controllers/product.js'
import role from '../middleware/role.js'
const router = new Router()

router.get('/', ProductController.getAll)
router.get('/:category/', ProductController.getByCategory)
router.get('/single/:id/', ProductController.getOne)
router.post('/', role('ADMIN'), ProductController.create)
router.put('/single/:id/', role('ADMIN'), ProductController.edit)
router.delete('/single/:id/', role('ADMIN'), ProductController.delete)

export default router