import * as SetGoalRepository from '../data/setGoal.js';

// 목표 get (완료)
export const getGoal = async (req, res, next) => {
  let currentGoal = await SetGoalRepository.getGoal();

  res.status(200).json(currentGoal || {});
};

// 목표 설정하기

export const setGoal = async (req, res, next) => {
  if (!req.body.id || !req.body?.goalName) {
    res
      .status(400)
      .json(`목표 설정하기 실패: request로 보내는 값의 양식을 확인하시오`);
    return;
  }

  const currentGoalList = await SetGoalRepository.getGoalList();

  if (
    currentGoalList
      .filter((value) => value.id !== req.body?.id)
      .find((value) => value.goalName == req.body?.goalName)
  ) {
    if (currentGoalList.find((value) => value.id === req.body?.id)) {
      res.status(400).json(`목표 설정하기 실패: 같은 이름의 목표가 이미 있음`);
    } else {
      res.status(400).json(`목표 설정하기 실패: 존재하지 않는 id임`);
    }
  } else {
    const goalNow = await SetGoalRepository.setGoal(req.body);
    res.status(200).json(`목표 설정하기 성공: ${goalNow?.goalName}`);
  }
  return;
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
