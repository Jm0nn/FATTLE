import { Route } from 'react-router-dom';
import MypageModify from './MypageModify';
import FollowList from './FollowList';
import Goal from './Goal';
import MypageMain from './MypageMain';
import CalendarDetail from './CalendarDetail';
export default [
  <Route path="" element={<MypageMain />} key="main" />,
  <Route path="modify" element={<MypageModify />} key="modify" />,
  <Route path="follow" element={<FollowList />} key="follow" />,
  <Route path="goal" element={<Goal />} key="goal" />,
  <Route path="detail" element={<CalendarDetail />} key="detail" />,
];
