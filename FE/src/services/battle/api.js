import axios from 'axios';
import API from './URL';
const {
  BATTLE_CREATE_POST,
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
} = API;

export const getBattleInfo = async (battleCode) => {
  const res = await axios.get(BATTLE_INFO_GET + battleCode);
  return res;
};
export const createBattle = async (userCode) => {
  const res = await axios.post(BATTLE_CREATE_POST, { userCode });
  return res;
};
export const modifySetting = async (parameter) => {
  const res = await axios.patch(BATTLE_SETTING_PATCH, parameter);
  return res;
};
