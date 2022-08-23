import db from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

db.connect(process.env.DB_URL).then(() => console.log('📶 БД подключена')).catch(error => console.log(error))

export default db
