import * as SetGoalRepository from '../data/setGoal.js';

// 목표 get (완료)
export const getGoal = async (req, res, next) => {
  let currentGoal = await SetGoalRepository.getGoal();

  res.status(200).json(currentGoal || {});
};

// 목표 설정하기

export const setGoal = async (req, res, next) => {
  // const goalNow = await SetGoalRepository.setGoal(req.body.goal);

  res.status(200).json(`목표 선택하기~~ ${goalNow}`);
};

// 참을인 횟수 올리기
export const addOneNum = async (req, res, next) => {
  res.status(200).json(`목표 선택하기~~ `);
};
// 목표 완료리스트에 추가하기
export const finishGoal = async (req, res, next) => {
  const goalNow = await SetGoalRepository.finishGoal(req.body);

  res.status(200).json(goalNow);
};

// 목표리스트 get(완료)
export const getGoalList = async (req, res, next) => {
  const currentGoalList = await SetGoalRepository.getGoalList();

  res.status(200).json(currentGoalList);
};
