import { Router } from 'express';
import { createUser, getAllUsers, getUserById, signIn } from '../controllers/user_controller';
import { authenticateToken } from '../Middleware/AuthenticationMid';

const router = Router();

router.post('/', createUser);
router.post('/signin/:id', signIn);
router.get('/', authenticateToken, getAllUsers);
router.get('/:id', authenticateToken, getUserById);

export default router;
