import { Router } from 'express';
import UserRouter from './Users';
import TipoTazaRouter from "./tipoTazaRouter";
import TazaRouter from "./tazaRouter";

// Init router and path
const router = Router();

// Add sub-routes
router.use('/users', UserRouter);
router.use('/tipotaza', TipoTazaRouter)
router.use('/taza', TazaRouter)

// Export the base-router
export default router;
