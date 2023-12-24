import { db } from '../db/database.js';

export const getGoal = async () => {
  return db
    .execute('SELECT id, goalName, date, progress, endureNum FROM goal')
    .then((value) => {
      console.log(value);

      return value[0][0];
    });
};

export const setGoal = async (goal) => {
  await db.execute(`UPDATE goal SET goal=? WHERE id=1`, [goal]);
  const yes = await db
    .execute('SELECT goal FROM goal')
    .then((value) => value[0][0]);
  return yes.goal;
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

export const clearGoal = async () => {
  await db.execute(`UPDATE goal SET goal='' WHERE id=1`);
  const yes = await db
    .execute('SELECT goal FROM goal')
    .then((value) => value[0][0]);
  return yes.goal;
};
