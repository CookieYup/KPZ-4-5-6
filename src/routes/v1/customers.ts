import { Router } from 'express';
import { CustomerController } from '../../controllers/customer/customer'; 
// Исправлен путь импорта (добавлен относительный путь)
import { validatorCreateCustomer } from '../../middleware/validation/customer/validatorCreateCustomer';

const router = Router();
const controller = new CustomerController();

// 1. Создание клиента с валидацией (по Лабе №6)
// Используем только метод createCustomer, так как он вызывает Service и DTO
router.post('/', validatorCreateCustomer, controller.createCustomer);

// 2. Получение списка всех клиентов
router.get('/', controller.getAll);

// 3. Получение одного клиента по ID
router.get('/:id', controller.getOne);

// 4. Удаление клиента
router.delete('/:id', controller.delete);

export default router;