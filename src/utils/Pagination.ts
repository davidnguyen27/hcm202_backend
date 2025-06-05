import { Request } from 'express'

export interface PaginationQuery {
  page: number
  limit: number
  skip: number
}

export interface PaginatedResult<T> {
  data: T[]
  pagination: {
    total: number
    page: number
    limit: number
    totalPages: number
  }
}

export const getPagination = (req: Request): PaginationQuery => {
  const page = Math.max(parseInt(req.query.page as string) || 1, 1)
  const limit = Math.max(parseInt(req.query.limit as string) || 10, 1)
  const skip = (page - 1) * limit

  return { page, limit, skip }
}
