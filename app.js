import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import fileUpload from 'express-fileupload'
import error from './middleware/error.js'
import router from './routes/index.js'
dotenv.config()

const PORT = process.env.PORT

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
	origin: process.env.CLIENT_URL,
	credentials: true
}))
app.use(fileUpload())
app.use(router)
app.use(error)
app.use((req, res) => res.status(404).json({ error: 'Страница не найдена или не верный метод запроса.' }))

const start = async () => {
	try {
		app.listen(PORT, () => console.log(`✅ Сервер запущен на порту ${PORT}`))
	} catch (e) {
		console.log(e)
	}
}

start()
