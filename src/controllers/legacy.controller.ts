import { Request, Response, NextFunction } from 'express'
import { LegacyService } from '~/services/legacy.service'
import { sendResponse } from '~/utils/Response'
import { LegacyDTO } from '~/interface/LegacyDTO'
import { AppError } from '~/utils/AppError'
import { getPagination } from '~/utils/Pagination'

const legacyService = new LegacyService()

export class LegacyController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const pagination = getPagination(req)
      const result = await legacyService.getAll(pagination)

      sendResponse({
        res,
        message: 'Lấy danh sách di sản thành công',
        data: result.data,
        meta: { pagination: result.pagination }
      })
    } catch (err) {
      next(err)
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const item = await legacyService.getById(req.params.id)
      if (!item) {
        throw new AppError('Không tìm thấy di sản', 404, [
          { field: 'id', message: 'ID không tồn tại hoặc không hợp lệ' }
        ])
      }

      sendResponse({
        res,
        message: 'Lấy chi tiết di sản thành công',
        data: item
      })
    } catch (err) {
      next(err)
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data: LegacyDTO = req.body
      const created = await legacyService.create(data)

      sendResponse({
        res,
        statusCode: 201,
        message: 'Tạo di sản thành công',
        data: created
      })
    } catch (err) {
      next(err)
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const updated = await legacyService.update(req.params.id, req.body)
      if (!updated) {
        throw new AppError('Không tìm thấy di sản để cập nhật', 404, [
          { field: 'id', message: 'ID không tồn tại hoặc đã bị xoá' }
        ])
      }

      sendResponse({
        res,
        message: 'Cập nhật di sản thành công',
        data: updated
      })
    } catch (err) {
      next(err)
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const deleted = await legacyService.delete(req.params.id)
      if (!deleted) {
        throw new AppError('Không tìm thấy di sản để xoá', 404, [
          { field: 'id', message: 'ID không hợp lệ hoặc không tồn tại' }
        ])
      }

      sendResponse({
        res,
        statusCode: 204,
        message: 'Xoá di sản thành công',
        data: null
      })
    } catch (err) {
      next(err)
    }
  }
}
