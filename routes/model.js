import Router from 'express'
import ModelsController from '../controllers/model.js'
import role from '../middleware/role.js'
const router = new Router()

router.get('/', ModelsController.getAll)
router.post('/', role('ADMIN'), ModelsController.create)
router.put('/:id', role('ADMIN'), ModelsController.edit)
router.delete('/:id', role('ADMIN'), ModelsController.delete)

export default router