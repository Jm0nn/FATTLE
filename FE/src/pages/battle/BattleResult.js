import styles from '../../styles/battle/BattleResult.module.css';
import trophy from '../../assets/svg/battle/winningTrophy.svg';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { getBattleInfo } from '../../services/battle/api.js';
import { useLocation } from 'react-router-dom';

const BattleResult = () => {
  const { state } = useLocation();
  const userCode = useSelector((state) => state.userCode);
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getBattleInfo(state.battleCode);
        setData(res.data);
      } catch (error) {
        console.error('Error fetching battle info:', error);
      }
    };

    fetchData();
  }, [state, navigate]);

  const handleGoBackToBattle = () => {
    navigate('/battle');
  };

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.elements}></div>
        <div className={styles.winner}>
          {/* 닉네임 불러오기 실패 */}
          {data && data.playerList[0].nickname}님
        </div>
        <img className={styles.trophy} src={trophy} alt="승리 트로피" />
        <div className={styles.frame}>
          <div className={styles.carrier}>
            <div className={styles.vector}></div>
          </div>
        </div>
        <div className={styles.resultMessage}>승리를 축하드립니다!</div>
        <div className={styles.btn}>
          <div className={styles.goScoreDetail}>점수 상세 보기</div>
          <button
            className={styles.goBattleList}
            onClick={handleGoBackToBattle}
          >
            돌아가기
          </button>
        </div>
      </div>
    </>
  );
};

export default BattleResult;
