import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { createBattle, getBattleList } from '../../services/battle/api.js';

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
  // 1. 리스트 불러오기

  //배틀방 생성하기 누르면 바로 생성
  const onCreateBattle = async () => {
    await createBattle(userCode);
    const res = await getBattleList(userCode);
    if (res.status !== 200) navigate('/login');
    console.log(res.data);
    setData(res.data.list);
    // setData(res.data);
    // navigate('create', { state: { battleCode: res.data.code } });
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
              <li>
                <img src={`/images/${item.imgPath}`} alt="profileImg" />
                <div>
                  <Link
                    to="/battle/detail"
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
                <div>배틀 상태는 진행중</div>
              </li>
            ))}
      </ul>
      {/* 검토중인 배틀방들 */}
      <ul className="container">
        {data &&
          data
            .filter((item) => item.status === 0)
            .map((item, index) => (
              <li>
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
