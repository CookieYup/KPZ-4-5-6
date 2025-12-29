import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';
import bcrypt from 'bcryptjs'; // Импортируем bcrypt

import { User } from '../../orm/entities/users/User';
import { CustomError } from '../../utils/response/custom-error/CustomError';

export const changePassword = async (req: Request, res: Response, next: NextFunction) => {
  const { password, passwordNew } = req.body;
  // Извлекаем id из токена. Поле name в токене теперь составное.
  const { id } = req.jwtPayload;

  const userRepository = getRepository(User);
  try {
    // Важно: выбираем password, так как он скрыт (select: false) в Entity
    const user = await userRepository.findOne({ 
      where: { id }, 
      select: ['id', 'password', 'firstName', 'lastName'] 
    });

    if (!user) {
      const customError = new CustomError(404, 'General', 'Not Found', [`User ID ${id} not found.`]);
      return next(customError);
    }

    // ИСПРАВЛЕНО: Проверка пароля через bcrypt
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      const customError = new CustomError(400, 'General', 'Security', ['Incorrect current password']);
      return next(customError);
    }

    // ИСПРАВЛЕНО: Хеширование нового пароля вручную
    const hashedNewPassword = await bcrypt.hash(passwordNew, 10);
    user.password = hashedNewPassword;
    
    await userRepository.save(user);

    // Если используется кастомный метод успеха (зависит от твоего boilerplate)
    if ((res as any).customSuccess) {
        (res as any).customSuccess(200, 'Password successfully changed.');
    } else {
        res.status(200).json({ message: 'Password successfully changed.' });
    }
    
  } catch (err) {
    const customError = new CustomError(400, 'Raw', 'Error', null, err);
    return next(customError);
  }
};