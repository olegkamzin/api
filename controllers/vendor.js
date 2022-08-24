import Vendor from '../models/vendor.js'
import ApiError from '../service/error/ApiError.js'

class VendorController {
	async get (req, res, next) {
		try {
			let { page, limit } = req.query
			page = page || 1
			limit = limit || 20
			const result = await Vendor.find()
				.populate({ path: 'product', model: 'Product' })
				.limit(limit)
				.skip(page * limit - limit)
			return res.json(result)
		} catch (e) {
			next(ApiError.badRequest(e.message))
		}
	}

	async getOne (req, res, next) {
		try {
			const { product } = req.params
			const result = await Vendor.findOne({ product })
				.populate({ path: 'product', model: 'Product' })
			return res.json(result)
		} catch (e) {
			next(ApiError.badRequest(e.message))
		}
	}
}

export default new VendorController()
