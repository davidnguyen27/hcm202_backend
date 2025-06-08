import express from 'express'
import { ArticleController } from '~/controllers/article.controller'

const router = express.Router()
const controller = new ArticleController()

router.get('/', controller.getAll)
router.get('/:id', controller.getById)
router.post('/', controller.create)
router.put('/:id', controller.update)
router.delete('/:id', controller.delete)

export default router
