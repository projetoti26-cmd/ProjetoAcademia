import express from 'express';
import * as alunoController from '../controllers/alunoController.js';
import validate from '../middleware/validate.js';
import { alunoCreateSchema, alunoUpdateSchema } from '../controllers/alunoController.js';


import { verificarToken } from '../middleware/authMiddleware.js';

const router = express.Router();


router.post('/', validate(alunoCreateSchema),alunoController.adicionarAluno);


router.get('/', alunoController.listarAluno);
router.use(verificarToken);

router.put('/:idAluno',validate (alunoUpdateSchema), alunoController.atualizarAluno);

router.delete('/:idAluno', alunoController.deletarAluno);
export default router;
