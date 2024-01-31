import {findWarehouseAddressService,getShippingCostService} from '../services/warehouseAddress.services'

export const findWarehouseAddressController = async (req, res) => {
    try{
        const {userLat, userLong} = req.query
        const result = await findWarehouseAddressService(userLat, userLong)
        return res.status(200).json({
            message: "find nearest warehouse success",
            data: result
        });
    } catch (err){
        return res.status(500).json({
            message: err.message
        });        
    }
}

export const getShippingCostController = async (req, res) => {
    try{
        const {origin, destination, weight, courier} = req.body
        const result = await getShippingCostService(origin, destination, weight, courier)
        return res.status(200).json({
            message: "get cost shipping success",
            data: result
        })
    } catch (err){
        return res.status(500).json({
            message: err.message
        })
    }
}