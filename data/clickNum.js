let clickNum = 0;

export const getClickNum = async () => clickNum;

export const incrementClickNum = async () => {
  clickNum += 1;
  return clickNum;
};

export const resetClickNum = async () => {
  clickNum = 0;
  return clickNum;
};
