class ApiError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "ApiError"
  }
}

class ValidationError extends ApiError {
  constructor(message: string) {
    super(message)
    this.name = "ValidationError"
  }
}

class NotFoundError extends ApiError {
  constructor(message: string) {
    super(message)
    this.name = "NotFoundError"
  }
}

class ServerError extends ApiError {
  constructor(message: string) {
    super(message)
    this.name = "ServerError"
  }
}

export { ApiError, ValidationError, NotFoundError, ServerError }
