import * as SetGoalRepository from '../data/setGoal.js';

export const getGoal = async (req, res, next) => {
  let currentGoal = await SetGoalRepository.getGoal();

  console.log(currentGoal);

  res.status(200).json(currentGoal || '');
};

export const setGoal = async (req, res, next) => {
  // console.log(req.body.goal);

  const goalNow = await SetGoalRepository.setGoal(req.body.goal);

  res.status(200).json(`목표 선택하기~~ ${goalNow}`);
};

export const resetClickNum = async (req, res, next) => {
  await ClickNumRepository.resetClickNum();
  res.status(200).json(`리셋 다 됨. 현재 클릭 수: 0`);
};
