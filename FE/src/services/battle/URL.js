import BASE_URL from '../../config';
const API = {
  BATTLE_CREATE_POST: `${BASE_URL}/battle/create`,
  BATTLE_DELETE: `${BASE_URL}/battle/`,
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
  BATTLE_FOOD_GET: `${BASE_URL}/battle/board/list/`,

  USER_INFO_GET: `${BASE_URL}/user/userinfo/`,
};
export default API;
