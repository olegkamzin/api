import db from '../db.js'

const schema = new db.Schema({
	user: { type: db.Types.ObjectId, ref: 'users', required: true },
	product: { type: db.Types.ObjectId, ref: 'products', required: true, },
	quantity: { type: Number, default: 1, required: true }
})

export default db.model('Cart', schema)