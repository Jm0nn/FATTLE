import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const JoinPage3 = () => {
  const [kcal, setKcal] = useState(1930);

  const handleKcalChange = (e) => {
    // 입력 값이 변경될 때마다 상태 업데이트
    setKcal(e.target.value);
  };

  const handleGoBack = () => {
    navigate(-1);
  };
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
    menu: location.state.menu,
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
      <div>목표 섭취 열량</div>
      <div>
        <input
          type="number"
          value={kcal}
          placeholder="kcal"
          onChange={handleKcalChange}
        />
      </div>
      <button
        onClick={() => {
          navigate('/join/page4', {
            state: {
              userCode: joinInfo.userCode,
              nickname: joinInfo.nickname,
              sex: joinInfo.sex,
              height: joinInfo.height,
              weight: joinInfo.weight,
              goalWeight: joinInfo.goalWeight,
              goalCalory: kcal,
              goalCarbon: joinInfo.goalCarbon,
              goalProtein: joinInfo.goalProtein,
              goalFat: joinInfo.goalFat,
              menu: joinInfo.menu,
            },
          });
        }}
      >
        다음
      </button>
    </div>
  );
};

export default JoinPage3;
