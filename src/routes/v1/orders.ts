import { Router } from 'express';
import { OrderController } from '../../controllers/order/order'; // Проверь путь к контроллеру

const router = Router();
const controller = new OrderController();

router.get('/', controller.getAll);
router.post('/', controller.create);
router.get('/:id', controller.getOne);
router.patch('/:id', controller.update);
router.delete('/:id', controller.delete);

export default router;