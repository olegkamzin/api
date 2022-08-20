import Router from 'express'
import ModelsController from '../controllers/model.js'
import role from '../middleware/role.js'
const router = new Router()

router.get('/', ModelsController.get)
router.post('/', role('ADMIN'), ModelsController.post)
router.put('/:id', role('ADMIN'), ModelsController.put)
router.delete('/:id', role('ADMIN'), ModelsController.delete)

export default router
