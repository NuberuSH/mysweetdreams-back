import { Router } from 'express';
import authController from '../controllers/auth';


const router: Router = Router();

router.post('/', authController.login);
router.post('/logout', authController.logout);

export default router;
