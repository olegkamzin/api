import Router from 'express'
import ProductController from '../controllers/product.js'
import role from '../middleware/role.js'
const router = new Router()

router.get('/:category/', ProductController.get)
router.post('/', role('ADMIN'), ProductController.post)
router.get('/single/:id/', ProductController.getOne)
router.put('/single/:id/', role('ADMIN'), ProductController.put)
router.delete('/single/:id/', role('ADMIN'), ProductController.delete)

export default router
