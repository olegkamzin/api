import Order from '../models/order.js'
import Cart from '../models/cart.js'
import ApiError from '../service/error/ApiError.js'

class OrderController {
	async create(req, res, next) {
		try {
			const { user } = req.params
			const cart = await Cart.find({ user })
			if (cart.length === 0) return next(ApiError.badRequest('Товаров для заказа в корзине нет.'))
			const order = await Order.create({ user, products: cart })
			await Cart.deleteMany({ user })
			return res.json(order)
		} catch(e) {
			next(ApiError.badRequest(e.message))
		}
	}
	async get(req, res, next) {
		try {
			const { user } = req.params
			const order = await Order.find({ user: user })
			return res.json(order)
		} catch(e) {
			next(ApiError.badRequest(e.message))
		}
	}
	async getAll(req, res, next) {
		try {
			const order = await Order.find()
			return res.json(order)
		} catch(e) {
			next(ApiError.badRequest(e.message))
		}
	}
	async edit(req, res, next) {
		try {
			const { id } = req.params
			const { products, address, other } = req.body
			const order = await Order.findById(id, { products, address, other  })
			return res.json(order)
		} catch(e) {
			next(ApiError.badRequest(e.message))
		}
	}
	async delete(req, res, next) {
		try {
			const { id } = req.params
			const order = await Order.findByIdAndDelete(id)
			return res.json(order)
		} catch(e) {
			next(ApiError.badRequest(e.message))
		}
	}
}

export default new OrderController()