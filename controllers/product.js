import Product from '../models/product.js'
import Category from '../models/category.js'
import ApiError from '../service/error/ApiError.js'

class ProductController {
	async post (req, res, next) {
		try {
			const { brand, model, category, quantity, price, params } = req.body
			const validation = await productValidation(category, params)
			if (validation.error) return next(ApiError.badRequest(validation.error))
			const result = await Product.create({ brand, model, category, quantity, price, params: validation })
			return res.json(result)
		} catch (e) {
			next(ApiError.badRequest(e))
		}
	}

	async put (req, res, next) {
		try {
			const { id } = req.params
			const { brand, model, category, quantity, price, params } = req.body
			const validation = await productValidation(category, params)
			if (validation.error) return next(ApiError.badRequest(validation.error))
			const result = await Product.findByIdAndUpdate(id, { brand, model, category, quantity, price, params: validation })
			return res.json(result)
		} catch (e) {
			next(ApiError.badRequest(e))
		}
	}

	async get (req, res, next) {
		try {
			let { category } = req.params
			let { page, limit, quantity, price_from } = req.query
			category = await Category.findOne({ slug: category })
			if (quantity) req.query.quantity = { $gt: quantity }
			if (price_from) req.query.price = { $gt: price_from }
			page = page || 1
			limit = limit || 20
			const paramsCategory = category.params
			let params = {}
			for (const el in req.query) {
				const param = paramsCategory.find(val => val.property === el)
				let prop = ''
				if (param) {
					if (param.type === 'number') prop = Number(req.query[el])
					if (param.type === 'string') prop = req.query[el].toString()
					if (param.type === 'variants') prop = req.query[el].toString()
					const paramName = `params.${el}`
					params[paramName] = prop
				} else {
					params[el] = req.query[el]
				}
			}
			params = JSON.parse(JSON.stringify(params))
			const result = await Product.find({ category: category._id, ...params })
				.limit(limit)
				.skip(page * limit - limit)
				// .select('-price')
			return res.json(result)
		} catch (e) {
			next(ApiError.badRequest(e))
		}
	}

	async getOne (req, res, next) {
		try {
			const { id } = req.params
			const result = await Product.findById(id)
				.populate({ path: 'brand', model: 'Brand' })
				.populate({ path: 'model', model: 'Model' })
			return res.json(result)
		} catch (e) {
			next(ApiError.badRequest(e))
		}
	}

	async delete (req, res, next) {
		try {
			const { id } = req.params
			const result = await Product.findByIdAndDelete(id)
			return res.json(result)
		} catch (e) {
			next(ApiError.badRequest(e))
		}
	}
}

// Валидация по выбранной категории

const productValidation = async (category, params) => {
	let result = {}
	if (typeof params !== 'object') return { error: 'Параметры отправлены не верно (тип должен быть object)' } // если не массив
	const getCategory = await Category.findById(category).catch(error => { result = { ...result, error: error.message } })
	if (result.error) return result
	if (!getCategory) return { error: 'Категория не найдена' } // если категория не найдена

	const paramsCategory = getCategory.params
	for (const el in params) {
		if (!paramsCategory.find(param => param.property === el)) return { error: `Указано свойство "${el}", которого не должно быть` }
	}
	for (const el of paramsCategory) {
		if (el.required && !params[el.property]) return { error: `Свойство "${el.property}" обязательно` }
		if (el.type !== typeof params[el.property]) return { error: `Тип свойства "${el.property}" не соблюден` }
		if (el.variants && !el.variants.find(val => val.value === params[el.property])) return { error: `Можно выбрать только один из параметров свойства "${el.property}"` }
		result = { ...result, [el.property]: params[el.property] }
	}
	return result
}

export default new ProductController()
