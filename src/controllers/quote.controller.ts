import { Request, Response, NextFunction } from 'express'
import { QuoteService } from '~/services/quote.service'
import { QuoteDTO } from '~/interface/QuoteDTO'
import { sendResponse } from '~/utils/Response'
import { AppError } from '~/utils/AppError'
import { getPagination } from '~/utils/Pagination'

const quoteService = new QuoteService()

export class QuoteController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const pagination = getPagination(req)
      const result = await quoteService.getAll(pagination)

      sendResponse({
        res,
        message: 'Lấy danh sách câu nói thành công',
        data: result.data,
        meta: { pagination: result.pagination }
      })
    } catch (err) {
      next(err)
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const quote = await quoteService.getById(req.params.id)

      if (!quote) {
        throw new AppError('Không tìm thấy câu nói', 404, [
          { field: 'id', message: 'ID không tồn tại hoặc không hợp lệ' }
        ])
      }

      sendResponse({
        res,
        message: 'Lấy chi tiết câu nói thành công',
        data: quote
      })
    } catch (err) {
      next(err)
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data: QuoteDTO = req.body
      const created = await quoteService.create(data)

      sendResponse({
        res,
        statusCode: 201,
        message: 'Tạo câu nói thành công',
        data: created
      })
    } catch (err) {
      next(err)
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const data: Partial<QuoteDTO> = req.body
      const updated = await quoteService.update(req.params.id, data)

      if (!updated) {
        throw new AppError('Không tìm thấy câu nói để cập nhật', 404, [
          { field: 'id', message: 'ID không tồn tại hoặc đã bị xoá' }
        ])
      }

      sendResponse({
        res,
        message: 'Cập nhật câu nói thành công',
        data: updated
      })
    } catch (err) {
      next(err)
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const deleted = await quoteService.delete(req.params.id)

      if (!deleted) {
        throw new AppError('Không tìm thấy câu nói để xoá', 404, [
          { field: 'id', message: 'ID không tồn tại trong hệ thống' }
        ])
      }

      sendResponse({
        res,
        statusCode: 204,
        message: 'Xoá câu nói thành công',
        data: null
      })
    } catch (err) {
      next(err)
    }
  }
}
