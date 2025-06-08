import { Request, Response, NextFunction } from 'express'
import { TimelineEventService } from '~/services/timeline.service'
import { sendResponse } from '~/utils/Response'
import { AppError } from '~/utils/AppError'
import { getPagination } from '~/utils/Pagination'

const service = new TimelineEventService()

export class TimelineEventController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const pagination = getPagination(req)
      const result = await service.getAll(pagination)

      sendResponse({
        res,
        message: 'Lấy danh sách sự kiện dòng thời gian thành công',
        data: result.data,
        meta: { pagination: result.pagination }
      })
    } catch (err) {
      next(err)
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const item = await service.getById(req.params.id)
      if (!item) {
        throw new AppError('Không tìm thấy sự kiện dòng thời gian', 404, [
          { field: 'id', message: 'ID không tồn tại hoặc không hợp lệ' }
        ])
      }

      sendResponse({
        res,
        message: 'Lấy chi tiết sự kiện dòng thời gian thành công',
        data: item
      })
    } catch (err) {
      next(err)
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const created = await service.create(req.body)

      sendResponse({
        res,
        statusCode: 201,
        message: 'Tạo sự kiện dòng thời gian thành công',
        data: created
      })
    } catch (err) {
      next(err)
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const updated = await service.update(req.params.id, req.body)
      if (!updated) {
        throw new AppError('Không tìm thấy sự kiện để cập nhật', 404, [
          { field: 'id', message: 'ID không tồn tại hoặc đã bị xoá' }
        ])
      }

      sendResponse({
        res,
        message: 'Cập nhật sự kiện dòng thời gian thành công',
        data: updated
      })
    } catch (err) {
      next(err)
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const deleted = await service.delete(req.params.id)
      if (!deleted) {
        throw new AppError('Không tìm thấy sự kiện để xoá', 404, [
          { field: 'id', message: 'ID không tồn tại trong hệ thống' }
        ])
      }

      sendResponse({
        res,
        statusCode: 204,
        message: 'Xoá sự kiện dòng thời gian thành công',
        data: null
      })
    } catch (err) {
      next(err)
    }
  }
}
