import * as ClickNumRepository from '../data/clickNum.js';

export const getClickNum = async (req, res, next) => {
  let currentNum = await ClickNumRepository.getClickNum();

  // 클릭 수에 따라 메세지가 바뀌는 로직 만들기

  // 0 ~ 100 아직 100번도 못채웠는데 어딜가려고! 자리에 앉아라 재신!
  // 100 ~ 200 이제 100번대라구? 아직 시작단계구만! 얼릉 해라 재신!
  // 200 ~ 300 200번이지만 아직 갈 길은 한참 멀다구! 힘을 내라 재신!
  // 300 ~ 400 300번때이다 지치긴 하겠구만, 뭔가 맛있는거 먹고 해라 재신!
  // 400 ~ 500 400번떄다 끝이 보이는 구먼좀만 더 힘내면 마무리를 지을 수 있다구!

  // 500이 넘어가면 다시 1로 원위치 시킨다

  let message;

  if (currentNum < 501) {
    // 일반 로직

    if (currentNum == 0) {
      message = `자, 참을인 누른횟수가 0번이구먼, 새 출발을 시작하소`;
    } else if (currentNum >= 0 && currentNum < 100) {
      message = `아직 100번도 못채웠는데 어딜가려고! 자리에 앉아라 재신!`;
    } else if (currentNum >= 100 && currentNum < 200) {
      message = `이제 100번대라구? 아직 시작단계구만! 얼릉 해라 재신!`;
    } else if (currentNum >= 200 && currentNum < 300) {
      message = `200번이지만 아직 갈 길은 한참 멀다구! 힘을 내라 재신!`;
    } else if (currentNum >= 300 && currentNum < 400) {
      message = `300번때이다 지치긴 하겠구만, 뭔가 맛있는거 먹고 해라 재신!`;
    } else if (currentNum >= 400 && currentNum < 500) {
      message = `400번떄다 끝이 보이는 구먼좀만 더 힘내면 마무리를 지을 수 있다구!`;
    } else if (currentNum == 500) {
      message = `드디어 500번떄다! 너의 하고자한 일은 마무리 되었는가? 끝났다면 새로운 할 일을 하라구`;
    }
  } else {
    await ClickNumRepository.resetClickNum();
    currentNum = 0;
  }

  const returnValues = {
    currentNum,
    message,
  };

  res.status(200).json(returnValues);
};

export const incrementClickNum = async (req, res, next) => {
  let incrementedNum = await ClickNumRepository.incrementClickNum();

  if (incrementedNum > 500) {
    incrementedNum = 0;
  }

  res.status(200).json(`클릭 수 올라감. 현재 클릭 수: ${incrementedNum}`);
};
