import * as SetGoalRepository from '../data/setGoal.js';

// 목표 get (완료)
export const getGoal = async (req, res, next) => {
  let currentGoal = await SetGoalRepository.getGoal();

  // 클릭 수에 따라 메세지가 바뀌는 로직 만들기

  // 0 ~ 100 아직 100번도 못채웠는데 어딜가려고! 자리에 앉아라 재신!
  // 100 ~ 200 이제 100번대라구? 아직 시작단계구만! 얼릉 해라 재신!
  // 200 ~ 300 200번이지만 아직 갈 길은 한참 멀다구! 힘을 내라 재신!
  // 300 ~ 400 300번때이다 지치긴 하겠구만, 뭔가 맛있는거 먹고 해라 재신!
  // 400 ~ 500 400번떄다 끝이 보이는 구먼좀만 더 힘내면 마무리를 지을 수 있다구!

  // 500이 넘어가면 다시 1로 원위치 시킨다

  let message;

  if (currentGoal.endureNum < 501) {
    // 일반 로직

    if (currentGoal.endureNum == 0) {
      message = `자, 참을인 누른횟수가 0번이구먼, 새 출발을 시작하소`;
    } else if (currentGoal.endureNum >= 0 && currentGoal.endureNum < 100) {
      message = `아직 100번도 못채웠는데 어딜가려고! 자리에 앉아라 재신!`;
    } else if (currentGoal.endureNum >= 100 && currentGoal.endureNum < 200) {
      message = `이제 100번대라구? 아직 시작단계구만! 얼릉 해라 재신!`;
    } else if (currentGoal.endureNum >= 200 && currentGoal.endureNum < 300) {
      message = `200번이지만 아직 갈 길은 한참 멀다구! 힘을 내라 재신!`;
    } else if (currentGoal.endureNum >= 300 && currentGoal.endureNum < 400) {
      message = `300번때이다 지치긴 하겠구만, 뭔가 맛있는거 먹고 해라 재신!`;
    } else if (currentGoal.endureNum >= 400 && currentGoal.endureNum < 500) {
      message = `400번떄다 끝이 보이는 구먼좀만 더 힘내면 마무리를 지을 수 있다구!`;
    } else if (currentGoal.endureNum == 500) {
      message = `드디어 500번떄다! 너의 하고자한 일은 마무리 되었는가? 끝났다면 새로운 할 일을 하라구`;
    }
  } else {
    message = `자, 참을인 누른횟수가 0번이구먼, 새 출발을 시작하소`;
  }

  res.status(200).json({
    currentGoal,
    message,
  });
};

// 목표 설정하기 (완료)

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

// 참을인 횟수 올리기(완료)
export const addOneNum = async (req, res, next) => {
  if (!req.body.id) {
    res.status(400).json(`목표 설정하기 실패: id가 없음`);
    return;
  }
  const currentGoalList = await SetGoalRepository.getGoalList();
  if (currentGoalList.find((value) => value.id === req.body.id).done !== 0) {
    res.status(400).json(`이미 완료된 id입니다`);
    return;
  }

  const currentEndureNum = await SetGoalRepository.getGoalById(req.body.id);

  // 500이상일 경우에는 0으로 돌려보내기

  if (currentEndureNum.endureNum >= 500) {
    await SetGoalRepository.resetClickNum(req.body.id);
    res.status(200).json({ message: '500이 넘어가서 리셋함' });
  } else {
    await SetGoalRepository.addOneEndureNum(req.body.id);
    res.status(200).json({ message: '추가 완료' });
  }

  return;
};

// 목표 완료리스트에 추가하기 (완료)
export const finishGoal = async (req, res, next) => {
  if (!req.body.id || !req.body?.doneDate) {
    res.status(400).json(`request로 보내는 값의 양식을 확인하시오`);
    return;
  }

  const currentGoalList = await SetGoalRepository.getGoalList();
  if (!currentGoalList.map((value) => value.id).includes(req.body?.id)) {
    res.status(400).json(`존재하지 않는 id입니다`);
    return;
  }

  if (currentGoalList.find((value) => value.id === req.body.id).done !== 0) {
    res.status(400).json(`id ${req.body.id}는 이미 완료된 목표입니다`);
    return;
  }

  await SetGoalRepository.setDone(req.body?.id, req.body?.doneDate);

  await SetGoalRepository.submitNewGoal(req.body);

  res.status(200).json(`목표 완료!, 그리고 새 목표 생성 `);
};

// 목표리스트 get(완료)
export const getGoalList = async (req, res, next) => {
  const currentGoalList = await SetGoalRepository.getGoalList();

  res.status(200).json(currentGoalList);
};

// 목표 지우기
export const delGoal = async (req, res, next) => {
  // id가 안 온 경우

  if (!req.body.id) {
    res.status(400).json(`목표 설정하기 실패: id가 없음`);
    return;
  }

  // id가 존재하지 않는 경우

  const currentGoalList = await SetGoalRepository.getGoalList();
  if (!currentGoalList.map((value) => value.id).includes(req.body?.id)) {
    res.status(400).json(`존재하지 않는 id입니다`);
    return;
  }

  await SetGoalRepository.delGoalById(req.body?.id);

  res.status(200).json({ message: `목표 삭제 완료` });
};
