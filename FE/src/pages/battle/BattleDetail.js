import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getBattleInfo } from '../../services/battle/api.js';

const BattleDetail = (props) => {
  const { state } = useLocation();
  const [data, setData] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    if (state === null) {
      navigate('/battle');
      return;
    }
    (async () => {
      const res = await getBattleInfo(state.battleCode);
      setData(res.data);
      console.log(res.data);
    })();
  }, []);
  return (
    <div>
      배틀 디테일 페이지 <br />
      <Link to="/battle/live" state={{}}>
        라이브 방송 하기
      </Link>
    </div>
  );
};

export default BattleDetail;
