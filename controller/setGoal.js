import * as SetGoalRepository from '../data/setGoal.js';
import * as ClickNumRepository from '../data/clickNum.js';

export const getGoal = async (req, res, next) => {
  let currentGoal = await SetGoalRepository.getGoal();

  res.status(200).json(currentGoal || '');
};

export const setGoal = async (req, res, next) => {
  // console.log(req.body.goal);

  const goalNow = await SetGoalRepository.setGoal(req.body.goal);

  res.status(200).json(`목표 선택하기~~ ${goalNow}`);
};

export const clearGoal = async (req, res, next) => {
  await ClickNumRepository.resetClickNum();
  await SetGoalRepository.clearGoal();
  res.status(200).json(`리셋 성공`);
};
