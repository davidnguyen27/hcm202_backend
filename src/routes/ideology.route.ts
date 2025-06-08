import express from 'express'
import { IdeologyController } from '~/controllers/ideology.controller'

const router = express.Router()
const controller = new IdeologyController()

router.get('/', controller.getAll)
router.get('/:id', controller.getById)
router.post('/', controller.create)
router.put('/:id', controller.update)
router.delete('/:id', controller.delete)

export default router
