import React from 'react';
import { useRef, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { modifySetting } from '../../services/battle/api.js';
import styles from '../../styles/battle/ModifyDate.module.css';
import BackHeader from '../../components/commons/BackHeader.js';
const ModifyDate = () => {
  const startDateInputEle = useRef(null);
  const endDateInputEle = useRef(null);
  const nameInputEle = useRef(null);
  const { state } = useLocation();
  const [endDate, setEndDate] = useState('종료일');
  const [startDate, setStartDate] = useState('시작일');
  const [name, setName] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    console.log(state);
    if (state === null) {
      navigate('/main');
    } else {
      setName(state.battleSetting.battleName || '');
      // const initDate = new Date().toISOString().split('T')[0];
      setStartDate(state.battleSetting.startDate.split('T')[0]);
      setEndDate(state.battleSetting.endDate.split('T')[0]);
    }
    dateLimit();
  }, []);

  // method
  const dateLimit = () => {
    var now_utc = Date.now();
    var timeOff = new Date().getTimezoneOffset() * 60000;
    var today = new Date(now_utc - timeOff).toISOString().split('T')[0];
    endDateInputEle.current.setAttribute('min', today);
    startDateInputEle.current.setAttribute('min', today);
  };
  const onModifyComplete = () => {
    const newSetting = {
      ...state.battleSetting,
      endDate: new Date(endDate),
      startDate: new Date(startDate),
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
    } else if (e.target === startDateInputEle.current) {
      setStartDate(e.target.value);
    } else {
      setEndDate(e.target.value);
    }
  };

  return (
    <>
      <div className={styles.main}>
        <BackHeader navigate={navigate} />
        <h3 className={styles.header}>
          배틀의 이름과
          <br />
          진행할 날짜를 정해주세요
        </h3>

        <div className={styles.inputBox}>
          <div className={styles.inputHeader}>배틀 이름</div>
          <input
            ref={nameInputEle}
            type="text"
            placeholder="배틀 이름(최대 15자)"
            name="battleName"
            value={name}
            onChange={onChangeHandler}
            className={styles.input}
          ></input>
        </div>
        <div className={styles.inputBox}>
          <div className={styles.inputHeader}>배틀 기간</div>
          <div className={styles.inputShortBox}>
            <input
              ref={startDateInputEle}
              type="date"
              placeholder="언제부터 언제까지 할까요?"
              name="battleDate"
              value={startDate}
              onChange={onChangeHandler}
              className={styles.inputShort}
              data-placeholder={startDate}
            ></input>
            ~
            <input
              ref={endDateInputEle}
              type="date"
              placeholder="언제부터 언제까지 할까요?"
              name="battleDate"
              value={endDate}
              onChange={onChangeHandler}
              className={styles.inputShort}
              data-placeholder={endDate}
            ></input>
          </div>
        </div>
        <div className={styles.nextBtn} onClick={onModifyComplete}>
          <button>완료</button>
        </div>
      </div>

      {/* --------------------------------------- */}
      {/* <h3>배틀 이름과 날짜를 입력해주세요!</h3>
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
      </button> */}
    </>
  );
};

export default ModifyDate;
