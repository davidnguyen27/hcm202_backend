import { Request, Response } from 'express'
import { HistoricalEventService } from '~/services/history.service'
import { sendResponse } from '~/utils/Response'
import { AppError } from '~/utils/AppError'
import { getPagination } from '~/utils/Pagination'

const service = new HistoricalEventService()

export class HistoricalEventController {
  async getAll(req: Request, res: Response) {
    const pagination = getPagination(req)
    const result = await service.getAll(pagination)
    sendResponse(res, true, 'Lấy danh sách sự kiện thành công', result)
  }

  async getById(req: Request, res: Response) {
    const item = await service.getById(req.params.id)
    if (!item) throw new AppError('Không tìm thấy sự kiện', 404)
    sendResponse(res, true, 'Lấy chi tiết sự kiện thành công', item)
  }

  async create(req: Request, res: Response) {
    const created = await service.create(req.body)
    sendResponse(res, true, 'Tạo sự kiện thành công', created, 201)
  }

  async update(req: Request, res: Response) {
    const updated = await service.update(req.params.id, req.body)
    if (!updated) throw new AppError('Không tìm thấy sự kiện để cập nhật', 404)
    sendResponse(res, true, 'Cập nhật sự kiện thành công', updated)
  }

  async delete(req: Request, res: Response) {
    const deleted = await service.delete(req.params.id)
    if (!deleted) throw new AppError('Không tìm thấy sự kiện để xóa', 404)
    sendResponse(res, true, 'Xóa sự kiện thành công', null, 204)
  }
}
