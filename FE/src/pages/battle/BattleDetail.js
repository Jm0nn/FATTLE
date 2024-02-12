import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getBattleInfo } from '../../services/battle/api.js';
import { useSelector } from 'react-redux';
import BattleStyles from '../../styles/battle/Battle.module.css';
import { Fragment } from 'react';

const BattleDetail = (props) => {
  const { state } = useLocation();
  const userCode = useSelector((state) => state.userCode);
  const [data, setData] = useState();
  const [playerList, setPlayerList] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (state === null) {
      navigate('/battle');
      return;
    }
    (async () => {
      const res = await getBattleInfo(state.battleCode);
      setData(res.data);
      setPlayerList(res.data.playerList);
      console.log(res.data);
      console.log(userCode);
    })();
  }, []);
  return (
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
                  sessionId: data.battleCode + '_' + userCode,
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
                  sessionId: data.battleCode + '_' + item.userCode,
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
    </>
  );
};

export default BattleDetail;
