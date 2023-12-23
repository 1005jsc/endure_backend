import { db } from '../db/database.js';

export const getClickNum = async () => {
  return db
    .execute('SELECT clickNum FROM clickNum')
    .then((value) => value[0][0].clickNum);
};

export const incrementClickNum = async () => {
  return db
    .execute(`UPDATE clickNum SET clickNum=clickNum+1 WHERE id=1`)
    .then(() =>
      db
        .execute('SELECT clickNum FROM clickNum')
        .then((value) => value[0][0].clickNum)
    );
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

export const resetClickNum = async () => {
  return db.execute(`UPDATE clickNum SET clickNum=${0} WHERE id=1`);
};
