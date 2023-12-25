import express from 'express';
import 'express-async-errors';

import * as SetGoalController from '../controller/setGoal.js';

const router = express.Router();

// 목표 get
router.get('/', SetGoalController.getGoal);

// 목표 설정하기
router.patch('/name', SetGoalController.setGoal);

// 참을인 횟수 올리기
router.patch('/endureNum', SetGoalController.addOneNum);

// 목표 완료하고 추가하기
router.post('/done', SetGoalController.finishGoal);

// 완료리스트 get
router.get('/list', SetGoalController.getGoalList);

// 목표 삭제하기
router.delete('/delete', SetGoalController.delGoal);

export default router;
