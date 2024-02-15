import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import API from '../../services/join/URL';
import axios from 'axios';
import { changeCode } from '../../store/store';
import styles from '../../styles/join/JoinPage4.module.css';
const JoinPage4 = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [nutrient, setNutrient] = useState([
    {
      carbon: 241,
      protein: 145,
      fats: 43,
    },
    {
      carbon: 193,
      protein: 193,
      fats: 43,
    },
    {
      carbon: 39,
      protein: 106,
      fats: 150,
    },
    {
      carbon: 241,
      protein: 145,
      fats: 43,
    },
  ]);
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
  const handleGoBack = () => {
    navigate(-1);
  };
  const handleCarbonChange = (e) => {
    const updateNutrient = [...nutrient];
    updateNutrient[joinInfo.menu].carbon = parseInt(e.target.value, 10) || 0;
    setNutrient(updateNutrient);
    // setNutrient
  };
  const handleProteinChange = (e) => {
    const updateNutrient = [...nutrient];
    updateNutrient[joinInfo.menu].protein = parseInt(e.target.value, 10) || 0;
    setNutrient(updateNutrient);
    // setNutrient
  };
  const handlefatsChange = (e) => {
    const updateNutrient = [...nutrient];
    updateNutrient[joinInfo.menu].fats = parseInt(e.target.value, 10) || 0;
    setNutrient(updateNutrient);
    // setNutrient
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
        목표 탄단지 정하기,
        <br />
        이제 거의 다 왔어요!
      </h3>
      <div className={styles.headerInfo}>
        목표 열량과 식단에 맞는{' '}
        <span style={{ color: '#6792ff' }}>추천섭취량</span>을 계산했어요
        <br />
        다이어트를 위한 목표량을 직접 입력할 수도 있어요
      </div>
      <div className={styles.inputBoxes}>
        <div className={styles.inputBox}>
          <div className={styles.inputHeader}>순탄수</div>
          <div className={styles.inputContents}>
            <input
              className={styles.input}
              placeholder="g"
              value={nutrient[joinInfo.menu].carbon}
              onChange={handleCarbonChange}
            ></input>
            <span className={styles.inputUnit}>x 4</span>
            <span className={styles.inputCalc}>
              <div>808Kcal</div>
              <div>40%</div>
            </span>
          </div>
        </div>
        <div className={styles.inputBox}>
          <div className={styles.inputHeader}>단백질</div>
          <div className={styles.inputContents}>
            <input
              className={styles.input}
              placeholder="g"
              value={nutrient[joinInfo.menu].protein}
              onChange={handleProteinChange}
            ></input>
            <span className={styles.inputUnit}>x 4</span>
            <span className={styles.inputCalc}>
              <div>808Kcal</div>
              <div>40%</div>
            </span>
          </div>
        </div>
        <div className={styles.inputBox}>
          <div className={styles.inputHeader}>지방</div>
          <div className={styles.inputContents}>
            <input
              className={styles.input}
              placeholder="g"
              value={nutrient[joinInfo.menu].fats}
              onChange={handlefatsChange}
            ></input>
            <span className={styles.inputUnit}>x 9</span>
            <span className={styles.inputCalc}>
              <div>405Kcal</div>
              <div>20%</div>
            </span>
          </div>
        </div>
        <div className={styles.separateLine} />
        <div className={styles.calcResult}>
          <div>?? 목표 섭취 열량</div>
          <div className={styles.resultKcal}>1930 kcal</div>
        </div>
      </div>
      <div className={styles.nextBtn}>
        <button
          onClick={() => {
            axios
              .post(`${API.JOIN_POST}`, {
                userCode: joinInfo.userCode,
                nickname: joinInfo.nickname,
                sex: joinInfo.sex,
                height: joinInfo.height,
                weight: joinInfo.weight,
                goalWeight: joinInfo.goalWeight,
                goalCalory: joinInfo.goalCalory,
                goalCarbo: nutrient[joinInfo.menu].carbon,
                goalProtein: nutrient[joinInfo.menu].protein,
                goalFat: nutrient[joinInfo.menu].fats,
              })
              .then((res) => {
                alert('회원가입이 완료되었습니다.');
                dispatch(changeCode(joinInfo.userCode));
                navigate('/');
                console.log(res);
              })
              .catch((err) => {
                console.log(err);
              });
          }}
        >
          다음
        </button>
      </div>
    </div>
  );
};
export default JoinPage4;
