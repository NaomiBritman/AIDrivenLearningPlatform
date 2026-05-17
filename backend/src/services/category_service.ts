import { Category, ICategory } from '../models/categories';

export class CategoryService {
    async getAllCategories(): Promise<ICategory[]> {
        return await Category.find().select('-_id -__v').exec();
    }

    async getCategoryById(id: string): Promise<ICategory | null> {
        return await Category.findOne({ id }).select('-_id -__v').exec();
    }
}
