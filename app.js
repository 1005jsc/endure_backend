import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';

import setGoalRouter from './router/setGoal.js';
import setCertbotRouter from './router/certbot.js';
import { config } from './config.js';
import { db } from './db/database.js';

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan('tiny'));

app.use('/goal', setGoalRouter);
app.use('/.well-known', setCertbotRouter);

app.get('/', (req, res) => {
  // 적절한 HTML 파일 읽어서 보내기
  console.log();

  // res.sendFile(
  //   '/Users/jaesincho/Desktop/coding/projects/endure/backend/index.html'
  // );

  const indexPath = join(__dirname, 'index.html');
  res.sendFile(indexPath);
});

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
