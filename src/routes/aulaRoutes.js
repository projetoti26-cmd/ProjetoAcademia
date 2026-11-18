import express from 'express';
import * as aulaController from '../controllers/aulaController.js';
import validate from '../middleware/validate.js';
import { aulaCreateSchema, aulaUpdateSchema } from '../controllers/aulaController.js';


import { verificarToken } from '../middleware/authMiddleware.js';

const router = express.Router();


router.post('/', validate (aulaCreateSchema), aulaController.adicionarAula);


router.use(verificarToken);


router.get('/', aulaController.listarAula);

router.put('/:idAula', validate (aulaUpdateSchema), aulaController.atualizarAula);

router.delete('/:idAula', aulaController.deletarAula);
export default router;