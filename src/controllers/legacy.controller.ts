import { Request, Response } from 'express'
import { LegacyService } from '~/services/legacy.service'
import { sendResponse } from '~/utils/Response'
import { LegacyDTO } from '~/interface/LegacyDTO'
import { AppError } from '~/utils/AppError'
import { getPagination } from '~/utils/Pagination'

const legacyService = new LegacyService()

export class LegacyController {
  async getAll(req: Request, res: Response) {
    const pagination = getPagination(req)
    const result = await legacyService.getAll(pagination)
    sendResponse(res, true, 'Lấy danh sách thành công', result)
  }

  async getById(req: Request, res: Response) {
    const item = await legacyService.getById(req.params.id)
    if (!item) throw new AppError('Không tìm thấy di sản', 404)
    sendResponse(res, true, 'Lấy chi tiết di sản thành công', item)
  }

  async create(req: Request, res: Response) {
    const data: LegacyDTO = req.body
    const created = await legacyService.create(data)
    sendResponse(res, true, 'Tạo di sản thành công', created, 201)
  }

  async update(req: Request, res: Response) {
    const updated = await legacyService.update(req.params.id, req.body)
    if (!updated) throw new AppError('Không tìm thấy di sản để cập nhật', 404)
    sendResponse(res, true, 'Cập nhật di sản thành công', updated)
  }

  async delete(req: Request, res: Response) {
    const deleted = await legacyService.delete(req.params.id)
    if (!deleted) throw new AppError('Không tìm thấy di sản để xóa', 404)
    sendResponse(res, true, 'Xóa di sản thành công', null, 204)
  }
}
