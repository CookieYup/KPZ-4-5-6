import { Request, Response, NextFunction } from 'express';

import { UserService } from '../../service/UserService';
import { UserResponseDTO } from '../../dto/UserResponseDTO';
import { User } from '../../orm/entities/users/User'; // Добавь импорт сущности для типизации

export const show = async (req: Request, res: Response, next: NextFunction) => {
  // ИСПРАВЛЕНО: Преобразуем строковый параметр ID в число
  const id = Number(req.params.id); 
  const userService = new UserService();

  // ИСПРАВЛЕНО: Передаем число в сервис
  const { result, error } = await userService.show(id);

  if (error) {
    return next(error);
  }

  // ИСПРАВЛЕНО: Явно указываем, что result — это объект User для DTO
  const userDTO = new UserResponseDTO(result as User);

  // Используем кастомный метод успеха, если он подключен в твоем boilerplate
  if ((res as any).customSuccess) {
    (res as any).customSuccess(200, 'User found.', userDTO);
  } else {
    res.status(200).json(userDTO);
  }
};