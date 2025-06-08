import { Request, Response, NextFunction } from 'express'
import { ArticleService } from '~/services/article.service'
import { sendResponse } from '~/utils/Response'
import { AppError } from '~/utils/AppError'
import { getPagination } from '~/utils/Pagination'

const articleService = new ArticleService()

export class ArticleController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const pagination = getPagination(req)
      const result = await articleService.getAll(pagination)

      sendResponse({
        res,
        message: 'Lấy danh sách bài viết thành công',
        data: result.data,
        meta: { pagination: result.pagination }
      })
    } catch (err) {
      next(err)
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const item = await articleService.getById(req.params.id)
      if (!item) {
        throw new AppError('Không tìm thấy bài viết', 404)
      }

      sendResponse({
        res,
        message: 'Lấy chi tiết bài viết thành công',
        data: item
      })
    } catch (err) {
      next(err)
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const created = await articleService.create(req.body)

      sendResponse({
        res,
        statusCode: 201,
        message: 'Tạo bài viết thành công',
        data: created
      })
    } catch (err) {
      next(err)
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const updated = await articleService.update(req.params.id, req.body)
      if (!updated) {
        throw new AppError('Không tìm thấy bài viết để cập nhật', 404)
      }

      sendResponse({
        res,
        message: 'Cập nhật bài viết thành công',
        data: updated
      })
    } catch (err) {
      next(err)
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const deleted = await articleService.delete(req.params.id)
      if (!deleted) {
        throw new AppError('Không tìm thấy bài viết để xóa', 404)
      }

      sendResponse({
        res,
        statusCode: 204,
        message: 'Xóa bài viết thành công',
        data: null
      })
    } catch (err) {
      next(err)
    }
  }
}
