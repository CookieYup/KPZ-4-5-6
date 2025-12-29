import { Request, Response, NextFunction } from 'express';
import { UserService } from '../../service/UserService';
import { UserResponseDTO } from '../../dto/UserResponseDTO';
import { User } from '../../orm/entities/users/User'; // ОБЯЗАТЕЛЬНО ДОБАВЬ ЭТО

export const edit = async (req: Request, res: Response, next: NextFunction) => {
  const id = Number(req.params.id);
  const userService = new UserService();

  const { result, error } = await userService.edit(id, req.body);

  if (error) {
    return next(error);
  }

  const userDTO = new UserResponseDTO(result as User); // Теперь 'User' будет найден
  
  if ((res as any).customSuccess) {
    (res as any).customSuccess(200, 'User updated.', userDTO);
  } else {
    res.status(200).json(userDTO);
  }
};