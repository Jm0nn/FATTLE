import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getBattleInfo } from '../../services/battle/api.js';
import styles from '../../styles/battle/BattleInvite.module.css';
import X from '../../assets/svg/battle/X.png';
import Footer from '../../commons/Footer';
import Invite from '../../assets/svg/battle/battleInvite.svg';
function BattleCodeInput() {
  const { state } = useLocation();
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  const handleInputChange = (e) => {
    setPassword(e.target.value);
  };

  const handleJoinRoom = async () => {
    try {
      // 배틀 정보 가져오기
      const res = await getBattleInfo(state.battleCode);
      setData(res.data);

      // 가져온 배틀 정보를 사용하여 비밀번호 설정
      const correctPassword = res.data.battleCode;

      if (password === correctPassword) {
        navigate('/battle/detail', { state: { battleCode: state.battleCode } });
        console.log('방 입장 완료');
      } else {
        alert('비밀번호가 일치하지 않습니다.');
      }
    } catch (error) {
      console.error('Error fetching battle info:', error);
      alert('배틀 정보를 가져오는 데 실패했습니다.');
    }
  };

  return (
    <div>
      <header className={styles.header}>
        <p className={styles.headerTitle}>배틀 목록</p>
      </header>
      <div className={styles.wrapper}>
        <div className={styles.invite}>
          <p className={styles.inviteCode}>초대 코드 입력</p>
          <img className={styles.closeImage} src={X} alt="X" />
        </div>

        <div className={styles.battleCodeContainer}>
          <input
            type="password"
            value={password}
            onChange={handleInputChange}
            className={styles.battleCode}
          />
          {/* <div className={styles.battleCode}></div>
          <div className={styles.battleCode}></div>
          <div className={styles.battleCode}></div>
          <div className={styles.battleCode}></div>
          <div className={styles.battleCode}></div>
          <div className={styles.battleCode}></div> */}
        </div>
        <p className={styles.message}>
          친구에게 받은 초대 코드를 입력해주세요!
        </p>
        {/* <button onClick={handleJoinRoom}>방 입장하기</button> */}
        <div onClick={handleJoinRoom} className={styles.joinBattleRoom}>
          방 입장하기
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default BattleCodeInput;
