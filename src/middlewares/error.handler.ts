import { Request, Response, NextFunction } from 'express'

interface IError {
  status: number
  message: String
}

function ErrorHandler(
  Error: IError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.status(Error.status || 500)
  res.send({ msg: Error.message || ' Internal server error' })
}

export default ErrorHandler
