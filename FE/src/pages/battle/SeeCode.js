import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import styles from '../../styles/battle/SeeCode.module.css';

import BackHeader from '../../components/commons/BackHeader.js';

const SeeCode = (props) => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [battleCode, setBattleCode] = useState(null);

  useEffect(() => {
    if (state === null) navigate('/');
    setBattleCode(state.battleCode);
  });

  return (
    // 밑의 스타일 수정 필요
    <div className={styles.main}>
      <BackHeader />
      <h3 className={styles.header}>
        작성을 완료했어요!
        <br />
        배틀 상대를 초대해 보세요!
      </h3>

      <div className={styles.contentsBox}>
        <div className={styles.icon} />
        <div className={styles.contentsHeader}>초대 코드</div>
        <div className={styles.code}>{battleCode}</div>
        <div className={styles.copyCodeBtn}>코드 복사하기</div>
      </div>
      <div className={styles.nextBtn}>
        <button
          onClick={() => {
            navigate(-1);
          }}
        >
          확인
        </button>
      </div>
    </div>
  );
};

export default SeeCode;
