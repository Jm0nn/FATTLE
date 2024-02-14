import axios from 'axios';
import API from './URL';
const {
  BATTLE_CREATE_POST,
  BATTLE_DELETE,
  BATTLE_DELETE_PLAYER_DELETE,
  BATTLE_DELETE_TRIGGER_DELETE,
  BATTLE_FINISH_GET,
  BATTLE_INFO_GET,
  BATTLE_LIST_GET,
  BATTLE_MODIFY_PLAYER_PATCH,
  BATTLE_REGIST_PLAYER_POST,
  BATTLE_REGIST_TRIGGER_POST,
  BATTLE_SETTING_PATCH,
  BATTLE_START_GET,
  BATTLE_WEIGHT_PATCH,
  BATTLE_FOOD_GET,
  BATTLE_GIVE_POINT_PATCH,
  BATTLE_HISTORY_POINT_GET,
  BATTLE_LEFT_LIVE_POINT_GET,
  BATTLE_LIVE_POINT_BASIC_GET,
  USER_INFO_GET,
  BATTLE_FOOD_COMMENT_LIST_GET,
  FOOD_TODAY_GET,
  BATTLE_FOOD_COMMENT_REGIST_POST,
  BATTLE_BOARD_LIST_GET,
  BATTLE_LIVE_STATUS_START_GET,
  BATTLE_LIVE_STATUS_STOP_GET,
} = API;

export const getBattleInfo = async (battleCode) => {
  const res = await axios.get(BATTLE_INFO_GET + battleCode);
  return res;
};
export const getBattleList = async (userCode) => {
  const res = await axios.get(BATTLE_LIST_GET + userCode);
  return res;
};
export const createBattle = async (userCode) => {
  const { data } = await axios.post(BATTLE_CREATE_POST, { userCode });
  const battleCode = data.code;
  const res = await registTrigger(userCode, battleCode);
  return res;
};
export const deleteBattle = async (battleCode) => {
  const res = await axios.delete(BATTLE_DELETE + battleCode);
  return res;
};
export const registTrigger = async (userCode, battleCode) => {
  const res = await axios.post(BATTLE_REGIST_TRIGGER_POST, {
    userCode,
    battleCode,
  });
  return res;
};
export const deleteTrigger = async (userCode, battleCode) => {
  const res = await axios.delete(
    BATTLE_DELETE_TRIGGER_DELETE + battleCode + '/' + userCode,
    {
      userCode,
      battleCode,
    },
  );
  return res;
};
export const registPlayer = async (
  userCode,
  battleCode,
  weight,
  goalWeight,
) => {
  try {
    await axios.delete(
      BATTLE_DELETE_TRIGGER_DELETE + battleCode + '/' + userCode,
    );
  } catch (error) {
    console.log(error);
  }
  const res = await axios.post(BATTLE_REGIST_PLAYER_POST, {
    battleCode,
    userCode,
    beforeWeight: weight,
    goalWeight,
  });
  return res;
};
export const modifySetting = async (parameter) => {
  const res = await axios.patch(BATTLE_SETTING_PATCH, parameter);
  return res;
};

export const getUserInfo = async (userCode) => {
  const res = await axios.get(USER_INFO_GET + userCode);
  return res;
};

export const startBattle = async (battleCode) => {
  const res = await axios.get(BATTLE_START_GET + battleCode);
  return res;
};

export const finishBattle = async (battleCode) => {
  const res = await axios.get(BATTLE_FINISH_GET + battleCode);
  return res;
};

export const BattleFood = async (battleCode) => {
  const res = await axios.get(BATTLE_FOOD_GET + battleCode);
  return res;
};

export const finishBattleWeight = async (battleCode, userCode, finalweight) => {
  const res = await axios.patch(BATTLE_WEIGHT_PATCH, {
    battleCode,
    userCode,
    finalweight,
  });
};
export const getLeftLivePoint = async (battleCode, userCode) => {
  const res = await axios.get(
    BATTLE_LEFT_LIVE_POINT_GET + battleCode + '/' + userCode,
  );
  return res;
};
export const giveLivePoint = async (parameter) => {
  const res = await axios.patch(BATTLE_GIVE_POINT_PATCH, parameter);
  return res;
};

export const getFoodToday = async (userCode) => {
  const res = await axios.patch(FOOD_TODAY_GET + userCode);
  return res;
};
//배틀 식단 댓글 리스트
export const getBattleFoodCommentList = async (commentCode) => {
  const res = await axios.get(BATTLE_FOOD_COMMENT_LIST_GET + commentCode);

  return res;
};

// 배틀 식단 점수 주기
export const giveFoodPoint = async (parameter) => {
  const res = await axios.patch(BATTLE_GIVE_POINT_PATCH, parameter);
  return res;
};
// 식단 댓글 달기
export const registFoodComment = async (parameter) => {
  const res = await axios.post(BATTLE_FOOD_COMMENT_REGIST_POST, parameter);
  return res;
};
// 배틀 식단 리스트 얻기
export const getBattleBoardList = async (battleCode) => {
  const res = await axios.get(BATTLE_BOARD_LIST_GET + battleCode);
  return res;
};

// 내기자 라이브상태 켜기
export const setStatusLiveOn = async (battleCode, userCode) => {
  const res = await axios.get(
    BATTLE_LIVE_STATUS_START_GET + battleCode + '/' + userCode,
  );
  return res;
};
// 내기자 라이브상태 끄기
export const setStatusLiveOff = async (battleCode, userCode) => {
  const res = await axios.get(
    BATTLE_LIVE_STATUS_STOP_GET + battleCode + '/' + userCode,
  );
  return res;
};
