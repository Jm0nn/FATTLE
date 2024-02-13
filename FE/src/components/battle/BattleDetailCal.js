import React, { useEffect, useState } from 'react';
import { getUserInfo } from '../../services/battle/api.js';
import './BattleDetailCal.css'; // CSS 파일 import

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
      {userData && secondUserData && (
        <div className="graphWrap">
          <h2 className="compareTitle">열량 비교</h2>
          <div className="graph">
            <div
              className="graph-item skyblue"
              id="item1-carbo"
              style={{ left: '20px', height: `${userData.carbo}px` }}
            ></div>
            <div
              className="graph-item lime"
              id="item2-carbo"
              style={{ left: '60px', height: `${secondUserData.carbo}px` }}
            ></div>
            <p className="label1">탄</p>
          </div>
          <div className="graph">
            <div
              className="graph-item skyblue"
              id="item1-protein"
              style={{ left: '120px', height: `${userData.protein}px` }}
            ></div>
            <div
              className="graph-item lime"
              id="item2-protein"
              style={{ left: '160px', height: `${secondUserData.protein}px` }}
            ></div>
            <p className="label2">단</p>
          </div>
          <div className="graph">
            <div
              className="graph-item skyblue"
              id="item1-fat"
              style={{ left: '220px', height: `${userData.fat}px` }}
            ></div>
            <div
              className="graph-item lime"
              id="item2-fat"
              style={{ left: '260px', height: `${secondUserData.fat}px` }}
            ></div>
            <p className="label3">지</p>
          </div>
          <div className="container">
            <p>나</p>
            <div className="circle1"></div>
            <p>친구</p>
            <div className="circle2"></div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BattleDetailCal;
