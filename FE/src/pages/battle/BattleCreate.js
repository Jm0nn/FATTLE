import React, { useEffect, useRef, useState } from 'react';
import { getBattleInfo } from '../../services/battle/api.js';
import { useLocation, useNavigate } from 'react-router';

// svg
import editBattle from '../../assets/svg/battle/editBattle.svg';
import selectProfile from '../../assets/svg/battle/selectProfile.svg';

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
      setData(res.data);
      setEndDate(res.data.endDate);
      setBattleSetting({
        battleCode: res.data.battleCode,
        battleName: res.data.battleName,
        startDate: res.data.startDate,
        endDate: res.data.endDate,
        betting: res.data.battle || [], // undfined를 보내면 서버에서 오류 나서 []를 넣어줌
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
    const leftDate =
      Math.floor(
        Math.abs((start.getTime() - end.getTime()) / (1000 * 60 * 60 * 24)),
      ) + 2;
    return startDateStr + ' ~ ' + endDateStr + '   ' + leftDate + '일간';
  };
  return (
    <>
      {data && (
        <>
          <div>배틀계약서</div>
          <h2>{data.battleName || '배틀방 이름'}</h2>

          {/* 내기자로 등록된 사용자가 있다면 랜더링 하는 부분 */}
          {data.playerList.length === 1 && (
            <>
              <img
                src={`/images/profiles/${data.playerList[0].imgPath}`}
                alt=""
              />
              <img src={selectProfile} alt="selectProfile" />
            </>
          )}
          {data.playerList.length === 0 && (
            <>
              <div>
                <img src={selectProfile} alt="selectProfile" />
              </div>
              <div>
                <img src={selectProfile} alt="selectProfile" />
              </div>
            </>
          )}
          {data.playerList.length === 2 && (
            <>
              <div>
                <img
                  src={`/images/profiles/${data.playerList[0].imgPath}`}
                  alt=""
                />
              </div>
              <div>
                <img
                  src={`/images/profiles/${data.playerList[0].imgPath}`}
                  alt=""
                />
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
    </>
  );
};

export default BattleCreate;
