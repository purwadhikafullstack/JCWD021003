import { findWarehousesQuery, getShippingCostQuery } from "../queries/warehouseAddress.queries";

//GET
export const findWarehouseAddressService = async (userLat, userLong) => {
  try {
    const toRad = (degrees) => {
      return degrees * Math.PI / 180;
    }

    const calculateDistance = (coords1, coords2) => {
      const earthRadiusKm = 6371;

      const dLat = toRad(coords2.latitude - coords1.latitude);
      const dLon = toRad(coords2.longitude - coords1.longitude);

      const lat1 = toRad(coords1.latitude);
      const lat2 = toRad(coords2.latitude);

      const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return earthRadiusKm * c;
    }

    const warehouseAddresses = await findWarehousesQuery()
    const distances = warehouseAddresses.map((warehouse) => {
      console.log('lat', warehouse.WarehouseAddress.latitude)
      console.log('long', warehouse.WarehouseAddress.longitude)
      const warehouseLat = warehouse.WarehouseAddress.latitude
      const warehouseLong = warehouse.WarehouseAddress.longitude

      const distance = calculateDistance({ latitude: userLat, longitude: userLong },
        { latitude: warehouseLat, longitude: warehouseLong });
      return { warehouse, distance };
    });

    // Find the warehouse with the minimum distance
    const nearestWarehouse = distances.reduce((min, current) => (current.distance < min.distance ? current : min), distances[0]);
    console.log('cityId warehouse', nearestWarehouse.warehouse.WarehouseAddress.dataValues.cityId);

    return nearestWarehouse.warehouse.WarehouseAddress.dataValues.cityId;
  } catch (error) {
    throw error;
  }
};

export const getShippingCostService = async (origin, destination, weight, courier) => {
  try {
    const response = await getShippingCostQuery(origin, destination, weight, courier)
    return response

  } catch (err) {
    throw err
  }
}