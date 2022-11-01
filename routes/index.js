import Router from 'express'
import product from './product.js'
import category from './category.js'
import brand from './brand.js'
import model from './model.js'
import search from './search.js'
import user from './user.js'
import cart from './cart.js'
import order from './order.js'
import filter from './filter.js'
import image from './image.js'
import vendor from './vendor.js'

const router = new Router()

router.use('/product', product)
router.use('/category', category)
router.use('/brand', brand)
router.use('/model', model)
// router.use('/search', search)
router.use('/user', user)
router.use('/cart', cart)
router.use('/order', order)
router.use('/filter', filter)
router.use('/image', image)
router.use('/vendor', vendor)

export default router
