import { ErrorRequestHandler } from 'express'
import { sendResponse } from '~/utils/Response'

interface AppError extends Error {
  statusCode?: number
}

export const errorMiddleware: ErrorRequestHandler = (err, req, res) => {
  const error = err as AppError

  const statusCode = error.statusCode ?? 500
  const message = error.message ?? 'Internal Server Error'

  sendResponse(res, false, message, null, statusCode)
}
