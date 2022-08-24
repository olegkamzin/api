import genSlug from 'slugify'
import Brand from '../models/brand.js'
import ApiError from '../service/error/ApiError.js'

class BrandController {
	async post (req, res, next) {
		try {
			const { name, description } = req.body
			const result = await Brand.create({ name, description, slug: genSlug(name, { lower: true }) })
			return res.json(result)
		} catch (e) {
			next(ApiError.badRequest(e))
		}
	}

	async put (req, res, next) {
		try {
			const { id } = req.params
			const { name, description } = req.body
			const result = await Brand.findByIdAndUpdate(id, { name, description }, { new: true })
			return res.json(result)
		} catch (e) {
			next(ApiError.badRequest(e))
		}
	}

	async get (req, res, next) {
		try {
			const result = await Brand.find()
			return res.json(result)
		} catch (e) {
			next(ApiError.badRequest(e))
		}
	}

	async delete (req, res, next) {
		try {
			const { id } = req.params
			const result = await Brand.findByIdAndDelete(id)
			return res.json(result)
		} catch (e) {
			next(ApiError.badRequest(e))
		}
	}
}

export default new BrandController()
