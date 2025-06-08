import express from 'express'
import { HistoricalEventController } from '~/controllers/history.controller'

const router = express.Router()
const controller = new HistoricalEventController()

router.get('/', controller.getAll)
router.get('/:id', controller.getById)
router.post('/', controller.create)
router.put('/:id', controller.update)
router.delete('/:id', controller.delete)

export default router
