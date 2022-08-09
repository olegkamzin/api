import Router from 'express'
import FilterController from '../controllers/filter.js'
const router = new Router()

router.get('/:slug', FilterController.get)

export default router