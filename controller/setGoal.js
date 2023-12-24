import * as SetGoalRepository from '../data/setGoal.js';

// 목표 get
export const getGoal = async (req, res, next) => {
  let currentGoal = await SetGoalRepository.getGoal();

  res.status(200).json(currentGoal || '');
};

// 목표 설정하기

export const setGoal = async (req, res, next) => {
  const goalNow = await SetGoalRepository.setGoal(req.body.goal);

  res.status(200).json(`목표 선택하기~~ ${goalNow}`);
};

// 참을인 횟수 올리기
export const addOneNum = async (req, res, next) => {
  res.status(200).json(`목표 선택하기~~ ${goalNow}`);
};
// 목표 완료하기
export const finishGoal = async (req, res, next) => {
  res.status(200).json(`목표 선택하기~~ ${goalNow}`);
};
// 목표리스트 get
export const getGoalList = async (req, res, next) => {
  res.status(200).json(`목표 선택하기~~ ${goalNow}`);
};
