import express from 'express';
import 'express-async-errors';

import * as SetGoalController from '../controller/setGoal.js';

const router = express.Router();

// 목표 get
router.get('/', SetGoalController.getGoal);

// 목표 설정하기
router.put('/name', SetGoalController.setGoal);

// 참을인 횟수 올리기
router.put('/endureNum', SetGoalController.addOneNum);

// 목표 완료하기
router.post('/done', SetGoalController.finishGoal);

// 목표리스트 get
router.get('/list', SetGoalController.getGoalList);

export default router;
