import { Request, Response } from 'express';
import { CategoryService } from '../services/category_service';

const categoryService = new CategoryService();

export async function getAllCategories(req: Request, res: Response) {
    try {
        const categories = await categoryService.getAllCategories();
        res.json(categories);
    } catch (err) {
        res.status(500).json({ error: (err as Error).message });
    }
}
