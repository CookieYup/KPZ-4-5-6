import { Router } from 'express';
import auth from './auth'; // Импортируем из папки выше
import users from './users'; // Если файл users.ts в этой же папке
import customers from './customers';
import orders from './orders';

const router = Router();

router.use('/auth', auth); // Теперь будет /v1/auth
router.use('/users', users); // Теперь будет /v1/users
router.use('/customers', customers);
router.use('/orders', orders);

export default router;