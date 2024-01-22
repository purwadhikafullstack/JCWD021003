import {getProductQuery, productCategoryQuery} from '../queries/product.queries'


export const getProductService = async (name, category_Id, id) => {
	try {
	  const res = await getProductQuery(name, category_Id, id)
	  return res
	} catch (err) {
	  throw err
	}
  }

export const productCategoryService = async () => {
	try {
		const res = await productCategoryQuery();
		return res;
	} catch (err) {
		throw err;
	}
};