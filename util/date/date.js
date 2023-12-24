export const convertJsDateToMysqlDatetime = (date) => {
  // date는 이런 형식이여야 됨 2023-12-24T23:09:02.644Z

  if (date) {
    return date.toISOString().slice(0, 19).replace('T', ' ');
  } else {
    return new Date().toISOString().slice(0, 19).replace('T', ' ');
  }
};
