import { Request, Response, NextFunction } from 'express';
import { OrderService } from '../../service/OrderService';

export class OrderController {
  private orderService: OrderService;

  constructor() {
    this.orderService = new OrderService();
  }

  /**
   * Создание нового заказа
   * POST /api/orders
   */
  public create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { address, status, customerId } = req.body;
    if (!address || !status || !customerId) {
      // ОБЯЗАТЕЛЬНО добавить return
      return res.status(400).json({ message: 'Missing fields' });
    }
    const order = await this.orderService.createOrder(address, status, customerId);
    return res.status(201).json(order); // Добавить return
  } catch (error) {
    return next(error); // Добавить return
  }
};

  /**
   * Получение всех заказов (с информацией о клиенте через JOIN)
   * GET /api/orders
   */
  public getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const orders = await this.orderService.getAllOrders();
      res.json(orders);
    } catch (error) {
      next(error);
    }
  };

  /**
   * Получение одного заказа по ID
   * GET /api/orders/:id
   */
  // Пример исправленной логики (найдите эти места в вашем файле)
public getOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id);
    const order = await this.orderService.getOrderById(id);
    
    if (!order) {
       // Важно: возвращаем res, чтобы функция завершилась
       return res.status(404).json({ message: 'Order not found' });
    }
    
    return res.json(order); // Добавьте return перед отправкой финального ответа
  } catch (error) {
    return next(error); // Добавьте return здесь
  }
};

  /**
   * Обновление данных заказа
   * PATCH /api/orders/:id
   */
  public update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id);
      const updateData = req.body;

      const updatedOrder = await this.orderService.updateOrder(id, updateData);
      
      if (!updatedOrder) {
        // Здесь return уже есть, это правильно
        return res.status(404).json({ message: 'Order not found for update' });
      }

      // ДОБАВЛЕНО: return перед отправкой успешного ответа
      return res.json(updatedOrder);
    } catch (error) {
      // ДОБАВЛЕНО: return перед отправкой ошибки
      return res.status(400).json({ message: error.message });
    }
  };

  /**
   * Удаление заказа
   * DELETE /api/orders/:id
   */
  public delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id);
      await this.orderService.deleteOrder(id);
      res.status(204).send(); // 204 No Content - успешное удаление без тела ответа
    } catch (error) {
      next(error);
    }
  };
}