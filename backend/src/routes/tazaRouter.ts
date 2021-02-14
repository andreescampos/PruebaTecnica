import { Router } from 'express'
import { agregarTaza, obtenerTazas } from 'src/controllers/tazaController';

const router = Router()

/******************************************************************************
 *                      Obtiene todos los tipos de taza - "GET /api/tipotaza/all"
 ******************************************************************************/
router.post('/', agregarTaza)
router.get('/all', obtenerTazas )

export default router;