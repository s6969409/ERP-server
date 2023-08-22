import { NextFunction, Request, Response } from 'express'
import { doResultHandler } from '@middlewares/express_validators'
import { MongoDBBaseService } from './services'
import VarTypes, { IVarType } from '@models/varTypes.model'

const service = new MongoDBBaseService<IVarType>(VarTypes)

/**
 * Return all entities
 * @param req
 * @param res
 * @param next
 */
export async function index(req: Request, res: Response, next: NextFunction): Promise<void> {
  const result = await service.findAll()
  doResultHandler(result, req, res, next)
}

/**
 * Return one instance of entity
 * @param req
 * @param res
 * @param next
 */
export async function show(req: Request, res: Response, next: NextFunction): Promise<void> {
  const { name } = req.params
  const result = await service.findOne(name)
  doResultHandler(result, req, res, next)
}

/**
 * Save an entity
 * @param req
 * @param res
 * @param next
 */
export async function store(req: Request, res: Response, next: NextFunction): Promise<void> {
  const result = await service.store(req.body)
  doResultHandler(result, req, res, next)
}

/**
 * Update an entity
 * @param req
 * @param res
 * @param next
 */
export async function update(req: Request, res: Response, next: NextFunction): Promise<void> {
  const { name } = req.params
  const result = await service.update(name, req.body)
  doResultHandler(result, req, res, next)
}

/**
 * Destroy one instance of an entity
 * @param req
 * @param res
 * @param next
 */
export async function destroy(req: Request, res: Response, next: NextFunction): Promise<void> {
  const { name } = req.params
  const result = await service.destroy(name)
  doResultHandler(result, req, res, next)
}
