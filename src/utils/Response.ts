import { Response } from 'express'

export interface PaginationMeta {
  page: number
  limit: number
  total: number
  totalPages: number
}

export interface Meta {
  pagination?: PaginationMeta
}

export interface ErrorDetail {
  field?: string
  message: string
}

export interface SendResponseParams<T> {
  res: Response
  statusCode?: number
  success?: boolean
  message: string
  data?: T | null
  meta?: Meta
  errors?: ErrorDetail[]
}

export const sendResponse = <T>({
  res,
  statusCode = 200,
  success = true,
  message,
  data = null,
  meta = {},
  errors = []
}: SendResponseParams<T>): Response => {
  const response: {
    success: boolean
    message: string
    data: T | null
    meta: Meta
    errors?: ErrorDetail[]
  } = {
    success,
    message,
    data,
    meta
  }

  if (errors.length > 0) {
    response.errors = errors
  }

  return res.status(statusCode).json(response)
}
