import * as ClickNumRepository from '../data/clickNum.js';

export const getClickNum = async (req, res, next) => {
  console.log('get click num');
  const currentNum = await ClickNumRepository.getClickNum();
  res.status(200).json(currentNum);
};

export const incrementClickNum = async (req, res, next) => {
  const incrementedNum = await ClickNumRepository.incrementClickNum();
  //   res.status(200).json(incrementedNum);
  res.status(200).json(`클릭 수 올라감. 현재 클릭 수: ${incrementedNum}`);
};
