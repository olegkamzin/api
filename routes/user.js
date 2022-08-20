import Router from 'express'
import UserController from '../controllers/user.js'
import role from '../middleware/role.js'
const router = new Router()

router.get('/login', UserController.login)
router.get('/logout', UserController.logout)
router.get('/activate', UserController.activate)
router.get('/refresh', UserController.refresh)
router.get('/:id', role('ADMIN'), UserController.getUsers)
router.delete('/:id', role('ADMIN'), UserController.delete)
router.put('/:id', role('ADMIN'), UserController.edit)

export default router
