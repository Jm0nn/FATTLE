import { Route } from 'react-router-dom';
import BattleCreate from './BattleCreate';
import BattleList from './BattleList.js';
import ModifyDate from './ModifyDate.js';
import ModifyBetting from './ModifyBetting.js';
import ModifyGoal from './ModifyGoal.js';
import BattleDetail from './BattleDetail.js';

export default [
  <Route path="" element={<BattleList />} key="main" />,
  <Route path="create" element={<BattleCreate />} key="create" />,
  <Route path="bettingSet" element={<ModifyBetting />} key="betting" />,
  <Route path="dateSet" element={<ModifyDate />} key="date" />,
  <Route path="goalSet" element={<ModifyGoal />} key="goal" />,
  <Route path="detail" element={<BattleDetail />} key="goal" />,
];
