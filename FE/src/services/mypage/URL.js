import BASE_URL from '../../config';
const API = {
  MYPAGE_GET: `${BASE_URL}/user/mypage/`,
  MYPAGE_PATCH: `${BASE_URL}/user/mypage/modify`,
  MYPAGE_DETAIL_GET: `${BASE_URL}/user/mypage/calendar/`,
  FOLLOWER_GET: `${BASE_URL}/user/mypage/follower/`,
  FOLLOWING_GET: `${BASE_URL}/user/mypage/following/`,
  GOAL_GET: `${BASE_URL}/user/mypage/getGoal/`,
};
export default API;
