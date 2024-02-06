import { Routes, Route, Navigate } from 'react-router-dom';
import JoinPage1 from './pages/join/JoinPage1';
import JoinPage2 from './pages/join/JoinPage2.js';
import JoinPage3 from './pages/join/JoinPage3.js';
import JoinPage4 from './pages/join/JoinPage4.js';
import Mypage from './pages/mypage/Mypage';
import Auth from './utils/Auth';
import Ranking from './pages/ranking/Ranking';
import ExpHistory from './components/main/ExpHistory';
import Main from './pages/main/Main';
import mypageRoutes from './pages/mypage/mypageRoutes.js';

//styles
import styles from './styles/App.module.css';
import Callback from './pages/login/SosialLogin/Login-callback';

function App() {
  let isLogged = false;
  return (
    <div className={styles.wrapper}>
      <Routes>
        <Route path="/mypage" element={<Mypage />}>
          {mypageRoutes}
        </Route>
        <Route path="/" element={<Auth isLogged={isLogged} />} />
        <Route path="/login" element={<Auth isLogged={isLogged} />} />
        <Route path="/join/page1" element={<JoinPage1></JoinPage1>}></Route>
        <Route path="/join/page2" element={<JoinPage2></JoinPage2>}></Route>
        <Route path="/join/page3" element={<JoinPage3></JoinPage3>}></Route>
        <Route path="/join/page4" element={<JoinPage4></JoinPage4>}></Route>
        <Route path="/login-callback" element={<Callback />}></Route>
        <Route path="/main" element={<Main />} />
        <Route path="/history" element={<ExpHistory />} />
        <Route path="/ranking" element={<Ranking />} />
      </Routes>
    </div>
  );
}
export default App;
