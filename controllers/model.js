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
			return Models.create({ name, brand: brandFind.id, description, rating, slug: genSlug(name, { lower: true }) })
				.then(data => res.json(data))
				.catch(error => res.status(400).json(error.message))
		} catch (e) {
			next(ApiError.badRequest(e))
		}
	}

	async put (req, res, next) {
		try {
			const { id } = req.params
			const { brand } = req.body
			const brandFind = await Brand.findOne({ name: brand })
			if (!brandFind) return res.status(400).json('Брэнд не найден')
			await Models.findByIdAndUpdate(id, { $set: req.body }, { new: true })
				.then(data => res.json(data))
				.catch(error => res.status(400).json(error.message))
		} catch (e) {
			next(ApiError.badRequest(e))
		}
	}

	async get (req, res, next) {
		try {
			return Models.find()
				.then((data) => res.json(data))
				.catch(error => res.status(400).json(error.message))
		} catch (e) {
			next(ApiError.badRequest(e))
		}
	}

	async delete (req, res, next) {
		try {
			const { id } = req.params
			return Models.findByIdAndDelete(id)
				.then((data) => res.json(data))
				.catch(error => res.status(400).json(error.message))
		} catch (e) {
			next(ApiError.badRequest(e))
		}
	}
}

export default new ModelsController()
