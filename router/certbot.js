import express from 'express';
import 'express-async-errors';

import * as CertbotController from '../controller/certbot.js';

const router = express.Router();

// 목표 get
router.get(
  '/acme-challenge/CoTowq1oDnYV_cvl6Av-vCoDDY0nCSuAUyHUITrz1NI',
  CertbotController.getGoalList
);

export default router;
