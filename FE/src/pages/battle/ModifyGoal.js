import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getUserInfo, registPlayer } from '../../services/battle/api.js';
import BattleStyles from '../../styles/battle/Battle.module.css';

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
      <label htmlFor="weight">시작 체중</label>
      <input
        ref={weightEle}
        placeholder="시작체중"
        type="text"
        name="weight"
        value={weight}
        onChange={onChangeHandler}
      />
      <label htmlFor="goalWeight">시작 체중</label>
      <input
        ref={goalWeightEle}
        placeholder="목표체중"
        type="text"
        name="goalWeight"
        value={goalWeight}
        onChange={onChangeHandler}
      />
      <br />
      <button className={BattleStyles.btn} onClick={onCompleteModify}>
        완료
      </button>
    </>
  );
};

export default ModifyGoal;
