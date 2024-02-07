import { Router } from 'express'
import { findWarehouseListController } from '../controllers/warehouse.controller'

const warehouseRouter = Router()

//GET
warehouseRouter.get('/list', findWarehouseListController)

export { warehouseRouter }