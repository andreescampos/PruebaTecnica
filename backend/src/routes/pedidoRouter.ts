import { Router } from 'express'
import { agregarPedido } from 'src/controllers/pedidoController';

const router = Router()

/******************************************************************************
 *                      Obtiene todos los tipos de taza - "GET /api/tipotaza/all"
 ******************************************************************************/
router.post('/', agregarPedido)

export default router;