import { Request, Response, NextFunction } from 'express';
import { UserService } from '../../service/UserService';
import { UserResponseDTO } from '../../dto/UserResponseDTO';
import { User } from '../../orm/entities/users/User'; 

export const create = async (req: Request, res: Response, next: NextFunction) => {
  const userService = new UserService();
  const { result, error } = await userService.create(req.body);

  if (error) return next(error);

  // Передаем result (который и есть User) в DTO
  const userDTO = new UserResponseDTO(result as User); 
  
  // Если у тебя используется res.customSuccess:
  (res as any).customSuccess(201, 'User successfully created.', userDTO);
};