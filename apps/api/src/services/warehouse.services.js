import { findWarehouseListQuery } from "../queries/warehouse.queries"

export const findWarehouseListService = async () => {
    try {
      const res = await findWarehouseListQuery()
      return res
    } catch (err) {
      throw err
    }
  }