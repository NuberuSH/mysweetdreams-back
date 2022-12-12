import { Router } from 'express';
import sleepDataController from '../controllers/sleepData';


const router: Router = Router();


router.get('/day', sleepDataController.getDataByDay);
router.get('/week', sleepDataController.getDataByWeek);
router.get('/week/averageSleepHours', sleepDataController.getAverageWeekSleepHours);
router.get('/month', sleepDataController.getDataByMonth);
router.get('/month/averageSleepHours', sleepDataController.getAverageMonthSleepHours);


router.get('/:userId', sleepDataController.getAllUserData);
router.post('/', sleepDataController.add);

export default router;
