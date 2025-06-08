import { ErrorRequestHandler } from 'express'
import { AppError } from '~/utils/AppError'
import { sendResponse } from '~/utils/Response'

export const errorMiddleware: ErrorRequestHandler = (err, req, res) => {
  const statusCode = err instanceof AppError ? err.statusCode : 500
  const message = err.message || 'Internal Server Error'
  const errors = err instanceof AppError && Array.isArray(err.errors) ? err.errors : undefined

  sendResponse({ res, statusCode, success: false, message, errors })
}
