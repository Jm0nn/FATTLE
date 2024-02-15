import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import styles from '../../styles/join/JoinPage2.module.css';
const JoinPage2 = () => {
  const [menu, setMenu] = useState(1);
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
  };

  const handleGoBack = () => {
    navigate(-1);
  };
  // useEffect(() => {
  //   const handleBeforeUnload = (e) => {
  //     const confirmationMessage =
  //       '페이지를 떠나면 작성한 모든 데이터가 없어집니다.';
  //     e.returnValue = confirmationMessage;
  //     // e.preventDefault();
  //     console.log('새로고침 됨');
  //     return confirmationMessage;
  //   };
  //   window.addEventListener('beforeunload', handleBeforeUnload);
  //   return () => {
  //     window.removeEventListener('beforeunload', handleBeforeUnload);
  //   };
  // }, []);
  return (
    <div className={styles.main}>
      {/* <div>조인페이지2</div> */}
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
        어떤 식단 모드로
        <br />
        시작할까요?
      </h3>
      <div className={styles.mealCheck}>
        <input
          id="general"
          type="radio"
          name="meal"
          onChange={() => {
            setMenu(0);
          }}
        />
        <label for="general" className={styles.slctBox}>
          {/* <label for="normal"/> */}
          <div className={styles.boxHeader}>일반 식단</div>
          <div className={styles.boxEngHeader}>General</div>
          <div className={styles.boxInfo}>
            탄단지 균형을 유지하고
            <br />
            칼로리를 제한해요
          </div>
        </label>
        <input
          id="fitness"
          type="radio"
          name="meal"
          onChange={() => {
            setMenu(1);
          }}
        />
        <label for="fitness" className={styles.slctBox}>
          <div className={styles.boxHeader}>운동 식단</div>
          <div className={styles.boxEngHeader}>Fitness</div>
          <div className={styles.boxInfo}>
            단백질 섭취량을 늘려
            <br />
            근육 생성에 집중해요
          </div>
        </label>
        <input
          id="keto"
          type="radio"
          name="meal"
          onChange={() => {
            setMenu(2);
          }}
        />
        <label for="keto" className={styles.slctBox}>
          <div className={styles.boxHeader}>키토 식단</div>
          <div className={styles.boxEngHeader}>Ketogenic</div>
          <div className={styles.boxInfo}>
            탄수화물을 제한하고
            <br />
            건강한 지방을 섭취해요
          </div>
        </label>
        <input
          id="vegan"
          type="radio"
          name="meal"
          onChange={() => {
            setMenu(3);
          }}
        />
        <label for="vegan" className={styles.slctBox}>
          <div className={styles.boxHeader}>비건 식단</div>
          <div className={styles.boxEngHeader}>Vegan</div>
          <div className={styles.boxInfo}>
            동물성 음식을 피하고
            <br />
            채식 위주의 식단을 지향해요
          </div>
        </label>
      </div>
      <div className={styles.nextBtn}>
        <button
          onClick={() => {
            navigate('/join/page3', {
              state: {
                userCode: joinInfo.userCode,
                nickname: joinInfo.nickname,
                sex: joinInfo.sex,
                height: joinInfo.height,
                weight: joinInfo.weight,
                goalWeight: joinInfo.goalWeight,
                goalCalory: joinInfo.goalCalory,
                goalCarbon: joinInfo.goalCarbon,
                goalProtein: joinInfo.goalProtein,
                goalFat: joinInfo.goalFat,
                menu: menu,
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
export default JoinPage2;
