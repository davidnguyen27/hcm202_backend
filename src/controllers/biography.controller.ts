import { Request, Response } from 'express'
import { BiographyService } from '~/services/biography.service'
import { BiographyDTO } from '~/interface/BiographyDTO'
import { sendResponse } from '~/utils/Response'
import { AppError } from '~/utils/AppError'
import { getPagination } from '~/utils/Pagination'

const biographyService = new BiographyService()

export class BiographyController {
  async getAll(req: Request, res: Response) {
    const pagination = getPagination(req)
    const result = await biographyService.getAll(pagination)
    sendResponse(res, true, 'Lấy danh sách tiểu sử thành công', result)
  }

  async getById(req: Request, res: Response) {
    const item = await biographyService.getById(req.params.id)
    if (!item) throw new AppError('Không tìm thấy tiểu sử', 404)
    sendResponse(res, true, 'Lấy chi tiết tiểu sử thành công', item)
  }

  async create(req: Request, res: Response) {
    const data: BiographyDTO = req.body
    const created = await biographyService.create(data)
    sendResponse(res, true, 'Tạo tiểu sử thành công', created, 201)
  }

  async update(req: Request, res: Response) {
    const updated = await biographyService.update(req.params.id, req.body)
    if (!updated) throw new AppError('Không tìm thấy tiểu sử để cập nhật', 404)
    sendResponse(res, true, 'Cập nhật tiểu sử thành công', updated)
  }

  async delete(req: Request, res: Response) {
    const deleted = await biographyService.delete(req.params.id)
    if (!deleted) throw new AppError('Không tìm thấy tiểu sử để xóa', 404)
    sendResponse(res, true, 'Xóa tiểu sử thành công', null, 204)
  }
}
