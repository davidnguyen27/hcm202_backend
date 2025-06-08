import { NextFunction, Request, Response } from 'express'
import { BiographyService } from '~/services/biography.service'
import { BiographyDTO } from '~/interface/BiographyDTO'
import { sendResponse } from '~/utils/Response'
import { AppError } from '~/utils/AppError'
import { getPagination } from '~/utils/Pagination'

const biographyService = new BiographyService()

export class BiographyController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const pagination = getPagination(req)
      const result = await biographyService.getAll(pagination)

      sendResponse({
        res,
        message: 'Lấy danh sách tiểu sử thành công',
        data: result.data,
        meta: { pagination: result.pagination }
      })
    } catch (err) {
      next(err)
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const item = await biographyService.getById(req.params.id)
      if (!item) throw new AppError('Không tìm thấy tiểu sử', 404)

      sendResponse({
        res,
        message: 'Lấy chi tiết tiểu sử thành công',
        data: item
      })
    } catch (err) {
      next(err)
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data: BiographyDTO = req.body
      const created = await biographyService.create(data)

      sendResponse({
        res,
        statusCode: 201,
        message: 'Tạo tiểu sử thành công',
        data: created
      })
    } catch (err) {
      next(err)
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const updated = await biographyService.update(req.params.id, req.body)
      if (!updated) throw new AppError('Không tìm thấy tiểu sử để cập nhật', 404)

      sendResponse({
        res,
        message: 'Cập nhật tiểu sử thành công',
        data: updated
      })
    } catch (err) {
      next(err)
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const deleted = await biographyService.delete(req.params.id)
      if (!deleted) throw new AppError('Không tìm thấy tiểu sử để xóa', 404)

      sendResponse({
        res,
        statusCode: 204,
        message: 'Xóa tiểu sử thành công',
        data: null
      })
    } catch (err) {
      next(err)
    }
  }
}
