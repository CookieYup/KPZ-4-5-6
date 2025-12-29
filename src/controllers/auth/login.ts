import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';
import bcrypt from 'bcryptjs'; // Добавляем bcrypt для проверки пароля

import { Role } from '../../orm/entities/users/types';
import { User } from '../../orm/entities/users/User';
import { JwtPayload } from '../../types/JwtPayload';
import { createJwtToken } from '../../utils/createJwtToken';
import { CustomError } from '../../utils/response/custom-error/CustomError';

export const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  const userRepository = getRepository(User);
  try {
    // Важно: при логине нам НУЖНО поле password, которое помечено как select: false
    const user = await userRepository.findOne({ 
      where: { email },
      select: ['id', 'email', 'password', 'firstName', 'lastName', 'role', 'created_at'] 
    });

    if (!user) {
      const customError = new CustomError(404, 'General', 'Not Found', ['Incorrect email or password']);
      return next(customError);
    }

    // ИСПРАВЛЕНО: Используем bcrypt вместо метода сущности
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      const customError = new CustomError(404, 'General', 'Not Found', ['Incorrect email or password']);
      return next(customError);
    }

    const jwtPayload: JwtPayload = {
      id: user.id,
      name: `${user.firstName} ${user.lastName}`, // ИСПРАВЛЕНО: Собираем имя из firstName и lastName
      email: user.email,
      role: user.role as Role,
      created_at: user.created_at,
    };

    try {
      const token = createJwtToken(jwtPayload);
      // Если у тебя настроен middleware для customSuccess:
      (res as any).customSuccess(200, 'Token successfully created.', `Bearer ${token}`);
    } catch (err) {
      const customError = new CustomError(400, 'Raw', "Token can't be created", null, err);
      return next(customError);
    }
  } catch (err) {
    const customError = new CustomError(400, 'Raw', 'Error', null, err);
    return next(customError);
  }
};