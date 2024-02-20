import { Router } from 'express'
import { findWarehouseListController, findWarehouseController,  findWarehouseAdminController, findUnassignedAdminController, createWarehouseController,
    editWarehouseController,assignAdminWarehouseController, deleteWarehouseController,findWarehouseListPagiController} from '../controllers/warehouse.controller'

const warehouseRouter = Router()

//GET
warehouseRouter.get('/list', findWarehouseListPagiController)
warehouseRouter.get('/', findWarehouseController)
warehouseRouter.get('/admin/:id', findWarehouseAdminController)
warehouseRouter.get('/unassigned-admin', findUnassignedAdminController)

//POST
warehouseRouter.post('/', createWarehouseController)

//PATCH
warehouseRouter.patch('/:id', editWarehouseController)
warehouseRouter.patch('/assign/:id', assignAdminWarehouseController)

//DELETE
warehouseRouter.delete('/:id', deleteWarehouseController)

export { warehouseRouter }