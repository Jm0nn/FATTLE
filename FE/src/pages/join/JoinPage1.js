import { useState } from 'react';
import { API } from '../../services/login/URL';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import styles from '../../styles/join/JoinPage1.module.css';
// 닉네임 중복 체크 컴포넌트
const JoinPage1 = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [joinInfo, setJoinInfo] = useState({
    userCode: location.state.userCode,
    nickname: '',
    sex: '',
    height: '',
    weight: '',
    goalWeight: '',
    goalCalory: '',
    goalCarbon: '',
    goalProtein: '',
    goalFat: '',
  });
  const [dupli, setDupli] = useState(true);
  const handleGoBack = () => {
    navigate(-1);
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
        나만의 다이어트 설정,
        <br />
        1분이면 끝나요
      </h3>
      <div className={styles.nameCheck}>
        <input
          className={styles.nameCheckInput}
          placeholder="닉네임 입력"
          onChange={(e) => {
            setDupli(true);
            setJoinInfo({
              ...joinInfo,
              nickname: e.target.value,
            });
          }}
        ></input>
        <button
          className={styles.nameCheckBtn}
          onClick={() => {
            axios // NICKNAME_GET
              .get(`${API.NICKNAME_GET}${joinInfo.nickname}`)
              .then((res) => {
                alert('좋은 닉네임 입니다.');
                setDupli(false);
              })
              .catch((err) => {
                if (joinInfo.nickname.length === 0) {
                  alert('닉네임을 입력해 주세요!!!');
                } else {
                  alert('중복된 닉네임 입니다!!!');
                }
                console.log(err);
              });
          }}
        >
          중복 확인
        </button>
      </div>
      <div className={styles.genderCheck}>
        <div>
          <input
            type="radio"
            name="gender"
            id="maleBtn"
            className={[styles.genderBtn, styles.maleBtn].join(' ')}
            onClick={() => {
              setJoinInfo({
                ...joinInfo,
                sex: 'M',
              });
            }}
          />
          <label
            for="maleBtn"
            className={[styles.genderLabel, styles.genderMale].join(' ')}
          ></label>
          남자
        </div>
        <div>
          <input
            type="radio"
            name="gender"
            id="femaleBtn"
            className={styles.genderBtn}
            onClick={() => {
              setJoinInfo({
                ...joinInfo,
                sex: 'W',
              });
            }}
          />
          <label
            for="femaleBtn"
            className={[styles.genderLabel, styles.genderFemale].join(' ')}
          ></label>
          여자
        </div>
      </div>
      <div className={styles.myInfo}>
        <div>키</div>
        <input
          className={styles.myInfoInput}
          placeholder="CM"
          onChange={(e) => {
            setJoinInfo({
              ...joinInfo,
              height: e.target.value,
            });
          }}
        ></input>
      </div>
      <div className={styles.goal}>
        <div>
          <div>시작 체중</div>
          <input
            placeholder="Kg"
            className={styles.startKg}
            onChange={(e) => {
              setJoinInfo({
                ...joinInfo,
                weight: e.target.value,
              });
            }}
          ></input>
        </div>
        <div>
          <div>목표 체중</div>
          <input
            placeholder="Kg"
            className={styles.goalKg}
            onChange={(e) => {
              setJoinInfo({
                ...joinInfo,
                goalWeight: e.target.value,
              });
            }}
          ></input>
        </div>
      </div>
      <div className={styles.nextBtn}>
        <button
          disabled={dupli}
          onClick={() => {
            navigate('/join/page2', {
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
export default JoinPage1;
