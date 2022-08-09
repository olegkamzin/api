import db from '../db.js'

const schema = new db.Schema({
	brand: { type: db.Types.ObjectId, ref: 'brands', required: 'Необходимо указать бренд.' },
	model: { type: db.Types.ObjectId, ref: 'models', required: 'Необходимо указать модель.' },
	category: { type: db.Types.ObjectId, ref: 'categories', required: 'Необходимо указать категорию.' },
	quantity: { type: Number, required: 'Необходимо указать количество.' },
	price: { type: Number },
	params: { type: Object, required: 'Параметры товара обязательный для заполнения' }
})

schema.pre('find', function (next) {
	this.populate({ path: 'brand', model: 'Brand' })
	this.populate({ path: 'model', model: 'Model' })
	next()
})

export default db.model('Product', schema)