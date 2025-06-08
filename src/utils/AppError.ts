export interface ErrorDetails {
  field?: string
  message: string
}

export class AppError extends Error {
  public readonly statusCode: number
  public readonly errors: ErrorDetails[] | null

  constructor(message: string, statusCode = 500, errors: ErrorDetails[] = []) {
    super(message)
    this.statusCode = statusCode
    this.errors = errors
    Error.captureStackTrace(this, this.constructor)
  }
}
