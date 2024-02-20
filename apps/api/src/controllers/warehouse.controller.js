import { findWarehouseListService,findWarehouseService, findWarehouseAdminService, findUnassignedAdminService, createWarehouseService,
    assignAdminWarehouseService, editWarehouseService, deleteWarehouseService,findWarehouseListPagiService} from "../services/warehouse.services";

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

  export const findWarehouseListPagiController = async (req, res) => {
    try {
      const { page, pageSize } = req.query
      const response = await findWarehouseListPagiService(page, pageSize)
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

  export const findWarehouseController = async (req, res) => {
    try {
      const { name } = req.query
      const response = await findWarehouseService(name)
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

  export const findWarehouseAdminController = async (req, res) => {
    try {
      const { id } = req.params
      const response = await findWarehouseAdminService(id)
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
  
  export const findUnassignedAdminController = async (req, res) => {
    try {
      const response = await findUnassignedAdminService()
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

  export const createWarehouseController = async (req, res) => {
    try {
      const { location, cityId, postalCode, latitude, longitude, name } = req.body
      const response = await createWarehouseService(
        location,
        cityId,
        postalCode,
        latitude,
        longitude,
        name,
      )
      return res.status(200).json({
        message: 'success',
        data: response,
      })
    } catch (err) {
      return res.status(500).json({
        message: err.nessage,
      })
    }
  }

  export const assignAdminWarehouseController = async (req, res) => {
    try {
      const { id } = req.params;
      const { adminIds } = req.body;
      console.log("admin id", adminIds, 'warehouseIds', id);
      await assignAdminWarehouseService(adminIds, id);
      return res.status(200).json({
        message: 'success',
      });
    } catch (err) {
      return res.status(500).json({
        message: err.message,
      });
    }
  };
  
  export const editWarehouseController = async (req, res) => {
    try {
      const { id } = req.params
      const { name, location, cityId, postalCode, lat, lng } = req.body
      await editWarehouseService(id, name, location, cityId, postalCode, lat, lng )
      return res.status(200).json({
        message: 'success',
      })
    } catch (err) {
      return res.status(500).json({
        message: err.message,
      })
    }
  }
  
  export const deleteWarehouseController = async (req, res) => {
    try {
      const { id } = req.params
      await deleteWarehouseService(id)
      return res.status(200).json({
        message: 'success',
      })
    } catch (err) {
      res.status(500).json({
        message: err.result,
      })
    }
  }