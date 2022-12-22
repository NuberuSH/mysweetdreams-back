import { Router } from 'express';
import userController from '../controllers/user';
import { validateAuthUser } from '../middlewares/validateAuthUser';


const router: Router = Router();


//USUARIOS
//Login


router.get('/', userController.getAll);
router.get('/myUser', [validateAuthUser], userController.getById);
router.post('/add', userController.add);

router.patch('/myUser', [validateAuthUser], userController.updateById);
router.delete('/myUser', [validateAuthUser], userController.deleteById);
export default router;
