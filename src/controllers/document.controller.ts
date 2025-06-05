import { Request, Response } from 'express'
import { DocumentService } from '~/services/document.service'
import { DocumentDTO } from '~/interface/DocumentDTO'
import { sendResponse } from '~/utils/Response'
import { AppError } from '~/utils/AppError'
import { getPagination } from '~/utils/Pagination'

const documentService = new DocumentService()

export class DocumentController {
  async getAll(req: Request, res: Response) {
    const pagination = getPagination(req)
    const result = await documentService.getAll(pagination)
    sendResponse(res, true, 'Lấy danh sách tài liệu thành công', result)
  }

  async getById(req: Request, res: Response) {
    const doc = await documentService.getById(req.params.id)
    if (!doc) throw new AppError('Không tìm thấy tài liệu', 404)
    sendResponse(res, true, 'Lấy chi tiết tài liệu thành công', doc)
  }

  async create(req: Request, res: Response) {
    const data: DocumentDTO = req.body
    const created = await documentService.create(data)
    sendResponse(res, true, 'Tạo tài liệu thành công', created, 201)
  }

  async update(req: Request, res: Response) {
    const data: Partial<DocumentDTO> = req.body
    const updated = await documentService.update(req.params.id, data)
    if (!updated) throw new AppError('Không tìm thấy tài liệu để cập nhật', 404)
    sendResponse(res, true, 'Cập nhật tài liệu thành công', updated)
  }

  async delete(req: Request, res: Response) {
    const deleted = await documentService.delete(req.params.id)
    if (!deleted) throw new AppError('Không tìm thấy tài liệu để xóa', 404)
    sendResponse(res, true, 'Xóa tài liệu thành công', null, 204)
  }
}
