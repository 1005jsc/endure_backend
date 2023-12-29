import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';

import setGoalRouter from './router/setGoal.js';
import { config } from './config.js';
import { db } from './db/database.js';

const app = express();

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan('tiny'));

app.use('/goal', setGoalRouter);

app.use((req, res, next) => {
  // console.log(req);
  res.sendStatus(404);
});

app.use((error, req, res, next) => {
  console.error(error);
  res.sendStatus(500);
});

// db에 연결이 되면 console.log에 출력이 되도록 한번 만들어 보자
db.getConnection(); //
// .then(console.log);

const server = app.listen(config.host.port, () => {
  console.log(`서버가 ${config.host.port}로 시작되었습니다`);
});
