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