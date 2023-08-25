import { Router } from 'express'
import { Controller } from './vartypes.controller'
import { storeValidators, updateValidators } from './vartypes.validator';
import { validateBody } from '@middlewares/validator';

const router = Router()

router.get('/', Controller.index)
//
router.get('/:name', Controller.show)
//
router.post('/', [...storeValidators, validateBody], Controller.store)
//
router.put('/:name', [...updateValidators, validateBody], Controller.update)
//
router.delete('/:name', Controller.destroy)

export default router
