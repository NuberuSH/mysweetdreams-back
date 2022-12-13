import { Router } from 'express';
import sleepDataController from '../controllers/sleepData';
import { validateAuthUser } from '../middlewares/validateAuthUser';


const router: Router = Router();


router.get('/day', [validateAuthUser], sleepDataController.getDataByDay);
router.get('/week', sleepDataController.getDataByWeek);
router.get('/week/averageSleepHours', sleepDataController.getAverageWeekSleepHours);
router.get('/month', sleepDataController.getDataByMonth);
router.get('/month/averageSleepHours', sleepDataController.getAverageMonthSleepHours);


router.get('/allData', sleepDataController.getAllUserData);
router.post('/', sleepDataController.add);

export default router;
