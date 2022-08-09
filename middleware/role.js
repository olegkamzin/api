import ApiError from '../service/error/ApiError.js'
import TokenService from '../service/user/TokenService.js'

export default function (role) {
	return function (req, res, next) {
		try {
			const authorizationHeader = req.headers.authorization
			if (!authorizationHeader) return next(ApiError.unauthorized('Вы не авторизованы.'))
			
			const token = authorizationHeader.split(' ')[1]
			if (!token) return next(ApiError.unauthorized('Вы не авторизованы.'))

			const validToken = TokenService.validateAccessToken(token)
			if (!validToken || validToken.role !== role) return next(ApiError.forbidden('Вы не авторизованы или нет доступа'))

			next()
		} catch (e) {
			next(ApiError.unauthorized('Вы не авторизованы.'))
		}
	}
}