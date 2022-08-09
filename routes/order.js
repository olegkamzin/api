import Router from 'express'
import OrderController from '../controllers/order.js'
import auth from '../middleware/auth.js'
import role from '../middleware/role.js'
const router = new Router()

router.post('/:user', auth, OrderController.create)
router.get('/:user', auth, OrderController.get)
router.get('/', role('ADMIN'), OrderController.getAll)
router.put('/:id', role('ADMIN'), OrderController.edit)
router.delete('/:id', role('ADMIN'), OrderController.delete)

export default router