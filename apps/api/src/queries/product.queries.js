import category from '../models/Categories.model';


export const productCategoryQuery = async () => {
    try {
      const res = await category.findAll();
  
      return res;
    } catch (err) {
      throw err;
    }
  };