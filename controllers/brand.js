import genSlug from 'slugify'
import Brand from '../models/brand.js'
import ApiError from "../service/error/ApiError.js";

class BrandController {
	async create(req, res, next) {
		try {
			const {name, description} = req.body
			return Brand.create({name: name, description: description, slug: genSlug(name, {lower: true})})
				.then(data => res.json(data))
				.catch(error => res.status(400).json(error.message))
		} catch(e) {
			next(ApiError.badRequest(e))
		}
	}
	async edit(req, res, next) {
		try {
			const {id} = req.params
			const {name, description} = req.body
			return Brand.findByIdAndUpdate(id, {name: name, description: description}, {new: true})
				.then(data => res.json(data))
				.catch(error => res.status(400).json(error.message))
		} catch(e) {
			next(ApiError.badRequest(e))
		}
	}
	async getAll(req, res, next) {
		try {
			return Brand.find()
				.then((data) => res.status(200).json(data))
				.catch(error => res.status(400).json(error.message))
		} catch(e) {
			next(ApiError.badRequest(e))
		}
	}
	async delete(req, res, next) {
		try {
			const { id } = req.params
			return Brand.findByIdAndDelete(id)
				.then((data) => res.json(data))
				.catch(error => res.status(400).json(error.message))
		} catch(e) {
			next(ApiError.badRequest(e))
		}
	}
}

export default new BrandController()