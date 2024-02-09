import Warehouse from '../models/warehouse.model'
import WarehouseAddress from '../models/warehouseAddress.model'
import City from '../models/city.model'
import Province from '../models/province.model'

export const findWarehouseListQuery = async () => {
    try {
      const res = await Warehouse.findAll(
        {include: [
        {
          model: WarehouseAddress,
          include: [
            {
              model: City,
              include: [{ model: Province }],
            },
          ],
        },
      ]})  
     
      return res
    } catch (err) {
      throw err
    }
  }

  export const findWarehouseQuery = async (name) => {
    try {
      const search = {
        where: {
          name: {
            [Op.like]: `%${name}%`,
          },
        },
      }
      const res = await Warehouse.findAll(search)
      return res
    } catch (err) {
      throw err
    }
  }

  export const findWarehouseAdminQuery = async (warehouseId) => {
    try {
      const res = await User.findAll({
        where: { warehouseId: warehouseId },
      })
      return res
    } catch (err) {
      throw err
    }
  }
  
  export const findUnassignedAdminQuery = async () => {
    try {
      const res = await User.findAll({
        where: {
          warehouseId: null,
          roleId: 2,
        },
      })
      return res
    } catch (err) {
      throw err
    }
  }

  //POST
export const createWarehouseQuery = async (warehouseAddressId, name) => {
    try {
      const warehouse = await Warehouse.create({
        warehouseAddressId,
        name,
      })
      return warehouse
    } catch (err) {
      throw err
    }
  }
  
  export const createWarehouseAddressQuery = async (
    location,
    cityId,
    postalCode,
    latitude,
    longitude,
  ) => {
    try {
      const warehouseAddress = await WarehouseAddress.create({
        location,
        cityId,
        postalCode,
        latitude,
        longitude,
      })
      return warehouseAddress
    } catch (err) {
      throw err
    }
  }

  //PATCH

export const editWarehouseQuery = async (id, name, location, cityId, postalCode, latitude, longitude ) => {
    try {
      const warehouse = await Warehouse.findByPk(id)
      if (warehouse) {
        await warehouse.update({ name });

        await WarehouseAddress.update(
          { 
            location, 
            cityId, 
            postalCode, 
            latitude, 
            longitude 
          },
          { 
            where: { id: warehouse.warehouseAddressId } 
          }
        );
      } else {
        throw new Error('Warehouse not found');
      }
    } catch (err) {
      throw err
    }
  }
  
  export const assignAdminWarehouseQuery = async (adminIds, warehouseId) => {
    try {
      await User.update(
        { warehouseId: warehouseId },
        {
          where: {
            id: {
              [Op.in]: adminIds, 
            },
          },
        },
      );
    } catch (err) {
      throw err;
    }
  };
  
  
  //DELETE
  export const deleteWarehouseQuery = async (id) => {
    try {
      await Warehouse.destroy({
        where: {
          id: id,
        },
      })
    } catch (err) {
      throw err
    }
  }