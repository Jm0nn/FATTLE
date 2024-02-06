import axios from 'axios';
import API from './URL';
const {
  MYPAGE_GET,
  MYAPGE_PATCH,
  FOLLOWER_GET,
  FOLLOWING_GET,
  GOAL_GET,
  MYPAGE_DETAIL_GET,
} = API;

const getMypage = async (userCode) => {
  const { data, status } = await axios(MYPAGE_GET + userCode);
  return { data, status };
};
const patchMypage = async (userCode, parameter) => {
  const { status } = await axios.patch(MYAPGE_PATCH + userCode, parameter);
  return status;
};

const getCalendarDetail = async (month, userCode) => {
  const { data, status } = await axios.get(
    MYPAGE_DETAIL_GET + `${month}/${userCode}`,
  );
  return { data, status };
};

const getFollowingList = async (userCode) => {
  const { data } = await axios.get(FOLLOWING_GET + userCode);
  return data;
};
const getFollowerList = async (userCode) => {
  const { data } = await axios.get(FOLLOWER_GET + userCode);
  return data;
};
const getGoal = async (userCode) => {
  const { data } = await axios.get(GOAL_GET + userCode);
  return data;
};
// const putMypage = async ()
export {
  getMypage,
  patchMypage,
  getFollowingList,
  getFollowerList,
  getGoal,
  getCalendarDetail,
};
