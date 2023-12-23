import express from 'express';
import 'express-async-errors';

import * as SetGoalController from '../controller/setGoal.js';

const router = express.Router();

// 클릭 횟수 get
router.get('/', SetGoalController.getGoal);

// 클릭 횟수 수정
router.put('/', SetGoalController.setGoal);

// 클릭 횟수 리셋
// router.get('/reset', SetGoalController.resetClickNum);

export default router;
