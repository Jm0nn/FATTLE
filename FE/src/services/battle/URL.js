import BASE_URL from '../../config';
const API = {
  BATTLE_CREATE_POST: `${BASE_URL}/battle/create`,
  BATTLE_FINISH_GET: `${BASE_URL}/battle/finish/`,
  BATTLE_INFO_GET: `${BASE_URL}/battle/info/`,
  BATTLE_LIST_GET: `${BASE_URL}/battle/list/`,
  BATTLE_MODIFY_PLAYER_PATCH: `${BASE_URL}/battle/player/`,
  BATTLE_DELETE_PLAYER_DELETE: `${BASE_URL}/battle/player/`,
  BATTLE_REGIST_PLAYER_POST: `${BASE_URL}/battle/regist/player`,
  BATTLE_REGIST_TRIGGER_POST: `${BASE_URL}/battle/regist/trigger`,
  BATTLE_SETTING_PATCH: `${BASE_URL}/battle/setting`,
  BATTLE_START_GET: `${BASE_URL}/battle/start/`,
  BATTLE_DELETE_TRIGGER_DELETE: `${BASE_URL}/battle/trigger/`,
  BATTLE_WEIGHT_PATCH: `${BASE_URL}/battle/weight`,

  // 점수관련
  BATTLE_LEFT_LIVE_POINT_GET: `${BASE_URL}/battle/point/`,
  BATTLE_GIVE_POINT_PATCH: `${BASE_URL}/battle/point/give`,
  BATTLE_HISTORY_POINT_GET: `${BASE_URL}/battle/point/history/`,
  BATTLE_LIVE_POINT_BASIC_GET: `${BASE_URL}/battle/point/live-on/`,

  // 식단 관련

  BATTLE_FOOD_COMMENT_LIST_GET: `${BASE_URL}/battle/comment/list/`,
  BATTLE_FOOD_COMMENT_REGIST_POST: `${BASE_URL}/battle/comment/regist`,
  BATTLE_BOARD_LIST_GET: `${BASE_URL}/battle/board/list/`,

  // 배틀 관련아닌것들
  FOOD_TODAY_GET: `${BASE_URL}/food/todays/`,
  USER_INFO_GET: `${BASE_URL}/user/userinfo/`,
};
export default API;
