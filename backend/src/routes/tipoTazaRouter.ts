import { Router } from 'express'
import { getTipoTaza } from 'src/controllers/tipoTazaController';

const router = Router()

/******************************************************************************
 *                      Obtiene todos los tipos de taza - "GET /api/tipotaza/all"
 ******************************************************************************/
router.get('/all', getTipoTaza)

export default router;