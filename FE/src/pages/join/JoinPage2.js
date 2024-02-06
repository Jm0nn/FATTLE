import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const JoinPage2 = () => {
  const [menu, setMenu] = useState(1);
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
  };

  const handleGoBack = () => {
    navigate(-1);
  };
  // useEffect(() => {
  //   const handleBeforeUnload = (e) => {
  //     const confirmationMessage =
  //       '페이지를 떠나면 작성한 모든 데이터가 없어집니다.';
  //     e.returnValue = confirmationMessage;
  //     // e.preventDefault();
  //     console.log('새로고침 됨');
  //     return confirmationMessage;
  //   };
  //   window.addEventListener('beforeunload', handleBeforeUnload);

  //   return () => {
  //     window.removeEventListener('beforeunload', handleBeforeUnload);
  //   };
  // }, []);

  return (
    <div>
      <div>조인페이지2</div>
      <div>
        <button
          onClick={() => {
            handleGoBack();
          }}
        >
          ←
        </button>
      </div>
      <div className="mealCheck">
        <label>
          <input
            type="radio"
            name="meal"
            onChange={() => {
              setMenu(0);
            }}
          />
          일반 식단
        </label>
        <label>
          <input
            type="radio"
            name="meal"
            onChange={() => {
              setMenu(1);
            }}
          />
          운동 식단
        </label>
        <label>
          <input
            type="radio"
            name="meal"
            onChange={() => {
              setMenu(2);
            }}
          />
          키토 식단
        </label>
        <label>
          <input
            type="radio"
            name="meal"
            onChange={() => {
              setMenu(3);
            }}
          />
          비건 식단
        </label>
      </div>
      <div className="next">
        <button
          onClick={() => {
            navigate('/join/page3', {
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
                menu: menu,
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

export default JoinPage2;
