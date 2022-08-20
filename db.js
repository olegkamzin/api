import db from 'mongoose'
db.connect('mongodb://127.0.0.1:27017/shop').then(() => console.log('📶 БД подключена')).catch(error => console.log(error))

export default db