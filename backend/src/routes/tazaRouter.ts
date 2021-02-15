import { Router } from 'express'
import { agregarTaza, ingresarTazas, obtenerTazas } from 'src/controllers/tazaController';

const router = Router()

/******************************************************************************
 *                      Obtiene todos los tipos de taza - "GET /api/tipotaza/all"
 ******************************************************************************/
router.post('/', agregarTaza)
router.post('/ingreso', ingresarTazas )
router.get('/all', obtenerTazas )

export default router;