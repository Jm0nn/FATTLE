import React, { useEffect, useState } from 'react';
import { getUserInfo } from '../../services/battle/api.js';

function BattleDetailCal({ userCode, secondPlayeruserCode }) {
  const [userData, setUserData] = useState(null);
  const [secondUserData, setSecondUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userRes = await getUserInfo(userCode);
        setUserData(userRes.data);
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    const fetchSecondUserData = async () => {
      try {
        const userRes = await getUserInfo(secondPlayeruserCode);
        setSecondUserData(userRes.data);
      } catch (error) {
        console.error('Error fetching second user info:', error);
      }
    };

    fetchUserData();
    fetchSecondUserData();
  }, [userCode, secondPlayeruserCode]);

  return (
    <div>
      {/* userData를 이용한 JSX 코드 작성 */}
      {userData && (
        <div>
          <p>User 1:</p>
          <p>{userData.carbo}</p>
          <p>{userData.protein}</p>
          <p>{userData.fat}</p>
          {/* userData의 다른 속성을 필요에 따라 여기에 추가 */}
        </div>
      )}

      {/* secondUserData를 이용한 JSX 코드 작성 */}
      {secondUserData && (
        <div>
          <p>User 2:</p>
          <p>{secondUserData.carbo}</p>
          <p>{secondUserData.protein}</p>
          <p>{secondUserData.fat}</p>
          {/* secondUserData의 다른 속성을 필요에 따라 여기에 추가 */}
        </div>
      )}
    </div>
  );
}

export default BattleDetailCal;
