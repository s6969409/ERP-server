import { NextFunction, Request, Response } from 'express'
import { doResultHandler } from '@middlewares/express_validators'
import { MongoDBBaseService } from './services'
import VarTypes, { IVarType } from '@models/varTypes.model'

class MongoDBBaseController {
  protected service: any
  constructor(service) { this.service = service }
  /**
   * Return all entities
   * @param req
   * @param res
   * @param next
   */
  index = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const result = await this.service.findAll()
    doResultHandler(result, req, res, next)
  }

  /**
   * Return one instance of entity
   * @param req
   * @param res
   * @param next
   */
  show = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { name } = req.params
    const result = await this.service.findOne(name)
    doResultHandler(result, req, res, next)
  }

  /**
   * Save an entity
   * @param req
   * @param res
   * @param next
   */
  store = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const result = await this.service.store(req.body)
    doResultHandler(result, req, res, next)
  }

  /**
   * Update an entity
   * @param req
   * @param res
   * @param next
   */
  update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { name } = req.params
    const result = await this.service.update(name, req.body)
    doResultHandler(result, req, res, next)
  }

  /**
   * Destroy one instance of an entity
   * @param req
   * @param res
   * @param next
   */
  destroy = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { name } = req.params
    const result = await this.service.destroy(name)
    doResultHandler(result, req, res, next)
  }

}
export const Controller = new MongoDBBaseController(new MongoDBBaseService<IVarType>(VarTypes))
