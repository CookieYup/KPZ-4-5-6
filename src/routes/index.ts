import { Router } from 'express';
import v1 from './v1/';
import pageRoot from './pages/root';
import page404 from './pages/404';

const router = Router();

// 1. Сначала конкретные API роуты
router.use(`/v1`, v1);

// 2. Потом корень
router.use(pageRoot);

// 3. И только в самом конце — 404
router.use(page404);

export default router;