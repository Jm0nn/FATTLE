import React, { useEffect, useRef, useState } from 'react';

// SVG
import bettingPlus from '../../assets/svg/battle/bettingPlus.svg';
import bettingMinus from '../../assets/svg/battle/bettingMinus.svg';
import { useLocation, useNavigate } from 'react-router';
const ModifyBetting = (props) => {
  const { state } = useLocation();
  const bettingEle = useRef(null);
  const navigate = useNavigate();
  const [bettingList, setBettingList] = useState([]);
  useEffect(() => {
    // 주소 바로 치고 들어올 때 리다이렉트 처리
    if (state === null) navigate('/battle');

    console.log(state.battleSetting.bettings);
    setBettingList(state.battleSetting.bettings || []);
  }, []);
  const onBettingPlusClick = (e) => {
    const newBettingList = [];
    newBettingList.push(e.target.value);
    setBettingList(newBettingList);
    e.target.value = '';
  };
  return (
    <div>
      <h3>벌칙을 정해주세요</h3>
      <input ref={bettingEle} type="text" placeholder="벌칙을 입력해주세요." />
      <div>
        <img
          onClick={onBettingPlusClick}
          src={bettingPlus}
          alt="bettingPlust"
        />
      </div>

      <ul>
        {bettingList.map((item) => (
          <li>
            {item}
            <img src={bettingMinus} alt="bettingMinus" />
          </li>
        ))}
      </ul>
      <button
        onClick={() => {
          navigate(-1);
        }}
      >
        완료
      </button>
    </div>
  );
};

export default ModifyBetting;
