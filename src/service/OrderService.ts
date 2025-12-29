import { getRepository, Repository } from 'typeorm';
import { Order } from '../orm/entities/order/order';
import { Customer } from '../orm/entities/customer/customer';

export class OrderService {
  

  // 1. Создание заказа (Create)
  async createOrder(address: string, status: string, customerId: number): Promise<Order> {
    const orderRepository = getRepository(Order);
    const customerRepository = getRepository(Customer);

    const customer = await customerRepository.findOne({ where: { id: customerId } });
    if (!customer) {
      throw new Error('Customer not found');
    }

    const newOrder = orderRepository.create({ address, status, customer });
    return await orderRepository.save(newOrder);
  }

  // 2. Получение всех заказов (Read All) с JOIN клиента
  async getAllOrders(): Promise<Order[]> {
    const orderRepository = getRepository(Order);
    return await orderRepository.find({
      relations: ['customer'] 
    });
  }

  // 3. Получение одного заказа по ID (Read One) с JOIN клиента
  async getOrderById(id: number): Promise<Order | null> {
    // Инициализируем репозиторий внутри метода
    const orderRepository = getRepository(Order); 
    
    return await orderRepository.findOne({
      where: { id },
      relations: ['customer']
    });
  }

  // 4. Обновление заказа (Update)
  async updateOrder(id: number, data: Partial<Order>): Promise<Order | null> {
    const orderRepository = getRepository(Order);
    
    await orderRepository.update(id, data);
    // Вызываем getOrderById, передавая id
    return this.getOrderById(id);
  }

  // 5. Удаление заказа (Delete)
  async deleteOrder(id: number): Promise<void> {
    const orderRepository = getRepository(Order);
    await orderRepository.delete(id);
  }
}