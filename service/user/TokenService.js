import jwt from 'jsonwebtoken'
import Token from '../../models/token.js'
import dotenv from 'dotenv'
dotenv.config()

class TokenService {
	generateTokens(payload) {
		const accessToken = jwt.sign(payload, process.env.ACCESS_SECRET, {expiresIn: '1h'})
		const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET, {expiresIn: '60d'})
		return { accessToken, refreshToken }
	}
	validateAccessToken(token) {
		try {
			return jwt.verify(token, process.env.ACCESS_SECRET);
		} catch(e) {
			return null
		}
	}
	validateRefreshToken(token) {
		try {
			return jwt.verify(token, process.env.REFRESH_SECRET);
		} catch(e) {
			return null
		}
	}
	async saveToken(userId, refreshToken) {
		const tokenData = await Token.findOne({user: userId})
		if (tokenData) {
			tokenData.refreshToken = refreshToken;
			return tokenData.save()
		}
		return await Token.create({user: userId, refreshToken})
	}
	async removeToken(refreshToken) {
		return Token.deleteOne({ refreshToken })
	}
	async findToken(refreshToken) {
		return Token.findOne({ refreshToken })
	}
}

export default new TokenService()