import { getRepository } from 'typeorm';
import { User } from '../orm/entities/users/User'; // УБЕДИСЬ ЧТО ФАЙЛ НАЗЫВАЕТСЯ User.ts
import bcrypt from 'bcryptjs';

export class UserService {
  private get repository() {
    return getRepository(User);
  }

  async create(data: any) {
    try {
      const hashedPassword = await bcrypt.hash(data.password, 10);
      const newUser = this.repository.create({ ...data, password: hashedPassword });
      const result = await this.repository.save(newUser);
      return { result, error: null };
    } catch (e) {
      return { result: null, error: e };
    }
  }

  async list() {
    try {
      const result = await this.repository.find();
      return { result, error: null };
    } catch (e) {
      return { result: null, error: e };
    }
  }

  async show(id: number) {
    try {
      const result = await this.repository.findOne(id);
      return { result, error: null };
    } catch (e) {
      return { result: null, error: e };
    }
  }

  async destroy(id: number) {
    try {
      await this.repository.delete(id);
      return { result: true, error: null };
    } catch (e) {
      return { result: null, error: e };
    }
  }

  async edit(id: number, data: any) {
    try {
      // Если в данных есть пароль, его нужно захешировать
      if (data.password) {
        data.password = await bcrypt.hash(data.password, 10);
      }
      
      await this.repository.update(id, data);
      const result = await this.repository.findOne(id);
      return { result, error: null };
    } catch (e) {
      return { result: null, error: e };
    }
  }
}