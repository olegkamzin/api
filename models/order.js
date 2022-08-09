import db from '../db.js'

const schema = new db.Schema({
	user: { type: db.Types.ObjectId, ref: 'users', required: true },
	products: { type: Array, required: true, },
	data: { type: Date, default: Date.now },
	address: { type: String },
	other: { type: String }
})

export default db.model('Order', schema)