import { Request, Response } from 'express';
import { SubCategoryService } from '../services/sub_category_service';

const subCategoryService = new SubCategoryService();

export async function getSubCategoriesByCategoryId(req: Request, res: Response) {
    try {
        const subCategories = await subCategoryService.getSubCategoriesByCategoryId(req.params.category_id as string);
        res.json(subCategories);
    } catch (err) {
        res.status(500).json({ error: (err as Error).message });
    }
}
