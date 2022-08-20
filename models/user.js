import db from '../db.js'

const schema = new db.Schema({
	phone: { type: Number, unique: true, required: true },
	role: { type: String, default: 'USER' },
	activated: { type: Boolean, default: false },
	code: { type: Number, required: true },
	email: { type: String },
	lastname: { type: String },
	surname: { type: String },
	middlename: { type: String }
})

export default db.model('User', schema)
