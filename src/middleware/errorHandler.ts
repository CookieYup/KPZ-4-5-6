import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../utils/response/custom-error/CustomError';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  // Если это наша CustomError, берем её статус, иначе ставим 500
  const statusCode = err.HttpStatusCode || 500;
  
  // Если у ошибки есть метод JSON (как у CustomError), используем его,
  // иначе отправляем стандартный объект с сообщением
  const errorResponse = err.JSON || {
    message: err.message || 'Internal Server Error',
    errorRaw: err
  };

  console.error('--- ERROR LOG ---');
  console.error(err); // Это поможет нам увидеть реальную причину в консоли Docker
  console.error('-----------------');

  return res.status(statusCode).json(errorResponse);
};