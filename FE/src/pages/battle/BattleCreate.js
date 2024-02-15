import React, { useEffect, useRef, useState } from 'react';
import { getBattleInfo, startBattle } from '../../services/battle/api.js';
import { useLocation, useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import BattleStyles from '../../styles/battle/Battle.module.css';

import getDday from '../../utils/battle/calculateDday.js';

import styles from '../../styles/battle/BattleCreate.module.css';
import BackHeader from '../../components/commons/BackHeader.js';
import Loading from '../../components/commons/Loading.js';

// svg
import editBattle from '../../assets/svg/battle/editBattle.svg';
import selectProfile from '../../assets/svg/battle/selectProfile.svg';
import vsSVG from '../../assets/svg/battle/vs.svg';
import profileImg from '../../assets/images/battle/player-profile.svg';
import { replace } from 'lodash';

const BattleCreate = (props) => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [data, setData] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [battleSetting, setBattleSetting] = useState(null);
  const [initLoading, setInitLoading] = useState(true);
  useEffect(() => {
    if (state === null) navigate('/');
    const battleCode = state.battleCode;
    (async () => {
      const res = await getBattleInfo(battleCode);
      console.log(res.data);
      setData(res.data);
      setEndDate(res.data.endDate);
      setBattleSetting({
        battleCode: res.data.battleCode,
        battleName: res.data.battleName || '',
        startDate: res.data.startDate,
        endDate: res.data.endDate,
        betting: res.data.betting || [], // undfined를 보내면 서버에서 오류 나서 []를 넣어줌
      });
      setInitLoading(false);
    })();
  }, []);

  // METHOD
  // 내기 수정하기 아이콘 클릭했을 때 실행 함수
  const onChangeBetting = () => {
    navigate('/battle/bettingSet', {
      state: {
        battleSetting,
      },
    });
  };
  //  날짜 수정하기 아이콘 클릭했을 때 실행 함수
  const onChangeDate = () => {
    navigate('/battle/dateSet', {
      state: {
        battleSetting,
      },
    });
  };
  const getBattleDate = (type) => {
    const start = new Date();
    const startDateStr = `${start.getMonth() + 1}.${start.getDate()}`;
    const end = new Date(endDate);
    const endDateStr = `${end.getMonth() + 1}.${end.getDate()}`;
    const leftDate = getDday(start, end);
    // return startDateStr + ' ~ ' + endDateStr + '      ' + leftDate + '일간';
    if (type === '일간') {
      return leftDate;
    }
    return startDateStr + ' ~ ' + endDateStr;
  };
  const onBattleStart = async () => {
    if (data.playerList.length !== 2) alert('내기자가 부족합니다.');
    else {
      try {
        const res = await startBattle(data.battleCode);
        if (res.status === 200) {
          navigate('/battle');
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  // 배틀 코드 보기
  const [showBattleCode, setShowBattleCode] = useState(false);
  const handleToggleCodeView = () => {
    // setShowBattleCode(!showBattleCode);
    navigate('/battle/code/see', {
      state: {
        battleCode: state.battleCode,
      },
      replace: true,
    });
  };

  return (
    // 밑의 스타일 수정 필요
    <>
      {/* asdfasdfasdasf */}
      {initLoading ? (
        <Loading />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <BackHeader navigate={navigate} />
          <div className={styles.main}>
            <div className={styles.mainContainer}>
              <div className={styles.showCodeRow}>
                {/* <Link
                  to="/battle/code/see"
                  replace={true}
                  state={{
                    battleCode: state.battleCode,
                  }}
                > */}
                <div
                  onClick={handleToggleCodeView}
                  className={styles.showCode}
                ></div>
                {/* </Link> */}
              </div>
              <div className={styles.titleBox}>
                <div className={styles.titleHeader}>배틀계약서</div>
                <div className={styles.battleTitle}>{data.battleName}</div>
              </div>

              {/*  플레이어가 한 명만 등록되어 있을 떄 */}
              {data.playerList.length === 1 && (
                <div className={styles.playersBox}>
                  <div className={styles.playerBox}>
                    <img
                      className={styles.img}
                      src={`/${data.playerList[0].profileImgPath}`}
                      alt=""
                    />
                    <div className={styles.playerNickname}>
                      {data.playerList[0].nickname}
                    </div>
                    <div className={styles.goalBox}>
                      <div className={styles.goalHeader}>목표</div>
                      <div className={styles.goal}>
                        -{' '}
                        {Math.abs(
                          data.playerList[0].beforeWeight -
                            data.playerList[0].afterWeight,
                        )}{' '}
                        kg
                      </div>
                    </div>
                    <div className={styles.playerStamp} />
                  </div>
                  vs
                  <div className={styles.playerBox}>
                    <Link
                      to="/battle/goalSet"
                      state={{
                        battleCode: battleSetting.battleCode,
                      }}
                    >
                      <div className={styles.profileImg}>
                        <img src={profileImg} alt="" />
                      </div>
                    </Link>
                    <div className={styles.goalBox}>
                      <div className={styles.goalHeader}>목표</div>
                      <div className={styles.goal}>입력전</div>
                    </div>
                    <div className={styles.playerStampHidden} />
                  </div>
                </div>
              )}
              {/* 플레이어가 한 명도 등록되어 있지 않을 때 */}
              {data.playerList.length === 0 && (
                <div className={styles.playersBox}>
                  <div className={styles.playerBox}>
                    <Link
                      to="/battle/goalSet"
                      state={{
                        battleCode: battleSetting.battleCode,
                      }}
                    >
                      <div className={styles.profileImg}>
                        <img src={profileImg} alt="" />
                      </div>
                    </Link>
                    <div className={styles.goalBox}>
                      <div className={styles.goalHeader}>목표</div>
                      <div className={styles.goal}>입력전</div>
                    </div>
                    <div className={styles.playerStampHidden} />
                  </div>
                  vs
                  <div className={styles.playerBox}>
                    <Link
                      to="/battle/goalSet"
                      state={{
                        battleCode: battleSetting.battleCode,
                      }}
                    >
                      <div className={styles.profileImg}>
                        <img src={profileImg} alt="" />
                      </div>
                    </Link>
                    <div className={styles.goalBox}>
                      <div className={styles.goalHeader}>목표</div>
                      <div className={styles.goal}>입력전</div>
                    </div>
                    <div className={styles.playerStampHidden} />
                  </div>
                </div>
              )}
              {/* 플레이거 모두 등록되어 있을 때 */}
              {data.playerList.length === 2 && (
                <div className={styles.playersBox}>
                  <div className={styles.playerBox}>
                    <div className={styles.profileImg}>
                      <img
                        className={styles.img}
                        src={`/${data.playerList[0].profileImgPath}`}
                        alt=""
                      />
                      <div className={styles.playerNickname}>
                        {data.playerList[0].nickname}
                      </div>
                    </div>
                    <div className={styles.goalBox}>
                      <div className={styles.goalHeader}>목표</div>
                      <div className={styles.goal}>
                        -{' '}
                        {Math.abs(
                          data.playerList[0].beforeWeight -
                            data.playerList[0].afterWeight,
                        )}
                      </div>
                    </div>
                    <div className={styles.playerStamp} />
                  </div>
                  vs
                  <div className={styles.playerBox}>
                    <div className={styles.profileImg}>
                      <img
                        className={styles.img}
                        src={`/${data.playerList[1].profileImgPath}`}
                        alt=""
                      />
                      <div className={styles.playerNickname}>
                        {data.playerList[1].nickname}
                      </div>
                    </div>
                    <div className={styles.goalBox}>
                      <div className={styles.goalHeader}>목표</div>
                      <div className={styles.goal}>
                        -{' '}
                        {Math.abs(
                          data.playerList[1].beforeWeight -
                            data.playerList[1].afterWeight,
                        )}
                      </div>
                    </div>
                    <div className={styles.playerStamp} />
                  </div>
                </div>
              )}
            </div>
            {/* 사이드 컨테이너 */}
            <div className={styles.sideContainer}>
              <div className={styles.battleDateBox}>
                <div className={styles.dateHeader}>
                  <div className={styles.dateIcon}></div>
                  <div className={styles.headerText}>기간</div>
                </div>
                <div className={styles.dateContents}>
                  <div className={styles.dateRange}>
                    {getBattleDate('날짜')}
                  </div>
                  <div className={styles.dateDays}>
                    {getBattleDate('일간')}일 간
                  </div>
                  <div onClick={onChangeDate} className={styles.editBtn}></div>
                </div>
              </div>
              <div className={styles.battlePenaltyBox}>
                <div className={styles.penaltyHeader}>
                  <div className={styles.penaltyIcon}></div>
                  <div className={styles.penaltyText}>벌칙</div>
                </div>
                <div className={styles.penaltyContents}>
                  <div className={styles.penaltyList}>
                    {data.betting.map((item) => (
                      <div className={styles.penaltyText}>{item}</div>
                    ))}
                  </div>
                  <div
                    onClick={onChangeBetting}
                    className={styles.editBtn}
                  ></div>
                </div>
              </div>
            </div>
          </div>
          <div onClick={onBattleStart} className={styles.nextBtn}>
            <button>배틀 시작</button>
          </div>
        </div>
      )}
    </>
  );
};

export default BattleCreate;
