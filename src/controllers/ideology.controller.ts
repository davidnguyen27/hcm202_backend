import { Request, Response, NextFunction } from 'express'
import { IdeologyService } from '~/services/ideology.service'
import { sendResponse } from '~/utils/Response'
import { IdeologyDTO } from '~/interface/IdeologyDTO'
import { AppError } from '~/utils/AppError'
import { getPagination } from '~/utils/Pagination'

const ideologyService = new IdeologyService()

export class IdeologyController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const pagination = getPagination(req)
      const result = await ideologyService.getAll(pagination)

      sendResponse({
        res,
        message: 'Lấy danh sách tư tưởng thành công',
        data: result.data,
        meta: { pagination: result.pagination }
      })
    } catch (err) {
      next(err)
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const item = await ideologyService.getById(req.params.id)

      if (!item) {
        throw new AppError('Không tìm thấy tư tưởng', 404, [
          { field: 'id', message: 'ID tư tưởng không hợp lệ hoặc không tồn tại' }
        ])
      }

      sendResponse({
        res,
        message: 'Lấy chi tiết tư tưởng thành công',
        data: item
      })
    } catch (err) {
      next(err)
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data: IdeologyDTO = req.body
      const created = await ideologyService.create(data)

      sendResponse({
        res,
        statusCode: 201,
        message: 'Tạo tư tưởng thành công',
        data: created
      })
    } catch (err) {
      next(err)
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const updated = await ideologyService.update(req.params.id, req.body)

      if (!updated) {
        throw new AppError('Không tìm thấy tư tưởng để cập nhật', 404, [
          { field: 'id', message: 'ID không hợp lệ hoặc đã bị xoá' }
        ])
      }

      sendResponse({
        res,
        message: 'Cập nhật tư tưởng thành công',
        data: updated
      })
    } catch (err) {
      next(err)
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const deleted = await ideologyService.delete(req.params.id)

      if (!deleted) {
        throw new AppError('Không tìm thấy tư tưởng để xoá', 404, [
          { field: 'id', message: 'ID không tồn tại trong hệ thống' }
        ])
      }

      sendResponse({
        res,
        statusCode: 204,
        message: 'Xoá tư tưởng thành công',
        data: null
      })
    } catch (err) {
      next(err)
    }
  }
}
