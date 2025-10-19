import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();
const authController = new AuthController();

// Use wrappers to preserve 'this' context of class methods
router.post('/register', (req, res) => authController.register(req, res));
router.post('/login', (req, res) => authController.login(req, res));

// Protected example route
router.get('/protected', authMiddleware, (req, res) => {
	res.status(200).json({
		message: 'Rota protegida acessada com sucesso',
		user: req.user,
	});
});

export default router;