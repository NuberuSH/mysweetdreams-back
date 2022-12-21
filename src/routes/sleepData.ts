import { Router } from 'express';
import sleepDataController from '../controllers/sleepData';
import { validateAuthUser } from '../middlewares/validateAuthUser';


const router: Router = Router();


router.post('/day', sleepDataController.getDataByDay);
router.post('/week', sleepDataController.getDataByWeek);
router.get('/week/averageSleepHours', sleepDataController.getAverageWeekSleepHours);
router.post('/month', sleepDataController.getDataByMonth);
router.get('/month/averageSleepHours', sleepDataController.getAverageMonthSleepHours);


router.get('/allData', sleepDataController.getAllUserData);
router.post('/', sleepDataController.add);

export default router;
