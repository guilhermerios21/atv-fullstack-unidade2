import { Router } from 'express';
import taskController from '../controllers/task.controller';
import authMiddleware from '../middlewares/auth.middleware';

const router = Router();

// Todas as rotas de tasks requerem autenticação
router.use(authMiddleware);

// GET /tasks/stats - deve vir antes de /tasks/:id para não conflitar
router.get('/stats', (req, res) => taskController.getStats(req, res));

// POST /tasks - Criar nova tarefa
router.post('/', (req, res) => taskController.create(req, res));

// GET /tasks - Listar todas as tarefas (com filtros opcionais)
router.get('/', (req, res) => taskController.getAll(req, res));

// GET /tasks/:id - Buscar tarefa por ID
router.get('/:id', (req, res) => taskController.getById(req, res));

// PUT /tasks/:id - Atualizar todos os dados de uma tarefa
router.put('/:id', (req, res) => taskController.update(req, res));

// PATCH /tasks/:id - Atualizar parcialmente uma tarefa
router.patch('/:id', (req, res) => taskController.partialUpdate(req, res));

// DELETE /tasks/:id - Deletar uma tarefa
router.delete('/:id', (req, res) => taskController.delete(req, res));

export default router;
