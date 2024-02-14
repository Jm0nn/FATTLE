import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import styles from '../../styles/join/JoinPage3.module.css';
const JoinPage3 = () => {
  const [kcal, setKcal] = useState(1930);
  const handleKcalChange = (e) => {
    // 입력 값이 변경될 때마다 상태 업데이트
    setKcal(e.target.value);
  };
  const handleGoBack = () => {
    navigate(-1);
  };
  const navigate = useNavigate();
  const location = useLocation();
  const joinInfo = {
    userCode: location.state.userCode,
    nickname: location.state.nickname,
    sex: location.state.sex,
    height: location.state.height,
    weight: location.state.weight,
    goalWeight: location.state.goalWeight,
    goalCalory: location.state.goalCalory,
    goalCarbon: location.state.goalCarbon,
    goalProtein: location.state.goalProtein,
    goalFat: location.state.goalFat,
    menu: location.state.menu,
  };
  return (
    <div className={styles.main}>
      <div>
        <button
          className={styles.backBtn}
          onClick={() => {
            handleGoBack();
          }}
        >
          ←
        </button>
      </div>
      <h3 className={styles.header}>
        목표 칼로리를
        <br />
        계산해드렸어요
      </h3>
      <div className={styles.headerInfo}>
        일일 권장 섭취량은 1,930kcal이에요
        <br />
        다이어트를 위한 목표량을 직접 입력할 수도 있어요
      </div>
      <div className={styles.inputBox}>
        <div className={styles.inputKcalHeader}>목표 섭취 열량</div>
        <input
          className={styles.inputKcal}
          type="number"
          value={kcal}
          placeholder="kcal"
          onChange={handleKcalChange}
        />
      </div>
      <div className={styles.nextBtn}>
        <button
          onClick={() => {
            navigate('/join/page4', {
              state: {
                userCode: joinInfo.userCode,
                nickname: joinInfo.nickname,
                sex: joinInfo.sex,
                height: joinInfo.height,
                weight: joinInfo.weight,
                goalWeight: joinInfo.goalWeight,
                goalCalory: kcal,
                goalCarbon: joinInfo.goalCarbon,
                goalProtein: joinInfo.goalProtein,
                goalFat: joinInfo.goalFat,
                menu: joinInfo.menu,
              },
            });
          }}
        >
          다음
        </button>
      </div>
    </div>
  );
};
export default JoinPage3;
