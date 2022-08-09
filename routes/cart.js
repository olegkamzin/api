import Router from 'express'
import CartController from '../controllers/cart.js'
import auth from '../middleware/auth.js'
const router = new Router()

router.get('/:user', auth, CartController.get)
router.post('/', auth, CartController.create)
router.put('/:id', auth, CartController.edit)
router.delete('/:id', auth, CartController.delete)

export default router