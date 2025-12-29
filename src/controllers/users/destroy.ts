import { Request, Response, NextFunction } from 'express';

import { UserService } from '../../service/UserService';
import { UserResponseDTO } from '../../dto/UserResponseDTO';
import { User } from '../../orm/entities/users/User';

export const destroy = async (req: Request, res: Response, next: NextFunction) => {
  // ИСПРАВЛЕНО: Преобразуем строку в число для TypeScript
  const id = Number(req.params.id);
  const userService = new UserService();

  // ИСПРАВЛЕНО: Передаем число в метод сервиса
  const { result, error } = await userService.destroy(id);

  if (error) {
    return next(error);
  }

  const userDTO = result ? new UserResponseDTO(result as User) : null;

  if ((res as any).customSuccess) {
    (res as any).customSuccess(200, 'User successfully deleted.', userDTO);
  } else {
    res.status(200).json({ message: 'User successfully deleted.', data: userDTO });
  }
};