import genSlug from 'slugify'
import Models from '../models/model.js'
import Brand from '../models/brand.js'
import ApiError from '../service/error/ApiError.js'

class ModelsController {
	async post (req, res, next) {
		try {
			const { name, brand, description, rating } = req.body
			const brandFind = await Brand.findOne({ name: brand })
			if (!brandFind) return res.status(400).json('Брэнд не найден')
			const result = await Models.create({ name, brand: brandFind.id, description, rating, slug: genSlug(name, { lower: true }) })
			return res.json(result)
		} catch (e) {
			next(ApiError.badRequest(e))
		}
	}

	async put (req, res, next) {
		try {
			const { id } = req.params
			let { brand, name, slug } = req.body
			if (brand) {
				const brandFind = await Brand.findOne({ name: brand })
				if (!brandFind) return res.status(400).json('Брэнд не найден')
			}
			if (name) slug = genSlug(name, { lower: true })
			const result = await Models.findByIdAndUpdate(id, { $set: { ...req.body, slug } }, { new: true })
			return res.json(result)
		} catch (e) {
			next(ApiError.badRequest(e))
		}
	}

	async get (req, res, next) {
		try {
			const result = await Models.find()
			return res.json(result)
		} catch (e) {
			next(ApiError.badRequest(e))
		}
	}

	async delete (req, res, next) {
		try {
			const { id } = req.params
			const result = await Models.findByIdAndDelete(id)
			return res.json(result)
		} catch (e) {
			next(ApiError.badRequest(e))
		}
	}
}

export default new ModelsController()
