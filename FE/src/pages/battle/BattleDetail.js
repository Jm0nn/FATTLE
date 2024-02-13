import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  getBattleBoardList,
  getBattleInfo,
} from '../../services/battle/api.js';
import { useSelector } from 'react-redux';
import BattleStyles from '../../styles/battle/Battle.module.css';
import { Fragment } from 'react';
import BattleFoodModal from './BattleFoodModal.js';
import Loading from '../../components/commons/Loading.js';

const BattleDetail = (props) => {
  // 전역 상태 변수
  const { state } = useLocation();
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
  }, []);

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
    <>
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
    </>
  );
};

export default BattleDetail;
