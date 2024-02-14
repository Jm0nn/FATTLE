import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getUserInfo, registPlayer } from '../../services/battle/api.js';
import styles from '../../styles/battle/ModifyGoal.module.css';
import BackHeader from '../../components/commons/BackHeader.js';

const ModifyGoal = (props) => {
  const navigate = useNavigate();
  const userCode = useSelector((state) => state.userCode);
  const { state } = useLocation();
  const [weight, setWeight] = useState(null);
  const [goalWeight, setGoalWeight] = useState(null);
  const [battleCode, setBattleCode] = useState(null);
  const weightEle = useRef(0);
  const goalWeightEle = useRef(0);

  // --------------------------------

  const onChangeHandler = (e) => {
    if (e.target === weightEle.current) {
      setWeight(e.target.value);
    } else {
      setGoalWeight(e.target.value);
    }
  };
  const onCompleteModify = async () => {
    const res = await registPlayer(userCode, battleCode, weight, goalWeight);
    navigate('/battle');
  };
  useEffect(() => {
    if (state === null) navigate('/battle');
    setBattleCode(state.battleCode);
    (async () => {
      try {
        const res = await getUserInfo(userCode);
        setWeight(res.data.weight);
        setGoalWeight(res.data.goalWeight);
      } catch (error) {
        console.log(error);
        navigate('/battle');
      }
    })();
  }, []);
  return (
    <>
      <div className={styles.main}>
        <BackHeader navigate={navigate} />
        <h3 className={styles.header}>나의 목표를 정해주세요</h3>
        <div className={styles.headerInfo}>ㆍ 체중은 배틀 친구에게만 공개</div>

        <div className={styles.goal}>
          <div>
            <div>시작 체중</div>
            <input
              ref={weightEle}
              name="weight"
              value={weight}
              onChange={onChangeHandler}
              type="number"
              placeholder="kg"
              className={styles.startKg}
            ></input>
          </div>
          <div>
            <div>목표 체중</div>
            <input
              ref={goalWeightEle}
              name="goalWeight"
              value={goalWeight}
              onChange={onChangeHandler}
              type="number"
              placeholder="kg"
              className={styles.goalKg}
            ></input>
          </div>
        </div>
        <div className={styles.calcResult}>
          <div>🔥 {Math.abs(goalWeight - weight)} kg 뺄래요</div>
        </div>
        <div className={styles.nextBtn} onClick={onCompleteModify}>
          <button>완료</button>
        </div>
      </div>
    </>
  );
};

export default ModifyGoal;
