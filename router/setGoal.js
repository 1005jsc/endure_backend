import express from 'express';
import 'express-async-errors';

import * as SetGoalController from '../controller/setGoal.js';

const router = express.Router();

// 목표 get
router.get('/', SetGoalController.getGoal);

// 목표 설정하기
router.patch('/name', SetGoalController.setGoal);

// 참을인 횟수 올리기
router.put('/endureNum', SetGoalController.addOneNum);

// 목표 완료하기
router.post('/done', SetGoalController.finishGoal);

// 완료리스트 get
router.get('/list', SetGoalController.getGoalList);

// 완료 리스트에 넣기

export default router;
