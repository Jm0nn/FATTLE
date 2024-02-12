import React, { useEffect, useState } from 'react';
import { getGoal } from '../../services/mypage/api';

const Goal = (props) => {
  const [data, setData] = useState(null);
  useEffect(() => {
    (async () => {
      setData(await getGoal(1));
    })();
  }, []);
  return (
    <>
      {data && (
        <div key={data.age}>
          나이 : {data.age}키 : {data.height}
          체중 : {data.weight}
          목표체중 : {data.goalWeight}
          칼로리 : {data.calory}
          탄수화물 : {data.carbo}
          단백질 : {data.protein}
          지방 : {data.fat}
        </div>
      )}
    </>
  );
};

export default Goal;
