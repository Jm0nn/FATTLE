import React, { useEffect, useRef, useState } from 'react';

// styles

import BattleStyles from '../../styles/battle/Battle.module.css';
// SVG
import bettingPlus from '../../assets/svg/battle/bettingPlus.svg';
import bettingMinus from '../../assets/svg/battle/bettingMinus.svg';
import { useLocation, useNavigate } from 'react-router';
import { modifySetting } from '../../services/battle/api.js';
const ModifyBetting = (props) => {
  const { state } = useLocation();
  const bettingEle = useRef(null);
  const navigate = useNavigate();
  const [bettingText, setBettingText] = useState('');
  const [bettingList, setBettingList] = useState([]);
  const onModifyComplete = async () => {
    const newSetting = {
      ...state.battleSetting,
      betting: bettingList,
    };
    (async () => {
      await modifySetting(newSetting);
      navigate(-1);
    })();
  };
  useEffect(() => {
    // 주소 바로 치고 들어올 때 리다이렉트 처리
    if (state === null) navigate('/battle');
    setBettingList(state.battleSetting.betting || []);
  }, []);
  const onBettingPlusClick = () => {
    const newBettingList = [...bettingList];
    newBettingList.push(bettingEle.current.value);
    setBettingList(newBettingList);
    setBettingText('');
  };
  const onBettingMinusClick = (index) => {
    const newBettingList = bettingList.filter((item, i) => index !== i);
    setBettingList(newBettingList);
  };
  const onChangeHandler = (e) => {
    setBettingText(e.target.value);
  };
  return (
    <div>
      <h3>벌칙을 정해주세요</h3>
      <input
        ref={bettingEle}
        onChange={onChangeHandler}
        value={bettingText}
        type="text"
        placeholder="벌칙을 입력해주세요."
      />
      <div>
        <img
          onClick={onBettingPlusClick}
          src={bettingPlus}
          alt="bettingPlust"
        />
      </div>

      <ul>
        {bettingList.map((item, index) => (
          <li key={index}>
            {item}
            <img
              onClick={() => onBettingMinusClick(index)}
              src={bettingMinus}
              alt="bettingMinus"
            />
          </li>
        ))}
      </ul>
      <button className={BattleStyles.btn} onClick={onModifyComplete}>
        완료
      </button>
    </div>
  );
};

export default ModifyBetting;
