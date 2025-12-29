import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';
import bcrypt from 'bcryptjs'; // Добавляем импорт bcrypt

import { User } from '../../orm/entities/users/User';
import { CustomError } from '../../utils/response/custom-error/CustomError';

export const register = async (req: Request, res: Response, next: NextFunction) => {
  // Достаем все необходимые поля из тела запроса
  const { email, password, firstName, lastName, role, language } = req.body;

  const userRepository = getRepository(User);
  try {
    const user = await userRepository.findOne({ where: { email } });

    if (user) {
      const customError = new CustomError(400, 'General', 'User already exists', [
        `Email '${email}' already exists`,
      ]);
      return next(customError);
    }

    try {
      // Хешируем пароль вручную перед сохранением
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User();
      newUser.email = email;
      newUser.password = hashedPassword; // Сохраняем хеш
      newUser.firstName = firstName;
      newUser.lastName = lastName;
      newUser.role = role || 'USER'; // Значение по умолчанию
      newUser.language = language || 'ru';

      await userRepository.save(newUser);

      // Проверка наличия кастомного метода успеха
      if ((res as any).customSuccess) {
        (res as any).customSuccess(200, 'User successfully created.');
      } else {
        res.status(201).json({ message: 'User successfully created.' });
      }
    } catch (err) {
      const customError = new CustomError(400, 'Raw', `User '${email}' can't be created`, null, err);
      return next(customError);
    }
  } catch (err) {
    const customError = new CustomError(400, 'Raw', 'Error', null, err);
    return next(customError);
  }
};