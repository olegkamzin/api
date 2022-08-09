import Fuse from 'fuse.js'
import ApiError from '../service/error/ApiError.js'
import Product from '../models/product.js'

class SearchController {
	async get(req, res, next) {
		try {
		const { string } = req.query
		return Product.find().then(data => {
			const fuse = new Fuse(data, { keys: ['model.name', 'brand.name', 'category.name'], minMatchCharLength: 2 })
			return res.json(fuse.search(string, {limit: 10}))
		}).catch(error => res.status(400).json(error.message))
		} catch(e) {
			next(ApiError.badRequest(e))
		}
	}
}

export default new SearchController()