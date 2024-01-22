import {getProductService, productCategoryService} from '../services/product.services'

export const getProductController = async (req, res) => {
	try {
	  const { name, category_Id} = req.query
	  const { id } = req.params
	  const result = await getProductService(name,category_Id, id)
	  return res.status(200).json({
		message: 'Success',
		data: result,
	  })
	} catch (err) {
	  return res.status(500).json({
		title: 'Failed',
		message: err.message,
	  })
	}
  }

export const productCategoryController = async (req, res) => {
	try {
		const result = await productCategoryService();

		res.status(200).json({
			message: "Get categories Success",
			data: result,
		});
	} catch (err) {
		res.status(500).send(err.message);
	}
};