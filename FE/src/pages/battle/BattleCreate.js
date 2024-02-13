import React, { useEffect, useRef, useState } from 'react';
import { getBattleInfo, startBattle } from '../../services/battle/api.js';
import { useLocation, useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import BattleStyles from '../../styles/battle/Battle.module.css';

import getDday from '../../utils/battle/calculateDday.js';
import BackHeader from '../../components/commons/BackHeader.js';

// svg
import editBattle from '../../assets/svg/battle/editBattle.svg';
import selectProfile from '../../assets/svg/battle/selectProfile.svg';
import vsSVG from '../../assets/svg/battle/vs.svg';

const BattleCreate = (props) => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [data, setData] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [battleSetting, setBattleSetting] = useState(null);
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
  const getBattleDate = () => {
    const start = new Date();
    const startDateStr = `${start.getMonth() + 1}.${start.getDate()}`;
    const end = new Date(endDate);
    const endDateStr = `${end.getMonth() + 1}.${end.getDate()}`;
    const leftDate = getDday(start, end);
    return startDateStr + ' ~ ' + endDateStr + '   ' + leftDate + '일간';
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
    setShowBattleCode(!showBattleCode);
  };

  return (
    // 밑의 스타일 수정 필요
    <>
      <BackHeader navigate={navigate} />
      <div
        style={{
          backgroundColor: '#FF9A23',
          height: '100%',
        }}
      >
        {data && (
          <>
            <div>배틀계약서</div>
            <p style={{ border: '2px solid black' }}>
              {showBattleCode ? (
                <>배틀 코드: {data.battleCode}</>
              ) : (
                <button onClick={handleToggleCodeView}>배틀 코드</button>
              )}
            </p>
            <h2>{data.battleName || '배틀방 이름'}</h2>

            {/* 내기자로 등록된 사용자가 있다면 랜더링 하는 부분 */}
            {data.playerList.length === 1 && (
              <>
                <div>
                  <img src={`/images/${data.playerList[0].imgPath}`} alt="" />
                  <p>{data.playerList[0].nickname}</p>
                  <p>시작 체중 : {data.playerList[0].beforeWeight}</p>
                  <p>목표 체중 : {data.playerList[0].goalWeight}</p>
                </div>
                <div>
                  <img src={vsSVG} alt="vsSVG" />
                </div>
                <Link
                  to="/battle/goalSet"
                  state={{
                    battleCode: battleSetting.battleCode,
                  }}
                >
                  <img src={selectProfile} alt="selectProfile" />
                </Link>
              </>
            )}
            {data.playerList.length === 0 && (
              <>
                <div>
                  <Link
                    to="/battle/goalSet"
                    state={{
                      battleCode: battleSetting.battleCode,
                    }}
                  >
                    <img src={selectProfile} alt="selectProfile" />
                  </Link>
                </div>
                <div>
                  <Link
                    to="/battle/goalSet"
                    state={{
                      battleCode: battleSetting.battleCode,
                    }}
                  >
                    <img src={selectProfile} alt="selectProfile" />
                  </Link>
                </div>
              </>
            )}
            {data.playerList.length === 2 && (
              <>
                <div>
                  <img src={`/images/${data.playerList[0].imgPath}`} alt="" />
                  <p>{data.playerList[0].nickname}</p>
                  <p>시작 체중 : {data.playerList[0].beforeWeight}</p>
                  <p>목표 체중 : {data.playerList[0].goalWeight}</p>
                </div>
                <img src={vsSVG} alt="vsSVG" />
                <div>
                  <img src={`/images/${data.playerList[1].imgPath}`} alt="" />
                  <p>{data.playerList[1].nickname}</p>
                  <p>시작 체중 : {data.playerList[1].beforeWeight}</p>
                  <p>목표 체중 : {data.playerList[1].goalWeight}</p>
                </div>
              </>
            )}
            <div>
              <div>기간</div>
              <div>
                {getBattleDate()}
                <span onClick={onChangeDate}>
                  <img src={editBattle} alt="editBattle" />
                </span>
              </div>
            </div>
            <div>
              <div>벌칙</div>
              <div>
                {data.betting.map((item) => (
                  <p>{item}</p>
                ))}
                <span onClick={onChangeBetting}>
                  <img src={editBattle} alt="editBattle" />
                </span>
              </div>
            </div>
          </>
        )}
        <button className={BattleStyles.btn} onClick={onBattleStart}>
          배틀 시작
        </button>
      </div>
    </>
  );
};

export default BattleCreate;
