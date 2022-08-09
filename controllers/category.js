import genSlug from 'slugify'
import ApiError from '../service/error/ApiError.js'
import Category from '../models/category.js'

class CategoryController {
	async create(req, res, next) {
		try {
			const { name, params } = req.body
			let { slug } = req.body
			if (slug && /[^-a-z]/g.test(slug)) return next(ApiError.badRequest('Ссылка должна быть на английском языке.'))
			if (!slug) slug = genSlug(name, { lower: true })
			if (params !== 0) {
				params.forEach(el => {
					if (/[^_a-z]/g.test(el.property)) return next(ApiError.badRequest('Ключ должен быть на английском языке.'))
					if (typeof el.required !== 'boolean') return next(ApiError.badRequest('Required должен иметь только "true/false" значение.'))
					if (el.type === 'variants' && !Array.isArray(el.variants)) return next(ApiError.badRequest('Варианты должны быть массивом.'))
					if (el.type === 'variants' && el.variants.length === 0) return next(ApiError.badRequest('Варианты не указаны.'))
				})
			}
			console.log(req.body)
			const category = await Category.create(req.body)
			res.json(category)
		} catch(e) {
			next(ApiError.badRequest(e.message))
		}
	}
	async edit(req, res, next) {
		try {
			const { id } = req.params
			const { name, description, params } = req.body
			let { slug } = req.body
			if (!slug) slug = genSlug(name, { lower: true })
			return Category.findByIdAndUpdate(id, { name, description, slug, params }, { new: true })
				.then(data => res.json(data))
				.catch(error => res.status(400).json(error.message))
		} catch(e) {
			next(ApiError.badRequest(e))
		}
	}
	async getAll(req, res, next) {
		try {
			return Category.find()
				.then((data) => res.json(data))
				.catch(error => res.status(400).json(error.message))
		} catch(e) {
			next(ApiError.badRequest(e))
		}
	}
	async getOne(req, res, next) {
		try {
			const { id } = req.params
			return Category.findById(id)
				.then((data) => res.json(data))
				.catch(error => res.status(400).json(error.message))
		} catch(e) {
			next(ApiError.badRequest(e))
		}
	}
	async delete(req, res, next) {
		try {
			const { id } = req.params
			return Category.findByIdAndDelete(id)
				.then((data) => res.json(data))
				.catch(error => res.status(400).json(error.message))
		} catch(e) {
			next(ApiError.badRequest(e))
		}
	}
}

export default new CategoryController()