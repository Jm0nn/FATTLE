import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  getBattleInfo,
  registTrigger,
  deleteTrigger,
  finishBattle,
  finishBattleWeight,
} from '../../services/battle/api.js';
import BattleDetailCal from '../../components/battle/BattleDetailCal.js';
import BattleDetailFood from '../../components/battle/BattleDetailFood.js';
import { useSelector } from 'react-redux';

const BattleDetail = (props) => {
  const { state } = useLocation();
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  const [timeRemaining, setTimeRemaining] = useState(null);
  const [showBattleCode, setShowBattleCode] = useState(false);
  const [joined, setJoined] = useState(false);
  const [battleEnded, setBattleEnded] = useState(false);
  const userCode = useSelector((state) => {
    return state.userCode;
  });

  useEffect(() => {
    if (state === null) {
      navigate('/battle');
      return;
    }
    const fetchData = async () => {
      try {
        const res = await getBattleInfo(state.battleCode);
        setData(res.data);

        // const startDate = new Date(res.data.startDate);
        const endDate = new Date(res.data.endDate);
        const difference = endDate - new Date();
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        );
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60),
        );
        setTimeRemaining({ days, hours, minutes });
        // 남은 시간이 0이 되면 배틀 종료
        if (difference <= 0) {
          setBattleEnded(true);
          alert('배틀이 종료되었습니다.');
          const finalWeight = calculateFinalWeight();
          await finishBattleWeight(
            state.battleCode,
            data.playerList[0].userCode,
            finalWeight,
          );
          // 배틀 종료 API 호출
          // await finishBattle(state.battleCode);
          // 승리자 페이지로 이동
          // navigate('/battle');
          await finishBattleWeight();
        }
      } catch (error) {
        console.error('Error fetching battle info:', error);
      }
    };

    fetchData();
  }, [state, navigate]);

  const calculateFinalWeight = () => {
    // 여기에 실제로 몸무게 계산
    const finalWeight =
      data.playerList[0].beforeWeight - data.playerList[0].afterWeight;
    return finalWeight;
  };

  const handleToggleCodeView = () => {
    setShowBattleCode(!showBattleCode);
  };

  const handleJoinBattle = async () => {
    try {
      await registTrigger(userCode, state.battleCode);
      setJoined(true);
      alert('Battle에 성공적으로 참여하셨습니다!');
    } catch (error) {
      console.error('Error joining battle:', error);
      alert('Battle 참여에 실패했습니다. 나중에 다시 시도해주세요.');
    }
  };

  const handleLeaveBattle = async () => {
    try {
      await deleteTrigger(userCode, state.battleCode);
      setJoined(false);
      alert('Battle에서 성공적으로 나가셨습니다!');
    } catch (error) {
      console.error('Error leaving battle:', error);
      alert('Battle 나가기에 실패했습니다. 나중에 다시 시도해주세요.');
    }
  };

  const handleViewResult = () => {
    // 여기에 결과 보기 페이지로 이동하는 코드 추가
    // 예: navigate('/battle/result');
    alert('결과 보기 버튼 클릭됨');
  };

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      배틀 디테일 페이지 <br />
      <p>
        {battleEnded ? (
          <p>종료된 배틀</p>
        ) : timeRemaining ? (
          <p>
            남은 시간: {timeRemaining.days}일 {timeRemaining.hours}시간{' '}
            {timeRemaining.minutes}분
          </p>
        ) : null}
      </p>
      <p>배틀 네임: {data.battleName}</p>
      <p style={{ border: '2px solid black' }}>
        {showBattleCode ? (
          <>배틀 코드: {data.battleCode}</>
        ) : (
          <button onClick={handleToggleCodeView}>코드 보기</button>
        )}
      </p>
      <p>내기 목록: {data.betting}</p>
      <br />
      <p>내 닉네임: {data.playerList[0].nickname}</p>
      <img src={data.playerList[0].profileImgPath} alt="프로필 이미지" />
      <p>
        내 포인트:{' '}
        {data.playerList[0].livePoint +
          data.playerList[0].foodPoint +
          data.playerList[0].liveUserPoint +
          data.playerList[0].foodUserPoint +
          data.playerList[0].questPoint +
          data.playerList[0].goalPoint}
      </p>
      <p>
        목표까지:
        {data.playerList[0].beforeWeight - data.playerList[0].goalWeight}
      </p>
      <Link to="/battle/live" state={{}}>
        라이브 방송 하기
      </Link>
      <p>vs</p>
      {/* 플레이리스트 1로? */}
      <p>내 닉네임: {data.playerList[1].nickname}</p>
      <img src={data.playerList[1].profileImgPath} alt="프로필 이미지" />
      <p>
        내 포인트:{' '}
        {data.playerList[1].livePoint +
          data.playerList[1].foodPoint +
          data.playerList[1].liveUserPoint +
          data.playerList[1].foodUserPoint +
          data.playerList[1].questPoint +
          data.playerList[1].goalPoint}
      </p>
      <p>
        목표까지:
        {data.playerList[1].beforeWeight - data.playerList[1].goalWeight}
      </p>
      {battleEnded ? ( // 추가: 배틀 종료 여부에 따라 결과 보기 버튼 렌더링
        <button onClick={handleViewResult}>결과 보기</button>
      ) : joined ? (
        <button onClick={handleLeaveBattle}>나가기</button>
      ) : (
        <button onClick={handleJoinBattle}>참여하기</button>
      )}
      <div>
        <h3>열량 비교</h3>
        <BattleDetailCal
          userCode={data.playerList[0].userCode}
          secondPlayeruserCode={data.playerList[1].userCode}
          //1로 바꿔야 함
        />
      </div>
      <div>
        <h3>식단 앨범</h3>
        <BattleDetailFood
          userCode={data.playerList[0].userCode}
          secondPlayeruserCode={data.playerList[1].userCode}
          //1로 바꿔야 함
        />
      </div>
    </div>
  );
};

export default BattleDetail;
