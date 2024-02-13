import BASE_URL from '../../config.js';

export const API = {
  USER_GET: `${BASE_URL}/user/userinfo/`,
  QUEST_LIST_GET: `${BASE_URL}/quest/list/`,
  RANK_GET: `${BASE_URL}/rank/list/`,
  FOOD_REGIST_POST: `${BASE_URL}/food/regist/`,
  USER_MODIFY_PATCH: `${BASE_URL}/user/userinfo/modify`,
  UPDATE_QUEST_POST: `${BASE_URL}/quest/record/`,
};

export default API;
