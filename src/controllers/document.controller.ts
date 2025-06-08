import { Request, Response, NextFunction } from 'express'
import { DocumentService } from '~/services/document.service'
import { DocumentDTO } from '~/interface/DocumentDTO'
import { sendResponse } from '~/utils/Response'
import { AppError } from '~/utils/AppError'
import { getPagination } from '~/utils/Pagination'

const documentService = new DocumentService()

export class DocumentController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const pagination = getPagination(req)
      const result = await documentService.getAll(pagination)

      sendResponse({
        res,
        message: 'Lấy danh sách tài liệu thành công',
        data: result.data,
        meta: { pagination: result.pagination }
      })
    } catch (err) {
      next(err)
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const doc = await documentService.getById(req.params.id)
      if (!doc) {
        throw new AppError('Không tìm thấy tài liệu', 404, [{ field: 'id', message: 'ID tài liệu không tồn tại' }])
      }

      sendResponse({
        res,
        message: 'Lấy chi tiết tài liệu thành công',
        data: doc
      })
    } catch (err) {
      next(err)
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data: DocumentDTO = req.body
      const created = await documentService.create(data)

      sendResponse({
        res,
        statusCode: 201,
        message: 'Tạo tài liệu thành công',
        data: created
      })
    } catch (err) {
      next(err)
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const data: Partial<DocumentDTO> = req.body
      const updated = await documentService.update(req.params.id, data)

      if (!updated) {
        throw new AppError('Không tìm thấy tài liệu để cập nhật', 404, [
          { field: 'id', message: 'ID không tồn tại hoặc không hợp lệ' }
        ])
      }

      sendResponse({
        res,
        message: 'Cập nhật tài liệu thành công',
        data: updated
      })
    } catch (err) {
      next(err)
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const deleted = await documentService.delete(req.params.id)
      if (!deleted) {
        throw new AppError('Không tìm thấy tài liệu để xoá', 404, [
          { field: 'id', message: 'ID không tồn tại trong hệ thống' }
        ])
      }

      sendResponse({
        res,
        statusCode: 204,
        message: 'Xoá tài liệu thành công',
        data: null
      })
    } catch (err) {
      next(err)
    }
  }
}
