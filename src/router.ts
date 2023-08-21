import { Router } from 'express'

//#import routers
import vartypes from '@modules/vartypes/vartypes.routes';
import itemtypes from '@modules/itemtypes/itemtypes.routes';
//#endregion
const router = Router()

//importing all routes here
router.get('/', (req, res) => {
    return res.json({ hello: 'Wordl' });
})

router.use('/vartypes', vartypes);
router.use('/itemtypes', itemtypes);

export default router
