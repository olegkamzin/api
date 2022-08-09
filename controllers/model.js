import genSlug from 'slugify'
import Models from '../models/model.js'
import Brand from '../models/brand.js'
import ApiError from '../service/error/ApiError.js'

class ModelsController {
	async create(req, res, next) {
		try {
			const { name, brand, description, rating } = req.body
			let brandFind = await Brand.findOne({ name: brand })
			if (!brandFind) return res.status(400).json('Брэнд не найден')
			return Models.create({ name: name, brand: brandFind.id, description: description, rating: rating, slug: genSlug(name, { lower: true }) })
				.then(data => res.json(data))
				.catch(error => res.status(400).json(error.message))
		} catch (e) {
			next(ApiError.badRequest(e))
		}
	}
	async edit(req, res, next) {
		try {
			const { id } = req.params
			const { name, brand, description, rating } = req.body
			let brandFind = await Brand.findOne({ name: brand })
			if (!brandFind) return res.status(400).json('Брэнд не найден')
			return Models.findByIdAndUpdate(id, { name: name, description: description, rating: rating }, { new: true })
				.then(data => res.json(data))
				.catch(error => res.status(400).json(error.message))
		} catch (e) {
			next(ApiError.badRequest(e))
		}
	}
	async getAll(req, res, next) {
		try {
			return Models.find()
				.then((data) => res.json(data))
				.catch(error => res.status(400).json(error.message))
		} catch (e) {
			next(ApiError.badRequest(e))
		}
	}
	async delete(req, res, next) {
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