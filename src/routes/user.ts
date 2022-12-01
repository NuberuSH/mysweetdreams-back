import { Router } from 'express';
import userController from '../controllers/user';


const router: Router = Router();


//USUARIOS
//Login


router.get('/', userController.getUsers);
router.get('/:userID', userController.getUserById);

router.post('/add', userController.postUser);
router.post('/authenticate', userController.authenticateUser);

router.patch('/:userID', userController.updateUserById);

router.delete('/:userID', userController.deleteUser);

export default router;
