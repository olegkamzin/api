import axios from 'axios'
import ApiError from '../service/error/ApiError.js'
import User from '../models/user.js'
import TokenService from '../service/user/TokenService.js'

class UserController {
	async login (req, res, next) {
		try {
			const { phone } = req.query
			const { refreshToken } = req.cookies
			const validToken = TokenService.validateRefreshToken(refreshToken)
			if (validToken) return next(ApiError.badRequest('Вы уже авторизованы.'))

			if (!phone) return next(ApiError.badRequest('Номер указан не верно.'))
			const code = await axios.get('https://sms.ru/code/call', { params: { api_id: process.env.SMS_KEY, phone } })
			if (code.data.status === 'ERROR') return next(ApiError.badRequest('Возникла ошибка при проверке номера. Попробуйте позже.'))

			const userFind = await User.findOne({ phone })

			if (userFind) {
				userFind.code = code.data.code
				userFind.save()
				res.json(userFind)
			} else {
				const user = await User.create({ phone, code: code.data.code })
				res.json(user)
			}
		} catch (e) {
			next(ApiError.badRequest(e.message))
		}
	}

	async logout (req, res, next) {
		try {
			const { refreshToken } = req.cookies
			const token = await TokenService.removeToken(refreshToken)
			res.clearCookie('refreshToken')
			return res.json(token)
		} catch (e) {
			next(ApiError.badRequest(e))
		}
	}

	async activate (req, res, next) {
		try {
			const { phone, code } = req.query
			const user = await User.findOne({ phone })
			if (!user) return next(ApiError.badRequest('Номер не зарегистрирован.'))
			if (user.code !== Number(code)) return next(ApiError.badRequest('Код активации введен не верно.'))
			user.activated = true
			await user.save()
			const token = TokenService.generateTokens({ id: user._id, role: user.role })
			await TokenService.saveToken(user._id, token.refreshToken)
			res.cookie('refreshToken', token.refreshToken, { maxAge: 60 * 24 * 60 * 60 * 1000, httpOnly: true })
			return res.json(token)
		} catch (e) {
			next(ApiError.badRequest(e))
		}
	}

	async refresh (req, res, next) {
		try {
			const { refreshToken } = req.cookies
			if (!refreshToken) return next(ApiError.unauthorized('Вы не были авторизованы.'))
			const validToken = TokenService.validateRefreshToken(refreshToken)
			const getToken = await TokenService.findToken(refreshToken)
			if (!validToken || !getToken) {
				res.clearCookie('refreshToken')
				return next(ApiError.unauthorized('Вы не были авторизованы.'))
			}
			const user = await User.findById(validToken.id)
			const token = TokenService.generateTokens(({ id: user._id, role: user.role }))
			await TokenService.saveToken(user._id, token.refreshToken)

			res.cookie('refreshToken', token.refreshToken, { maxAge: 60 * 24 * 60 * 60 * 1000, httpOnly: true })
			return res.json(token)
		} catch (e) {
			next(ApiError.badRequest(e))
		}
	}

	async getUsers (req, res, next) {
		try {
			const user = await User.find()
			return res.json(user)
		} catch (e) {
			next(ApiError.badRequest(e))
		}
	}

	async delete (req, res, next) {
		try {
			const { id } = req.params
			const user = await User.findByIdAndDelete(id)
			return res.json(user)
		} catch (e) {
			next(ApiError.badRequest(e))
		}
	}

	async edit (req, res, next) {
		try {
			const { id } = req.params
			await User.findByIdAndUpdate(id, { $set: req.body }, { new: true })
			return res.json('done')
		} catch (e) {
			next(ApiError.badRequest(e))
		}
	}
}

export default new UserController()
