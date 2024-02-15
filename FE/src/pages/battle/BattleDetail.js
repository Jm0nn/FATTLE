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
import BASE_URL from '../../config.js';
import BattleFinalInput from '../../components/battle/BattleFinalInput.js';

const BattleDetail = (props) => {
  // 전역 상태 변수
  const { state } = useLocation();
  const [data, setData] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(null);
  const [showBattleCode, setShowBattleCode] = useState(false);
  const [joined, setJoined] = useState(false);
  const [battleEnded, setBattleEnded] = useState(false);
  const [noModal, setNoModal] = useState(true);
  const [battleStatus, setBattleStatus] = useState(1);

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
    setBattleStatus(state.status);
    const fetchData = async () => {
      try {
        const res = await getBattleInfo(state.battleCode);
        console.log('res', res);
        if (state.status === 2) {
          setBattleEnded(false);
          // setNoModal(false);
        } else {
          if (
            res.data.playerList[0].afterWeight +
              res.data.playerList[1].afterWeight >
            0
          ) {
            setBattleEnded(true);
          }
        }
        setData(res.data);
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
      <button
        onClick={() => {
          setBattleEnded(true);
        }}
      >
        aaaaaaaaaaaaaa 배틀강제 종료
      </button>
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
              {/* {!data.playerList[0] && (
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
              )} */}

              {/* 1번플레이어라면 랜더링 */}
              {data.playerList[1] &&
                data.playerList[1].userCode === userCode && (
                  <>
                    <div className={styles.profileImages}>
                      <img
                        src={`/${data.playerList[1].profileImgPath}`}
                        alt="proImg"
                      />
                      <span className={styles.versus}>vs</span>
                      <img
                        src={`/${data.playerList[0].profileImgPath}`}
                        alt="proImg"
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
                      <div className={styles.rows}>
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
                        <div className={styles.goal}>
                          목표 : {data.playerList[1].goalWeight}
                          kg
                        </div>
                      </div>
                    </div>
                  </>
                )}
              {/* 0번플레이어라면 렌더링 */}
              
            </div>
          )}

        {/* 배틀의 기간이 지났고 아직 배틀status가 종료 되지 않았으면 내기자에게 최종 체중을 입력 하게 한다. */}
        {/* {playerList &&
        battleEnded &&
        battleStatus !== 2 &&
        (playerList[0] === userCode || playerList[1] === userCode) ? (
          <>
            <BattleFinalInput show={battleEnded} userCode={userCode} />
          </>
        ) : null} */}
        {(() => {
          if (playerList && battleEnded && battleStatus !== 2) {
            if (
              playerList[0].userCode === userCode ||
              playerList[1].userCode === userCode
            ) {
              let nickname = '';
              if (playerList[0].userCode === userCode)
                nickname = playerList[0].nickname;
              else nickname = playerList[1].nickname;
              return (
                <BattleFinalInput
                  show={battleEnded}
                  userCode={userCode}
                  nickname={nickname}
                  battleCode={state.battleCode}
                />
              );
            } else return null;
          }
          return null;
        })()}
        {/* {(()=>{
          if (playerList && (playerList[0].afterWeight + playerList[1].afterWeight) > 0 && battleStatus === 1) {
          }
        })()} */}
        {battleStatus === 2 && (
          <div onClick={handleViewResult} className={styles.goResult}>
            결과 보기
          </div>
        )}

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
                    {console.log(item)}
                    <img
                      style={{ cursor: 'pointer' }}
                      // src={item.imgPath}
                      src={`${BASE_URL}/food/img/${item.imgName}`}
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
