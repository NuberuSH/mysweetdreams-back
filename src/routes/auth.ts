import { Router } from 'express';
import authController from '../controllers/auth';


const router: Router = Router();

router.post('/', authController.login);
router.delete('logout', authController.logout);

export default router;
