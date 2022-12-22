import { Router } from 'express';
import sleepDataController from '../controllers/sleepData';
import { validateAuthUser } from '../middlewares/validateAuthUser';


const router: Router = Router();


router.get('/day', sleepDataController.getDataByDay);
router.get('/week', sleepDataController.getDataByWeek);
router.get('/month', sleepDataController.getDataByMonth);


router.get('/allData', sleepDataController.getAllUserData);
router.post('/', sleepDataController.add);

export default router;
