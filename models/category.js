import db from '../db.js'

const schema = new db.Schema({
	name: { type: String, required: true, maxlength: 255, minlength: 2, trim: true, index: true, unique: true },
	description: { type: String, maxlength: 2000, trim: true },
	slug: { type: String, slug: 'name', unique: true, required: true },
	params: { type: Array }
})

export default db.model('Category', schema)
