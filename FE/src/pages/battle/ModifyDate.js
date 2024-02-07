import React from 'react';
import { useRef, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { modifySetting } from '../../services/battle/api.js';
import BattleStyles from '../../styles/battle/Battle.module.css';
const ModifyDate = () => {
  const dateInputEle = useRef(null);
  const nameInputEle = useRef(null);
  const { state } = useLocation();
  const [date, setDate] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    console.log(state);
    if (state === null) {
      navigate('/main');
    } else {
      setName(state.battleSetting.battleName || '');
      setDate(new Date().toISOString().split('T')[0]);
    }
    dateLimit();
  }, []);

  // method
  const dateLimit = () => {
    var now_utc = Date.now();
    var timeOff = new Date().getTimezoneOffset() * 60000;
    var today = new Date(now_utc - timeOff).toISOString().split('T')[0];
    dateInputEle.current.setAttribute('min', today);
  };
  const onModifyComplete = () => {
    const newSetting = {
      ...state.battleSetting,
      endDate: new Date(date),
      battleName: name,
    };
    console.log(newSetting);
    (async () => {
      console.log(newSetting);
      await modifySetting(newSetting);
      navigate(-1);
    })();
  };

  const onChangeHandler = (e) => {
    if (e.target === nameInputEle.current) {
      setName(e.target.value);
    } else {
      setDate(e.target.value);
    }
  };

  return (
    <>
      <h3>배틀 이름과 날짜를 입력해주세요!</h3>
      <label htmlFor="battleName">배틀 이름</label>
      <input
        ref={nameInputEle}
        type="text"
        placeholder="배틀 이름(최대 15자)"
        name="battleName"
        value={name}
        onChange={onChangeHandler}
      />
      <label htmlFor="battleDate">배틀 기간</label>
      <input
        ref={dateInputEle}
        type="date"
        placeholder="언제부터 언제까지 할까요?"
        name="battleDate"
        value={date}
        onChange={onChangeHandler}
      />
      <button className={BattleStyles.btn} onClick={onModifyComplete}>
        완료
      </button>
    </>
  );
};

export default ModifyDate;
