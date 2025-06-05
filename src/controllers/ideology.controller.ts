import { Request, Response } from 'express'
import { IdeologyService } from '~/services/ideology.service'
import { sendResponse } from '~/utils/Response'
import { IdeologyDTO } from '~/interface/IdeologyDTO'
import { AppError } from '~/utils/AppError'
import { getPagination } from '~/utils/Pagination'

const ideologyService = new IdeologyService()

export class IdeologyController {
  async getAll(req: Request, res: Response) {
    const pagination = getPagination(req)
    const result = await ideologyService.getAll(pagination)
    sendResponse(res, true, 'Lấy danh sách tư tưởng thành công', result)
  }

  async getById(req: Request, res: Response) {
    const item = await ideologyService.getById(req.params.id)
    if (!item) throw new AppError('Không tìm thấy tư tưởng', 404)
    sendResponse(res, true, 'Lấy chi tiết tư tưởng thành công', item)
  }

  async create(req: Request, res: Response) {
    const data: IdeologyDTO = req.body
    const created = await ideologyService.create(data)
    sendResponse(res, true, 'Tạo tư tưởng thành công', created, 201)
  }

  async update(req: Request, res: Response) {
    const updated = await ideologyService.update(req.params.id, req.body)
    if (!updated) throw new AppError('Không tìm thấy tư tưởng để cập nhật', 404)
    sendResponse(res, true, 'Cập nhật tư tưởng thành công', updated)
  }

  async delete(req: Request, res: Response) {
    const deleted = await ideologyService.delete(req.params.id)
    if (!deleted) throw new AppError('Không tìm thấy tư tưởng để xóa', 404)
    sendResponse(res, true, 'Xóa tư tưởng thành công', null, 204)
  }
}
