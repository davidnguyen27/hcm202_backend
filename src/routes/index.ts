import express from 'express'
import quoteRoutes from './quote.route'
import ideologyRoutes from './ideology.route'
import biographyRoutes from './biography.route'
import legacyRoutes from './legacy.route'
import historyRoutes from './history.route'
import articleRoutes from './article.route'
import timelineRoutes from './timeline.route'
import documentRoutes from './document.route'
import chatRoutes from './chat.route'

const router = express.Router()

router.use('/quotes', quoteRoutes)
router.use('/ideologies', ideologyRoutes)
router.use('/biography', biographyRoutes)
router.use('/legacies', legacyRoutes)
router.use('/histories', historyRoutes)
router.use('/articles', articleRoutes)
router.use('/timelines', timelineRoutes)
router.use('/documents', documentRoutes)
router.use('/chat', chatRoutes)

export default router
