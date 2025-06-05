import { Request, Response } from 'express'
import { QuoteService } from '~/services/quote.service'
import { QuoteDTO } from '~/interface/QuoteDTO'
import { sendResponse } from '~/utils/Response'
import { AppError } from '~/utils/AppError'
import { getPagination } from '~/utils/Pagination'

const quoteService = new QuoteService()

export class QuoteController {
  async getAll(req: Request, res: Response) {
    const pagination = getPagination(req)
    const result = await quoteService.getAll(pagination)
    sendResponse(res, true, 'Lấy danh sách câu nói thành công', result)
  }

  async getById(req: Request, res: Response) {
    const quote = await quoteService.getById(req.params.id)
    if (!quote) throw new AppError('Không tìm thấy câu nói', 404)
    sendResponse(res, true, 'Lấy chi tiết câu nói thành công', quote)
  }

  async create(req: Request, res: Response) {
    const data: QuoteDTO = req.body
    const created = await quoteService.create(data)
    sendResponse(res, true, 'Tạo câu nói thành công', created, 201)
  }

  async update(req: Request, res: Response) {
    const data: Partial<QuoteDTO> = req.body
    const updated = await quoteService.update(req.params.id, data)
    if (!updated) throw new AppError('Không tìm thấy câu nói để cập nhật', 404)
    sendResponse(res, true, 'Cập nhật thành công', updated)
  }

  async delete(req: Request, res: Response) {
    const deleted = await quoteService.delete(req.params.id)
    if (!deleted) throw new AppError('Không tìm thấy câu nói để xóa', 404)
    sendResponse(res, true, 'Xóa thành công', null, 204)
  }
}
