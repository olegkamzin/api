import ApiError from '../service/error/ApiError.js'
import Category from '../models/category.js'
import Product from '../models/product.js'
import Brand from '../models/brand.js'

class FilterController {
	async get (req, res, next) {
		try {
			const { slug } = req.params
			const category = await Category.findOne({ slug })
			category.params.push({ name: 'Бренд', property: 'brand' })
			const filter = {}
			for (const el of category.params) {
				if (el.property === 'other') continue
				if (el.type === 'variants') {
					filter[el.property] = el.variants
					filter[el.property].unshift({ name: el.name, value: 'none' })
					continue
				}
				let product = []
				const param = []
				if (el.property === 'brand') {
					param.push({ name: 'Бренд', value: 'none' })
					product = await Product.find({ category: category._id }).distinct(`${el.property}`)
					for (const br of product) {
						const brand = (await Brand.findById(br))
						param.push({ name: brand.name, value: br })
					}
				} else {
					param.push({ name: el.name, value: 'none' })
					product = await Product.find({ category: category._id }).distinct(`params.${el.property}`)
					product.forEach(pr => {
						param.push({ name: pr, value: pr })
					})
				}
				filter[el.property] = param
			}
			return res.json(filter)
		} catch (e) {
			next(ApiError.badRequest(e))
		}
	}
}

export default new FilterController()
