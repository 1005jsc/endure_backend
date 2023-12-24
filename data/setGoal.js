import { db } from '../db/database.js';

// SELECT id, goalName, date, progress, endureNum FROM goal

export const getGoal = async () => {
  // 가장 최신의 goal이 보이게끔 만들기

  return db
    .execute('SELECT * FROM goal ORDER BY date DESC LIMIT 1;')

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

export const finishGoal = async (goal) => {
  // goalName, date, progress, endureNum 받아오기

  await db.execute(
    `INSERT INTO goal (goalName, date, progress, endureNum) VALUES(?,?,?,?)`,
    [goal?.goalName, goal?.date, goal?.progress, goal?.endureNum]
  );
  const yes = await db.execute('SELECT * FROM goal').then((value) => value[0]);
  return yes;
};

// 목표리스트 get

export const getGoalList = async () => {
  const yes = await db.execute('SELECT * FROM goal').then((value) => value[0]);
  return yes;
};
