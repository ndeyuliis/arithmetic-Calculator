import { Request, Response, NextFunction } from 'express'

interface IError {
  status: number
  message: string
}

function ErrorHandler(
  Error: IError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.status(Error.status || 500)
  res.json({ msg: Error.message || ' Internal server error' })
}

export default ErrorHandler
