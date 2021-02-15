import { Router } from 'express'
import { agregarPedido, obtenerPedidoFromID, obtenerPedidos } from 'src/controllers/pedidoController';

const router = Router()

/******************************************************************************
 *                      Obtiene todos los tipos de taza - "GET /api/tipotaza/all"
 ******************************************************************************/
router.post('/', agregarPedido)
router.get('/', obtenerPedidos)
router.get('/:id', obtenerPedidoFromID)

export default router;