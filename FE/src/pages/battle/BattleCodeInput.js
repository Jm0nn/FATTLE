import React, { useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getBattleInfo, registTrigger } from '../../services/battle/api.js';
import styles from '../../styles/battle/BattleInvite.module.css';
import X from '../../assets/svg/battle/X.png';
import Footer from '../../commons/Footer';
import Invite from '../../assets/svg/battle/battleInvite.svg';
import { useSelector } from 'react-redux';

function BattleCodeInput() {
  const { state } = useLocation();
  const [password, setPassword] = useState(['', '', '', '', '', '']);
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const inputs = useRef([]);
  const userCode = useSelector((state) => state.userCode);

  const handleInputChange = (e, index) => {
    const newValue = e.target.value;
    setPassword((prevPassword) => {
      const newPassword = [...prevPassword];
      newPassword[index] = newValue;
      return newPassword;
    });

    // 다음 input으로 포커스 이동
    if (newValue.length === 1 && index < inputs.current.length - 1) {
      inputs.current[index + 1].focus();
    }
  };

  const handleXClick = () => {
    navigate('/battle');
  };

  const handleJoinRoom = async () => {
    try {
      // 배틀 정보 가져오기
      const res = await getBattleInfo(password.join(''));
      setData(res.data);
      if (res.status == 200) {
        await registTrigger(userCode, res.data.battleCode);
        navigate('/battle');
      }
    } catch (error) {
      // console.error('Error fetching battle info:', error);
      if (error.response.status === 500) {
        alert('존재하지 않는 코드입니다 다시입력해주세요.');
      }
      console.log('error : ', error);
      console.error(error);
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
          <img
            className={styles.closeImage}
            src={X}
            alt="X"
            onClick={handleXClick}
          />
        </div>

        <div className={styles.battleCodeContainer}>
          {password.map((value, index) => (
            <input
              key={index}
              ref={(el) => (inputs.current[index] = el)}
              type="text"
              value={value}
              maxLength={1}
              onChange={(e) => handleInputChange(e, index)}
              className={styles.battleCode}
            />
          ))}
        </div>
        <p className={styles.message}>
          친구에게 받은 초대 코드를 입력해주세요!
        </p>
        <div onClick={handleJoinRoom} className={styles.joinBattleRoom}>
          방 입장하기
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default BattleCodeInput;
