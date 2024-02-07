import { findWarehouseListService } from "../services/warehouse.services";

export const findWarehouseListController = async (req, res) => {
    try {
      const response = await findWarehouseListService()
      return res.status(200).json({
        message: 'success',
        data: response,
      })
    } catch (err) {
      return res.status(500).json({
        message: err.message,
      })
    }
  }