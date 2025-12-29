import { Request, Response, NextFunction } from 'express';
import { CustomerService } from '../../service/CustomerService';
import { CustomerResponseDTO } from '../../dto/CustomerResponseDTO';

export class CustomerController {
  private customerService = new CustomerService();

  // Метод для создания (Лабораторная №6)
  public createCustomer = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const customerEntity = await this.customerService.create(req.body);
      return res.status(201).json(new CustomerResponseDTO(customerEntity));
    } catch (err) {
      return next(err);
    }
  };

  // Метод для получения всех
  public getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const customers = await this.customerService.findAll();
      const response = customers.map((c) => new CustomerResponseDTO(c));
      return res.json(response);
    } catch (error) {
      return next(error);
    }
  };

  // Метод для получения одного
  public getOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id);
      const customer = await this.customerService.findOne(id);

      if (!customer) {
        return res.status(404).json({ message: 'Customer not found' });
      }

      return res.json(new CustomerResponseDTO(customer));
    } catch (error) {
      return next(error);
    }
  };

  // Метод для удаления
  public delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id);
      await this.customerService.delete(id);
      return res.status(204).send();
    } catch (error) {
      return next(error);
    }
  };
}