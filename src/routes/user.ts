import { Router } from 'express';
import userController from '../controllers/user';


const router: Router = Router();


//USUARIOS
//Login


router.get('/', userController.getAll);
router.get('/:userId', userController.getById);

router.post('/add', userController.add);

router.patch('/:userId', userController.updateById);

router.delete('/:userId', userController.deleteById);

export default router;
