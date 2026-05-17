import { Router } from 'express';
import { createPrompt, getPromptsByUserId, getAllPromptsWithUsers } from '../controllers/prompt_controller';
import { authenticateToken } from '../Middleware/AuthenticationMid';
import { roleMiddleware } from '../Middleware/AuthorizationMid';

const router = Router();

router.post('/', authenticateToken, createPrompt);
router.get('/user/:user_id', authenticateToken, getPromptsByUserId);
router.get('/all', authenticateToken, roleMiddleware(['Admin']), getAllPromptsWithUsers);

export default router;
