import genSlug from 'slugify'
import ApiError from '../service/error/ApiError.js'
import Category from '../models/category.js'

class CategoryController {
	async post (req, res, next) {
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
			const result = await Category.create(req.body)
			return res.json(result)
		} catch (e) {
			next(ApiError.badRequest(e.message))
		}
	}

	async put (req, res, next) {
		try {
			const { id } = req.params
			const { name, description, params } = req.body
			let { slug } = req.body
			if (!slug) slug = genSlug(name, { lower: true })
			const result = await Category.findByIdAndUpdate(id, { name, description, slug, params }, { new: true })
			return res.json(result)
		} catch (e) {
			next(ApiError.badRequest(e))
		}
	}

	async get (req, res, next) {
		try {
			const result = await Category.find()
			return res.json(result)
		} catch (e) {
			next(ApiError.badRequest(e))
		}
	}

	async getOne (req, res, next) {
		try {
			const { id } = req.params
			const result = await Category.findById(id)
			return res.json(result)
		} catch (e) {
			next(ApiError.badRequest(e))
		}
	}

	async delete (req, res, next) {
		try {
			const { id } = req.params
			const result = await Category.findByIdAndDelete(id)
			return res.json(result)
		} catch (e) {
			next(ApiError.badRequest(e))
		}
	}
}

export default new CategoryController()
