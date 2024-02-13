import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  getBattleInfo,
  registTrigger,
  deleteTrigger,
  finishBattle,
  finishBattleWeight,
  getBattleBoardList,
} from '../../services/battle/api.js';
import BattleDetailCal from '../../components/battle/BattleDetailCal.js';
import BattleDetailFood from '../../components/battle/BattleDetailFood.js';
import { useSelector } from 'react-redux';
import BattleStyles from '../../styles/battle/Battle.module.css';
import { Fragment } from 'react';
import BattleFoodModal from './BattleFoodModal.js';
import Loading from '../../components/commons/Loading.js';

const BattleDetail = (props) => {
  // 전역 상태 변수
  const { state } = useLocation();
  const [data, setData] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(null);
  const [showBattleCode, setShowBattleCode] = useState(false);
  const [joined, setJoined] = useState(false);
  const [battleEnded, setBattleEnded] = useState(false);

  const userCode = useSelector((state) => state.userCode);
  const navigate = useNavigate();

  // 조건 렌더링 변수
  const [foodModalShow, setFoodModalShow] = useState(false);
  const [initLoading, setInitLoading] = useState(true);

  // 렌더링 데이터 상태 변수
  const [battleInfo, setBattleInfo] = useState();
  const [playerList, setPlayerList] = useState(null);
  const [foodBoardList, setFoodBoardList] = useState(null);
  const [foodModal, setFoodModal] = useState();

  // 넘기기 데이터 변수
  const [modalData, setModalData] = useState(null);
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
          console.log(
            data.playerList[0].userCode,
            state.battleCode,
            finalWeight,
          );
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
    (async () => {
      // 배틀 정보 얻기
      try {
        const res = await getBattleInfo(state.battleCode);
        setBattleInfo(res.data);
        setPlayerList(res.data.playerList);

        // 배틀 식단 게시판 리스트 얻기
        const boardListRes = await getBattleBoardList(state.battleCode);
        setFoodBoardList(boardListRes.data.list);
        console.log(boardListRes.data.list);
        setInitLoading(false);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [state, navigate]);

  const calculateFinalWeight = () => {
    // data가 존재하고 data.playerList도 존재하며 data.playerList[0]도 존재할 때에만 계산 수행
    if (data && data.playerList && data.playerList.length > 0) {
      // 여기에 실제로 몸무게 계산
      const finalWeight =
        data.playerList[0].beforeWeight - data.playerList[0].afterWeight;
      return finalWeight;
    }
    return 0; // 위의 조건 중 하나라도 해당되지 않으면 0을 반환
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
  // METHOD
  const handleClose = () => setFoodModalShow(false);
  const handleShow = () => setFoodModalShow(true);
  const showFoodBoard = (
    boardCode,
    battleCode,
    playerUserCode,
    nickname,
    imgPath,
    recDate,
  ) => {
    setModalData({
      boardCode: boardCode,
      battleCode: battleCode,
      playerUserCode: playerUserCode,
      nickname: nickname,
      imgName: imgPath,
      recDate: recDate,
    });
    handleShow();
  };
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
      {battleEnded ? ( // 추가: 배틀 종료 여부에 따라 결과 보기 버튼 렌더링
        <button onClick={handleViewResult}>결과 보기</button>
      ) : joined ? (
        <button onClick={handleLeaveBattle}>나가기</button>
      ) : (
        <button onClick={handleJoinBattle}>참여하기</button>
      )}
      <div>
        {/* <h3>열량 비교</h3> */}
        <BattleDetailCal
          userCode={data.playerList[0].userCode}
          secondPlayeruserCode={data.playerList[0].userCode}
          //1로 바꿔야 함
        />
      </div>
      {initLoading ? (
        <Loading />
      ) : (
        <>
          배틀 디테일 페이지 <br />
          {playerList &&
            playerList.map((item, index) => (
              <Fragment key={index}>
                <div>
                  <img src={item.imgPath} alt="profile" />
                </div>
                <div>{item.nickname}</div>
                <div>{item.userCode}</div>
                <div>{item.liveUserPoint}</div>
                {item.userCode === userCode ? (
                  <Link
                    className={BattleStyles.btnRed}
                    to="/battle/live"
                    state={{
                      sessionId: battleInfo.battleCode + '_' + userCode,
                      nickname: item.nickname,
                      battleCode: state.battleCode,
                    }}
                  >
                    라이브 방송 하기
                  </Link>
                ) : (
                  <Link
                    className={BattleStyles.btnRed}
                    to="/battle/attend"
                    state={{
                      sessionId: battleInfo.battleCode + '_' + item.userCode,
                      playerUserCode: item.userCode,
                      streamerName: item.nickname,
                      battleCode: state.battleCode,
                    }}
                  >
                    라이브 방송보기
                  </Link>
                )}
              </Fragment>
            ))}
          {/* 식단 앨범 */}
          <h3>식단앨범</h3>
          <div>
            <ul>
              {foodBoardList.map((item, index) => (
                <>
                  <span>{item.nickname}</span>
                  <img
                    style={{ cursor: 'pointer' }}
                    src={item.imgPath}
                    alt="foodImg"
                    onClick={() =>
                      showFoodBoard(
                        item.boardCode,
                        item.battleCode,
                        item.playerCode,
                        item.nickname,
                        item.imgName,
                        item.recDt,
                      )
                    }
                  />
                  {foodModalShow ? (
                    <BattleFoodModal
                      show={foodModalShow}
                      handleClose={handleClose}
                      handleShow={handleShow}
                      data={modalData}
                    />
                  ) : null}
                </>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default BattleDetail;
