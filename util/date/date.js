// 2023-12-24T14:25:31.000Z 이걸 2023-12-12 이런 식으로 바꾸기

function leftPad(value) {
  if (value >= 10) {
    return value;
  }

  return `0${value}`;
}

export function toStringByFormatting(source, delimiter = '-') {
  if (typeof source !== 'object' || !source) {
    return undefined;
  }

  const year = source.getFullYear();
  const month = leftPad(source.getMonth() + 1);
  const day = leftPad(source.getDate());

  return [year, month, day].join(delimiter);
}

/*

    MYSQL 관련

*/

// 자바스크립트 Date 객체 -> MYSQL DATETIME(3)
// 2023-12-24T23:09:02.644Z -> '2023-12-24 23:09:02.123'

export function convertJsDateToMysqlDatetime3(date = new Date()) {
  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  const hours = ('0' + date.getHours()).slice(-2);
  const minutes = ('0' + date.getMinutes()).slice(-2);
  const seconds = ('0' + date.getSeconds()).slice(-2);
  const milliseconds = ('00' + date.getMilliseconds()).slice(-3);

  const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;

  return formattedDate;
}

// 자바스크립트 Date 객체 -> MYSQL DATETIME
// 2023-12-24T23:09:02.644Z -> '2023-12-24 23:09:02'

export const convertJsDateToMysqlDatetime = (date) => {
  if (date) {
    return date.toISOString().slice(0, 19).replace('T', ' ');
  } else {
    return new Date().toISOString().slice(0, 19).replace('T', ' ');
  }
};
