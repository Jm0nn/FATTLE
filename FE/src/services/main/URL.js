import BASE_URL from '../../config.js';

export const API = {
  USER_GET: `${BASE_URL}/user/userinfo/`,
  QUEST_LISt_GET: `${BASE_URL}/quest/list/`,
  RANK_GET: `${BASE_URL}/rank/list/`,
  FOOD_REGIST_POST: `${BASE_URL}/food/regist/`,
};

export default API;
