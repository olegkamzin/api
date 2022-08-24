import Cart from '../models/cart.js'
import Product from '../models/product.js'
import User from '../models/user.js'
import ApiError from '../service/error/ApiError.js'

class CartController {
	async post (req, res, next) {
		try {
			const { userId, productId, quantity } = req.query
			const user = await User.findById(userId)
			if (!user) return next(ApiError.badRequest('Пользователь указан не корректно.'))
			const product = await Product.findById(productId)
			if (!product) return next(ApiError.badRequest('Товар указан не корректно.'))
			if (!quantity) return next(ApiError.badRequest('Количество товара не указано.'))

			const result = await Cart.create({ user: userId, product: productId, quantity })
			return res.json(result)
		} catch (e) {
			next(ApiError.badRequest(e))
		}
	}

	async put (req, res, next) {
		try {
			const { id } = req.params
			const { userId, productId, quantity } = req.query
			const user = await User.findById(userId)
			if (!user) return next(ApiError.badRequest('Пользователь указан не корректно.'))
			const product = await Product.findById(productId)
			if (!product) return next(ApiError.badRequest('Товар указан не корректно.'))
			if (!quantity) return next(ApiError.badRequest('Количество товара не указано.'))

			const result = await Cart.findByIdAndUpdate(id, { user: userId, product: productId, quantity }, { new: true })
			return res.json(result)
		} catch (e) {
			next(ApiError.badRequest(e))
		}
	}

	async get (req, res, next) {
		try {
			const { user } = req.params
			const result = await Cart.find({ user })
			return res.json(result)
		} catch (e) {
			next(ApiError.badRequest(e))
		}
	}

	async delete (req, res, next) {
		try {
			const { id } = req.params
			const result = Cart.findByIdAndDelete(id)
			return res.json(result)
		} catch (e) {
			next(ApiError.badRequest(e))
		}
	}
}

export default new CartController()
