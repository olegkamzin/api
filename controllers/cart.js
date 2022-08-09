import Cart from "../models/cart.js"
import Product from "../models/product.js"
import User from "../models/user.js"
import ApiError from "../service/error/ApiError.js"

class CartController {
	async create(req, res, next) {
		try {
			const { userId, productId, quantity } = req.query
			const user = await User.findById(userId)
			if (!user) return next(ApiError.badRequest('Пользователь указан не коректно.'))
			const product = await Product.findById(productId)
			if (!product) return next(ApiError.badRequest('Товар указан не коректно.'))
			if (!quantity) return next(ApiError.badRequest('Количесвто товара не указано.'))

			const cart = await Cart.create({ user: userId, product: productId, quantity })
			return res.json(cart)
		} catch(e) {
			next(ApiError.badRequest(e))
		}
	}
	async edit(req, res, next) {
		try {
			const { id } = req.params
			const { userId, productId, quantity } = req.query
			const user = await User.findById(userId)
			if (!user) return next(ApiError.badRequest('Пользователь указан не коректно.'))
			const product = await Product.findById(productId)
			if (!product) return next(ApiError.badRequest('Товар указан не коректно.'))
			if (!quantity) return next(ApiError.badRequest('Количесвто товара не указано.'))

			const cart = await Cart.findByIdAndUpdate(id, { user: userId, product: productId, quantity }, {new: true})
			return res.json(cart)
		} catch(e) {
			next(ApiError.badRequest(e))
		}
	}
	async delete(req, res, next) {
		try {
			const { id } = req.params
			const cart = Cart.findByIdAndDelete(id)
			return res.json(cart)
		} catch(e) {
			next(ApiError.badRequest(e))
		}
	}
	async get(req, res, next) {
		try {
			const { user } = req.params
			const cart = await Cart.find({ user })
			return res.json(cart)
		} catch(e) {
			next(ApiError.badRequest(e))
		}
	}
}

export default new CartController()