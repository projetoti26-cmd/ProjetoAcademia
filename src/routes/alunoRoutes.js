//src/routes/alunoRoutes.js
import express from 'express';
import * as alunoController from '../controllers/alunoController.js';
import validate from '../middlewares/validate.js';
import { alunoCreateSchema, alunoUpdateSchema } from '../controllers/alunoController.js';

// // 1. Importa o middleware de login. Descomentar para carregar
import authMiddleware from '../middlewares/authMiddlewares.js';

const router = express.Router();

// A rota de criação de aluno (registro) continua pública
router.post('/', validate (alunoCreateSchema), alunoController.adicionaraluno);// Rota final: POST /api/alunos

//2.Aplica o proteção do login em todas as rotas abaixo desta linha
router.use(authMiddleware);

// O caminho base '/api/alunos' já foi definido no index.js
// Agora definimos apenas as partes relativas: '/', etc.
router.get('/', alunoController.listaralunos); // Rota final: GET /api/alunos

router.put('/:cpf', validate (alunoUpdateSchema) , alunoController.atualizaraluno); // Rota final: PUT /api/alunos/:cpf

router.delete('/:cpf', alunoController.deletaraluno); // Rota final: DELETE /api/alunos/:cpf
export default router;