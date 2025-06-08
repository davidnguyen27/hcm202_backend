import express from 'express'
import { BiographyController } from '~/controllers/biography.controller'

const router = express.Router()
const controller = new BiographyController()

router.get('/', controller.getAll)
router.get('/:id', controller.getById)
router.post('/', controller.create)
router.put('/:id', controller.update)
router.delete('/:id', controller.delete)

export default router
