import express from 'express';
import 'express-async-errors';

import * as ClickNumController from '../controller/clickNum.js';

const router = express.Router();

// 클릭 횟수 get
router.get('/', ClickNumController.getClickNum);

// 클릭 횟수 수정
router.put('/', ClickNumController.incrementClickNum);

export default router;
