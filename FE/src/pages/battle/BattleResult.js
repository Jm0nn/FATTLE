import styles from '../../styles/battle/BattleResult.module.css';
import trophy from '../../assets/svg/battle/winningTrophy.svg';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { getBattleInfo } from '../../services/battle/api.js';
import { useLocation } from 'react-router-dom';
import ScoreDetail from './ScoreDetail.js';
const BattleResult = () => {
  const { state } = useLocation();
  const userCode = useSelector((state) => state.userCode);
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [hisotryModalShow, setHistoryModalShow] = useState(false);

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

  let winnerNickname = '';
  let resultMessage = '승리를 축하드립니다!';
  if (data) {
    const player1Point =
      data.playerList[0].foodPoint +
      data.playerList[0].foodUserPoint +
      data.playerList[0].goalPoint +
      data.playerList[0].livePoint +
      data.playerList[0].liveUserPoint +
      data.playerList[0].questPoint;
    const player2Point =
      data.playerList[1].foodPoint +
      data.playerList[1].foodUserPoint +
      data.playerList[1].goalPoint +
      data.playerList[1].livePoint +
      data.playerList[1].liveUserPoint +
      data.playerList[1].questPoint;
    if (player1Point > player2Point) {
      winnerNickname = data.playerList[0].nickname;
    } else if (player1Point < player2Point) {
      winnerNickname = data.playerList[1].nickname;
    } else {
      winnerNickname = null;
      resultMessage = '무승부!';
    }
  }
  const handleClose = () => setHistoryModalShow(false);
  const handleShow = () => setHistoryModalShow(true);
  const showScoreHistory = () => {
    handleShow();
  };
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.elements}></div>
        <div className={styles.winner}>
          {/* 닉네임 불러오기 실패 */}
          {winnerNickname}
        </div>
        <img className={styles.trophy} src={trophy} alt="승리 트로피" />
        <div className={styles.frame}>
          <div className={styles.carrier}>
            <div className={styles.vector}></div>
          </div>
        </div>
        <div className={styles.resultMessage}>{resultMessage}</div>
        <div className={styles.btn}>
          <div
            style={{ cursor: 'pointer' }}
            onClick={showScoreHistory}
            className={styles.goScoreDetail}
          >
            점수 상세 보기
          </div>
          <button
            className={styles.goBattleList}
            onClick={handleGoBackToBattle}
          >
            돌아가기
          </button>
        </div>
        {hisotryModalShow ? (
          <ScoreDetail
            show={hisotryModalShow}
            handleClose={handleClose}
            handleShow={handleShow}
          />
        ) : null}
      </div>
    </>
  );
};

export default BattleResult;
