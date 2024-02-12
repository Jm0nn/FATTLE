import BASE_URL from '../../config.js';

export const API = {
  KAKAO_GET: `${BASE_URL}/oauth/login/kakao?code=`,
  LOGIN_CALLBACK_GET: `${BASE_URL}/user/login/`,
  LOGIN_GET: `${BASE_URL}/oauth/code/kakao`,
  NICKNAME_GET: `${BASE_URL}/user/nickname/`,
};

export default API;
