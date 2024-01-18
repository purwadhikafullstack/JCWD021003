import {productCategoryQuery} from '../queries/product.queries'

export const productCategoryService = async () => {
	try {
		const res = await productCategoryQuery();
		return res;
	} catch (err) {
		throw err;
	}
};