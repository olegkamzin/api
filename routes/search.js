import Router from 'express'
import SearchController from '../controllers/search.js'
const router = new Router()

router.get('/', SearchController.get)

export default router