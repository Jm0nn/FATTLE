import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import {
  createBattle,
  deleteBattle,
  getBattleList,
} from '../../services/battle/api.js';

import getDday from '../../utils/battle/calculateDday.js';
import Footer from '../../commons/Footer';
import { Link } from 'react-router-dom';
import BackHeader from '../../components/commons/BackHeader.js';
import BattleStyles from '../../styles/battle/Battle.module.css';
const BattleList = (props) => {
  const userCode = useSelector((state) => state.userCode);
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  useEffect(() => {
    (async () => {
      console.log(userCode);
      const res = await getBattleList(userCode);
      if (res.status !== 200) navigate('/login');
      console.log(res.data);
      setData(res.data.list);
    })();
  }, []);

  const onCreateBattle = async () => {
    await createBattle(userCode);
    const res = await getBattleList(userCode);
    if (res.status !== 200) navigate('/login');
    console.log(res.data);
    setData(res.data.list);
    // setData(res.data);
    // navigate('create', { state: { battleCode: res.data.code } });
  };
  // 배틀 삭제
  const onDeleteBattle = async (battleCode) => {
    const res = await deleteBattle(battleCode);
    if (res.status === 200) {
      // 삭제가 성공한 경우, 배틀 목록 다시 불러오기
      const updatedBattleList = await getBattleList(userCode);
      setData(updatedBattleList.data.list);
    } else {
      console.error('배틀 삭제 실패');
    }
  };

  const handleBattleItemClick = (item) => {
    // item이 유효한지 확인
    if (!item) {
      console.error('Item is not valid');
      return;
    }

    // item.playerList가 정의되어 있고 유효한 경우에만 사용자 확인
    const isUserInPlaylist =
      item.playerList &&
      item.playerList.some((player) => player.userCode === userCode);
    // item.triggerList가 정의되어 있고 유효한 경우에만 사용자 확인
    const isUserInTriggerList =
      item.triggerList &&
      item.triggerList.some((player) => player.userCode === userCode);

    // 사용자의 userCode가 포함되어 있으면 battle/detail 페이지로 이동, 아니면 battle/code 페이지로 이동
    let destination = '/battle/code'; // 기본적으로는 코드 페이지로 이동
    if (isUserInPlaylist || isUserInTriggerList) {
      destination = '/battle/code'; // 사용자가 플레이어 목록이나 트리거 목록에 포함된 경우 디테일 페이지로 이동
    }

    navigate(destination, { state: { battleCode: item.battleCode } });
  };
  return (
    <>
      <BackHeader navigate={navigate} />
      <div>받은 초대 코드 입력하기 (분리하기) </div>
      <div>진행중 / 종료</div>

      <ul className="container">
        {data &&
          data
            .filter((item) => item.status === 1)
            .map((item, index) => (
              <li key={index}>
                <img src={`/images/${item.imgPath}`} alt="profileImg" />
                <div>
                  <h3 onClick={() => handleBattleItemClick(item)}>
                    {item.name}
                  </h3>
                  <span>
                    {' '}
                    D-day :
                    {getDday(new Date(item.startDate), new Date(item.endDate))}
                  </span>
                </div>
                <div>{item.nickname}가 생성</div>
                <div>자극자 수 : {item.triggerCnt}</div>
                <div>
                  {getDday(new Date(item.startDate), new Date(item.endDate)) ===
                  0
                    ? '배틀 상태는 종료'
                    : '배틀 상태는 진행중'}
                </div>
                {item.userCode === userCode && (
                  <button onClick={() => onDeleteBattle(item.battleCode)}>
                    배틀 삭제
                  </button>
                )}
              </li>
            ))}
      </ul>
      {/* 검토중인 배틀방들 */}
      <ul className="container">
        {data &&
          data
            .filter((item) => item.status === 0)
            .map((item, index) => (
              <li key={index}>
                <img src={`/images/${item.imgPath}`} alt="profileImg" />
                <div>
                  <Link
                    to="/battle/create"
                    state={{
                      battleCode: item.battleCode,
                    }}
                  >
                    <h3>{item.name}</h3>
                  </Link>
                  <span>
                    {' '}
                    D-day :
                    {getDday(new Date(item.startDate), new Date(item.endDate))}
                  </span>
                </div>
                <div>{item.nickname}가 생성</div>
                <div>자극자 수 : {item.triggerCnt}</div>
                <div>배틀 상태는 검토중</div>
                {item.userCode === userCode && (
                  <button onClick={() => onDeleteBattle(item.battleCode)}>
                    배틀 삭제
                  </button>
                )}
              </li>
            ))}
      </ul>
      <button className={BattleStyles.btnRed} onClick={onCreateBattle}>
        1 : 1배틀 만들기
      </button>
      <Footer />
    </>
  );
};

export default BattleList;
