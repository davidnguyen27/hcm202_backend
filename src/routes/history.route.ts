import express from 'express'
import { HistoricalEventController } from '~/controllers/history.controller'

const router = express.Router()
const controller = new HistoricalEventController()

const asyncHandler =
  (fn: express.RequestHandler): express.RequestHandler =>
  (req, res, next) =>
    Promise.resolve(fn(req, res, next)).catch(next)

router.get('/', asyncHandler(controller.getAll.bind(controller)))
router.get('/:id', asyncHandler(controller.getById.bind(controller)))
router.post('/', asyncHandler(controller.create.bind(controller)))
router.put('/:id', asyncHandler(controller.update.bind(controller)))
router.delete('/:id', asyncHandler(controller.delete.bind(controller)))

export default router
