import { db } from '../db/database.js';
import {
  convertJsDateToMysqlDatetime,
  convertJsDateToMysqlDatetime3,
} from '../util/date/date.js';

// SELECT id, goalName, createdDate,  endureNum FROM goal

export const getGoal = async () => {
  // 가장 최신의 goal이 보이게끔 만들기

  return db
    .execute('SELECT * FROM goal ORDER BY createdDate DESC LIMIT 1;')

    .then((value) => {
      return value[0][0];
    });
};

export const getGoalById = async (id) => {
  // 가장 최신의 goal이 보이게끔 만들기

  return db
    .execute('SELECT * FROM goal WHERE id=?;', [id])

    .then((value) => {
      return value[0][0];
    });
};

// SET goal=? WHERE id=1`, [goal]

// await db.execute(`UPDATE goal SET goal=? WHERE id=1`, [goal]);
// 목표 설정하기
export const setGoal = async ({ id, goalName }) => {
  await db.execute(`UPDATE goal SET goalName=? WHERE id=? LIMIT 1;`, [
    goalName,
    id,
  ]);
  return await db
    .execute('SELECT * FROM goal WHERE id=?', [id])
    .then((value) => value[0][0]);
};

// 다중쿼리 시도하기

// return db
// .execute(
//   `UPDATE clickNum SET clickNum = clickNum + 1 WHERE id = 1;
//    SELECT clickNum FROM clickNum`
// )
// .then((value) => {
//   console.log(value);
//   return 0;
// });

// export const resetClickNum = async () => {
//   return db.execute(`UPDATE clickNum SET clickNum=${0} WHERE id=1`);
// };

// export const clearGoal = async () => {
//   await db.execute(`UPDATE goal SET goal='' WHERE id=1`);
//   const yes = await db
//     .execute('SELECT goal FROM goal')
//     .then((value) => value[0][0]);
//   return yes.goal;
// };

// 목표완료하기, 완료리스트에 추가하기

export const addOneEndureNum = async (id) => {
  return db
    .execute(`UPDATE goal SET endureNum=endureNum+1 WHERE id=?`, [id])
    .then(() =>
      db
        .execute('SELECT id, endureNum FROM goal WHERE id=?', [id])
        .then((value) => value[0][0])
    );
};

export const setDone = async (id, doneDate) => {
  return await db.execute(`UPDATE goal SET doneDate=? WHERE id=?`, [
    doneDate,
    id,
  ]);
};

export const submitNewGoal = async () => {
  // goalName, createdDate, endureNum 받아오기

  await db.execute(
    `INSERT INTO goal (goalName, createdDate,  endureNum) VALUES(?,?,?)`,
    [null, convertJsDateToMysqlDatetime3(), 0]
  );
  const yes = await db.execute('SELECT * FROM goal').then((value) => value[0]);
  return yes;
};

// 목표리스트 get

export const getGoalList = async () => {
  const yes = await db
    .execute('SELECT * FROM goal ORDER BY createdDate DESC')
    .then((value) => value[0]);
  return yes;
};

// 0으로 만들기
export const resetClickNum = async (id) => {
  return db.execute(`UPDATE goal SET endureNum=${0} WHERE id=?`, [id]);
};

// 목표 지우기 by id

export const delGoalById = async (id) => {
  return db.execute('DELETE FROM goal WHERE id=?', [id]);
};
