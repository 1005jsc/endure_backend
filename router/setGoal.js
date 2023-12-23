import express from 'express';
import 'express-async-errors';

import * as SetGoalController from '../controller/setGoal.js';

const router = express.Router();

// 목표 get
router.get('/', SetGoalController.getGoal);

// 목표 설정하기
router.put('/', SetGoalController.setGoal);

// 목표 완료하기
router.post('/done', SetGoalController.clearGoal);

export default router;
