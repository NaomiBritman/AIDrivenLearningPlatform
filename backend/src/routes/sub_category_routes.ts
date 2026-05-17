import { Router } from 'express';
import { getSubCategoriesByCategoryId } from '../controllers/sub_category_controller';

const router = Router();

router.get('/category/:category_id', getSubCategoriesByCategoryId);

export default router;
