import { User } from '../orm/entities/users/User';

export class UserResponseDTO {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  language: string;

  constructor(user: User) {
    this.id = user.id;
    this.email = user.email;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.role = user.role;
    this.language = user.language;
  }
}