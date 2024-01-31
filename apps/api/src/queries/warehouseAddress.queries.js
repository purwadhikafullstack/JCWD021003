import Province from '../models/province.model'
import City from '../models/city.model'
import WarehouseAddress from '../models/warehouseAddress.model'
import Warehouse from '../models/warehouse.model';
import axios from 'axios';

//GET
export const findWarehouseProvinceQuery = async (provinceId) => {
    try {
        return await Warehouse.findAll({
            include: [{
                model: WarehouseAddress,
                include: [{
                    model: City,
                    include: [{
                        model: Province,
                        where: { id: provinceId }
                    }]
                }]
            }]
        });
    } catch (err) {
        throw err;
    }
};

export const findWarehousesQuery = async () => {
    try{
        const warehouses = await Warehouse.findAll({
            include: [{
                model: WarehouseAddress
            }]
        });
        const warehousesWithCoordinates = warehouses.map(warehouse => {
            const warehouseAddress = warehouse.WarehouseAddress;
            const latitude = warehouseAddress.latitude; 
            const longitude = warehouseAddress.longitude; 

            return {
                ...warehouse.dataValues, 
                latitude,
                longitude,
            };
        });

        return warehousesWithCoordinates;
    } catch (err){
        throw err
    }
}

export const getShippingCostQuery = async (origin, destination, weight, courier) => {
    try {
        const API_KEY = process.env.RAJAONGKIR_API_KEY
        const BASE_URL = process.env.RAJAONGKIR_BASE_URL
        const response = await axios.post(BASE_URL, {
            origin,
            destination,
            weight,
            courier
        }, {
            headers: {
                key: API_KEY
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}