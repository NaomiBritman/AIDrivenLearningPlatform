import { Router } from 'express';
import { getAllCategories } from '../controllers/category_controller';

const router = Router();

router.get('/', getAllCategories);

export default router;
