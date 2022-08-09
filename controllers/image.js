import ApiError from '../service/error/ApiError.js'
import fs from 'fs'
import dotenv from 'dotenv'
import sharp from 'sharp'
dotenv.config()

class ImagesController {
	async upload(req, res, next) {
		try {
			const { img } = req.files
			const sizes = [200, 400, 800, null]
			const dir = genName(2) + '/'
			const result = []
			if (Array.isArray(img)) {
				for (const el of img) {
					const name = dir + genName(16) + '.webp'
					for (let i = 0; i < sizes.length; i++) {
						const sizeDir = 'static/' + sizes[i] + '/'
						if (!fs.existsSync(sizeDir)) fs.mkdirSync(sizeDir)
						const imgDir = sizeDir + dir
						if (!fs.existsSync(imgDir)) fs.mkdirSync(imgDir)
						await sharp(el.data)
							.resize(sizes[i], sizes[i], {fit: 'inside'})
							.toFile(sizeDir + name)
					}
					result.push(name)
				}
			} else {
				const name = dir + genName(16) + '.webp'
				for (let i = 0; i < sizes.length; i++) {
					const sizeDir = 'static/' + sizes[i] + '/'
					if (!fs.existsSync(sizeDir)) fs.mkdirSync(sizeDir)
					const imgDir = sizeDir + dir
					if (!fs.existsSync(imgDir)) fs.mkdirSync(imgDir)
					await sharp(img.data)
						.resize(sizes[i], sizes[i], { fit: 'inside' })
						.toFile(sizeDir + name)
				}
				result.push(name)
			}
			res.json(result)
		} catch (e) {
			next(ApiError.badRequest(e))
		}
	}
	async delete(req, res, next) {
		try {
			const { name } = req.query
			res.json(name)
		} catch (e) {
			next(ApiError.badRequest(e))
		}
	}
}

const genName = (len) => {
	const abc = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789'
	let str = ''
	for (let i = 0; i < len; i++) {
		const pos = Math.floor(Math.random() * abc.length)
		str += abc.substring(pos,pos+1)
	}
	return str
}

export default new ImagesController()