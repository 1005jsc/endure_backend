import mysql from 'mysql2';
import { config } from '../config.js';

const pool = mysql.createPool({
  host: config.db.host,
  user: config.db.user,
  password: config.db.password,
  database: config.db.database,
});
// createPool에서 제공하는 기능 중비동기버젼을 실행하고 싶으니까 pool의 promise버젼을 사용
export const db = pool.promise();
