import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import API from '../../services/join/URL';
import axios from 'axios';
import { changeCode } from '../../store/store';
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
    <div>
      <div>
        <button
          onClick={() => {
            handleGoBack();
          }}
        >
          ←
        </button>
      </div>
      <div>
        <div>
          <div>순 탄수</div>
          <input
            placeholder="g"
            value={nutrient[joinInfo.menu].carbon}
            onChange={handleCarbonChange}
          ></input>
        </div>
        <div>
          <div>단백질</div>
          <input
            placeholder="g"
            value={nutrient[joinInfo.menu].protein}
            onChange={handleProteinChange}
          ></input>
        </div>
        <div>
          <div>지방</div>
          <input
            placeholder="g"
            value={nutrient[joinInfo.menu].fats}
            onChange={handlefatsChange}
          ></input>
        </div>
      </div>
      <div>
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
