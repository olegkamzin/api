import db from '../db.js'

const schema = new db.Schema({
	user: { type: db.Types.ObjectId, ref: 'users', required: true },
	refreshToken: { type: String, required: true }
})

export default db.model('Token', schema)