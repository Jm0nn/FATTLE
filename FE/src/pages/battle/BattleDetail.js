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
import styles from '../../styles/battle/BattleDetail.module.css';
import temp from '../../assets/svg/mypage/ProfileImg.svg';
import liveImg from '../../assets/svg/battle/battleLive.svg';
import exChk from '../../assets/svg/battle/exerciseChk.svg';
import nullImage from '../../assets/svg/battle/battleProfileNull.svg';
import Footer from '../../commons/Footer';
import getDday from '../../utils/battle/calculateDday.js';

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

  const handleViewResult = () => {
    navigate('/battle/result', {
      state: {
        battleCode: data.battleCode,
      },
    });
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
    <div className={styles.container}>
      <header className={styles.header}>
        <p className={styles.headerTitle}>배틀 정보</p>
      </header>

      <div className={styles.content}>
        <div className={styles.battleCode}>
          {showBattleCode ? (
            <>{data.battleCode}</>
          ) : (
            <div onClick={handleToggleCodeView}>코드 보기</div>
          )}
        </div>

        <div>
          {data && (
            <div className={styles.battleInfo}>
              <div className={styles.dDay}>
                D-
                {getDday(new Date(data.startDate), new Date(data.endDate))}
              </div>
              <div className={styles.battleTitle}>{data.battleName}</div>
              {!data.playerList[0] && (
                <>
                  <div className={styles.profileImages}>
                    {!data.playerList[0] && (
                      <>
                        <img src={nullImage} alt="빈 프로필" />
                      </>
                    )}
                    <span className={styles.versus}>vs</span>
                    {!data.playerList[1] && (
                      <>
                        <img src={nullImage} alt="빈 프로필" />
                      </>
                    )}
                  </div>
                  <div style={{ color: 'white' }}>내기자를 설정해주세요!!</div>
                </>
              )}
              {data.playerList[1] &&
                data.playerList[1].userCode === userCode && (
                  <>
                    <div className={styles.profileImages}>
                      <img
                        src={`/${data.playerList[1].profileImgPath}`}
                        // alt="나의 프로필 이미지"
                      />
                      <span className={styles.versus}>vs</span>
                      <img
                        src={`/${data.playerList[0].profileImgPath}`}
                        // alt="상대방 프로필 이미지"
                      />
                    </div>
                    <div className={styles.columns}>
                      <div className={styles.rows}>
                        {/* {data.playerList[0].liveStatus === 0 ||
                        data.playerList[1].liveStatus === 1 ? (
                          <img
                            className={BattleStyles.liveImage}
                            src={liveImg}
                            alt={'라이브 표시 이미지'}
                          />
                        ) : null} */}
                        <div className={styles.name}>
                          {data.playerList[1].nickname}
                        </div>
                        <div className={styles.now}>지금까지</div>
                        <div className={styles.score}>
                          {data.playerList[1].foodPoint +
                            data.playerList[1].foodUserPoint +
                            data.playerList[1].goalPoint +
                            data.playerList[1].livePoint +
                            data.playerList[1].liveUserPoint +
                            data.playerList[1].questPoint}
                          점
                        </div>
                        <divv className={styles.goal}>
                          목표 : {data.playerList[1].goalWeight}
                          kg
                        </divv>
                      </div>
                      <div className={styles.rows}>
                        <div className={styles.name}>
                          {data.playerList[0].nickname}
                        </div>
                        <div className={styles.now}>지금까지</div>
                        <div className={styles.score}>
                          {data.playerList[0].foodPoint +
                            data.playerList[0].foodUserPoint +
                            data.playerList[0].goalPoint +
                            data.playerList[0].livePoint +
                            data.playerList[0].liveUserPoint +
                            data.playerList[0].questPoint}
                          점
                        </div>
                        <div className={styles.goal}>
                          목표 : {data.playerList[0].goalWeight}
                          kg
                        </div>
                      </div>
                    </div>
                  </>
                )}
              {data.playerList[0] &&
                data.playerList[0].userCode === userCode && (
                  <>
                    <div className={styles.profileImages}>
                      <img
                        src={`/${data.playerList[0].profileImgPath}`}
                        // alt="나의 프로필 이미지"
                      />
                      <span className={styles.versus}>vs</span>
                      <img
                        src={`/${data.playerList[1].profileImgPath}`}
                        // alt="상대방 프로필 이미지"
                      />
                    </div>
                    <div className={styles.columns}>
                      <div className={styles.rows}>
                        {/* {data.playerList[0].liveStatus === 1 ||
                        data.playerList[1].liveStatus === 1 ? (
                          <img
                            className={BattleStyles.liveImage}
                            src={liveImg}
                            alt={'라이브 표시 이미지'}
                          />
                        ) : null} */}
                        <div className={styles.name}>
                          {data.playerList[0].nickname}
                        </div>
                        {/* <div className={styles.now}>지금까지</div> */}
                        <div className={styles.score}>
                          {data.playerList[0].foodPoint +
                            data.playerList[0].foodUserPoint +
                            data.playerList[0].goalPoint +
                            data.playerList[0].livePoint +
                            data.playerList[0].liveUserPoint +
                            data.playerList[0].questPoint}
                          점
                        </div>
                        <div className={styles.goal}>
                          목표 : {data.playerList[0].goalWeight}
                          kg
                        </div>
                        <div className={styles.name}>
                          {data.playerList[1].nickname}
                        </div>
                        {/* <div className={styles.now}>지금까지</div> */}
                        <div className={styles.score}>
                          {data.playerList[1].foodPoint +
                            data.playerList[1].foodUserPoint +
                            data.playerList[1].goalPoint +
                            data.playerList[1].livePoint +
                            data.playerList[1].liveUserPoint +
                            data.playerList[1].questPoint}
                          점
                        </div>
                        <div className={styles.goal}>
                          목표 : {data.playerList[1].goalWeight}
                          kg
                        </div>
                      </div>
                    </div>
                  </>
                )}
            </div>
          )}
        </div>
        {!battleEnded && (
          <div className={styles.livebutton}>
            {playerList &&
              playerList.map((item, index) => (
                <Fragment key={index}>
                  {item.userCode === userCode ? (
                    <Link
                      className={styles.btnRed}
                      to="/battle/live"
                      state={{
                        sessionId: battleInfo.battleCode + '_' + userCode,
                        nickname: item.nickname,
                        battleCode: state.battleCode,
                      }}
                    >
                      라이브 방송하기
                    </Link>
                  ) : (
                    <div>
                      {data.playerList[0].liveStatus === 1 ||
                      data.playerList[1].liveStatus === 1 ? (
                        <Link
                          className={styles.btnRed}
                          to="/battle/attend"
                          state={{
                            sessionId:
                              battleInfo.battleCode + '_' + item.userCode,
                            playerUserCode: item.userCode,
                            streamerName: item.nickname,
                            battleCode: state.battleCode,
                          }}
                        >
                          라이브 방송보기
                        </Link>
                      ) : null}
                    </div>
                  )}
                </Fragment>
              ))}
          </div>
        )}
        <div>
          {battleEnded && (
            <div onClick={handleViewResult} className={styles.goResult}>
              결과 보기
            </div>
          )}
        </div>

        <div className={styles.graph}>
          {/* <h3>열량 비교</h3> */}
          <BattleDetailCal
            userCode={data.playerList[0].userCode}
            secondPlayeruserCode={data.playerList[1].userCode}
          />
        </div>

        {initLoading ? (
          <Loading />
        ) : (
          <div className={styles.foodAlbum}>
            {/* 식단 앨범 */}
            <div className={styles.dietAlbum}>
              <div className={styles.bTitle}>식단 앨범</div>
              <div className={styles.line}></div>
              <div className={styles.vertical}></div>
              <ul>
                {foodBoardList.map((item, index) => (
                  <Fragment key={index}>
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
                  </Fragment>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default BattleDetail;
