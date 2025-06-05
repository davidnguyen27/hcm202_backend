import { Request, Response } from 'express'
import { ArticleService } from '~/services/article.service'
import { sendResponse } from '~/utils/Response'
import { AppError } from '~/utils/AppError'
import { getPagination } from '~/utils/Pagination'

const articleService = new ArticleService()

export class ArticleController {
  async getAll(req: Request, res: Response) {
    const pagination = getPagination(req)
    const result = await articleService.getAll(pagination)
    sendResponse(res, true, 'Lấy danh sách bài viết thành công', result)
  }

  async getById(req: Request, res: Response) {
    const item = await articleService.getById(req.params.id)
    if (!item) throw new AppError('Không tìm thấy bài viết', 404)
    sendResponse(res, true, 'Lấy chi tiết bài viết thành công', item)
  }

  async create(req: Request, res: Response) {
    const created = await articleService.create(req.body)
    sendResponse(res, true, 'Tạo bài viết thành công', created, 201)
  }

  async update(req: Request, res: Response) {
    const updated = await articleService.update(req.params.id, req.body)
    if (!updated) throw new AppError('Không tìm thấy bài viết để cập nhật', 404)
    sendResponse(res, true, 'Cập nhật bài viết thành công', updated)
  }

  async delete(req: Request, res: Response) {
    const deleted = await articleService.delete(req.params.id)
    if (!deleted) throw new AppError('Không tìm thấy bài viết để xóa', 404)
    sendResponse(res, true, 'Xóa bài viết thành công', null, 204)
  }
}
