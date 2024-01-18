import {productCategoryService} from '../services/product.services'

export const productCategoryController = async (req, res) => {
	try {
		const result = await productCategoryService();

		res.status(200).json({
			message: "Get product by categories Success",
			data: result,
		});
	} catch (err) {
		res.status(500).send(err.message);
	}
};