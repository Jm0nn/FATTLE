import React, { useEffect, useState } from 'react';
import { BattleFood } from '../../services/battle/api.js';

function BattleDetailFood({ userCode, secondPlayeruserCode }) {
  const [userFoodList, setUserFoodList] = useState([]);
  const [secondPlayerFoodList, setSecondPlayerFoodList] = useState([]);

  useEffect(() => {
    const fetchFoodList = async () => {
      try {
        // 첫 번째 유저의 음식 목록 불러오기
        const userFoodResponse = await BattleFood(userCode);
        setUserFoodList(userFoodResponse.data.list);

        // 두 번째 유저의 음식 목록 불러오기
        const secondPlayerFoodResponse = await BattleFood(secondPlayeruserCode);
        setSecondPlayerFoodList(secondPlayerFoodResponse.data.list);

        console.log('123');
      } catch (error) {
        console.error('Error fetching battle food list:', error);
      }
    };

    fetchFoodList();
  }, [userCode, secondPlayeruserCode]);

  return (
    <div>
      <div>
        <p>User1:</p>
        {userFoodList.map((food, index) => (
          <div key={index}>
            <img src={food.imgPath} alt={`User Food ${index}`} />
            <p>{food.nickname}</p>
          </div>
        ))}
      </div>
      <div>
        <p>User2:</p>
        {secondPlayerFoodList.map((food, index) => (
          <div key={index}>
            <img src={food.imgPath} alt={`Second Player Food ${index}`} />
            <p>{food.nickname}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BattleDetailFood;
