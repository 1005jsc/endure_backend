let clickNum = 0;

export const getClickNum = async () => clickNum;

export const incrementClickNum = async () => {
  clickNum += 1;
  return clickNum;
};
