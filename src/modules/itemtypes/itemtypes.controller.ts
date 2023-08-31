import ItemTypes, { IItemType } from '@models/itemTypes.model'
import { MongoDBBaseController } from '@modules/vartypes/vartypes.controller'
import { MongoDBBaseService } from '@modules/vartypes/services'

export const Controller = new MongoDBBaseController(new MongoDBBaseService<IItemType>(ItemTypes))