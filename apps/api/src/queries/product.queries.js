import Product from '../models/products.model'
import category from '../models/Categories.model';
import { Op } from 'sequelize'

export const getProductQuery = async (
  name = null,
  category_Id = null,
  id = null,
) => {
  try {
    const filter = {}
    if (id)
      filter.where = {
        id: {
          [Op.eq]: id,
        },
      }
    if (name)
      filter.where = {
        name: {
          [Op.like]: `%${name}%`,
        },
      }
      if(category_Id){
        filter.where = {
          id: {
            [Op.eq]: category_Id,
          },
        }
      }
   
    const res = await Product.findAll({
      include: [
        {model: category}
      ],
      order: {...filter,}
    })
    return res
  } catch (err) {
    throw err
  }
}

export const productCategoryQuery = async () => {
  try {
    const res = await category.findAll();

    return res;
  } catch (err) {
    throw err;
  }
};