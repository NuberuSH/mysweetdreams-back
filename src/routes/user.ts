import { Router } from 'express';
import userController from '../controllers/user';
import { validateUser } from '../middlewares/validateUser';


const router: Router = Router();


//USUARIOS
//Login


router.get('/', userController.getAll);
router.get('/:userId', [validateUser], userController.getById);

router.post('/add', userController.add);

router.patch('/:userId', [validateUser], userController.updateById);

router.delete('/:userId', [validateUser], userController.deleteById);

export default router;
