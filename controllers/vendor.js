import genSlug from 'slugify'
import Vendor from '../models/vendor.js'
import ApiError from '../service/error/ApiError.js'

class VendorController {
	async get (req, res, next) {
		try {
			const { id } = req.query
			const result = await Vendor.findOne({ product: id })
				.populate({ path: 'product', model: 'Product' })
			return res.json(result)
		} catch (e) {
			next(ApiError.badRequest(e))
		}
	}
}

export default new VendorController()
