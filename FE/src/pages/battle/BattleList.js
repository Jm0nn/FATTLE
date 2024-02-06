import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { createBattle } from '../../services/battle/api.js';

const BattleList = (props) => {
  const userCode = useSelector((state) => state.userCode);
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  useEffect(() => {}, []);
  // 1. 리스트 불러오기

  const onCreateBattle = async () => {
    const res = await createBattle(userCode);
    // setData(res);
    navigate('create', { state: { battleCode: res.data.code } });
  };
  return (
    <>
      <div>받은 초대 코드 입력하기 (분리하기) </div>
      <div>진행중 / 종료</div>

      <ul className="container">
        <li>
          <div>프로필사진</div>
          <div>닉네임</div>
          <div>상대방</div>
          <div>남은일자</div>
          <div>남은일자</div>
          <div>자극자 수</div>
          <div>라이브 진행상태</div>
        </li>
      </ul>

      <button onClick={onCreateBattle}>1 : 1배틀 만들기</button>
    </>
  );
};

export default BattleList;
