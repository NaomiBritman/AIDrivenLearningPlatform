
import { SubCategory, ISubCategory } from '../models/sub_categories';

export class SubCategoryService {
    async getSubCategoriesByCategoryId(category_id: string): Promise<ISubCategory[]> {
        return await SubCategory.find({ category_id }).select('-_id -__v').exec();
    }
}
