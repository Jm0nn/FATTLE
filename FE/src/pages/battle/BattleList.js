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
import profileImg from '../../assets/svg/mypage/ProfileImg.svg';
import trashCan from '../../assets/svg/battle/trashCan.svg';
import classification from '../../assets/svg/battle/classfication.svg';
import liveImg from '../../assets/svg/battle/liveImg.svg';
import Invite from '../../assets/svg/battle/battleInvite.svg';

const BattleList = (props) => {
  const userCode = useSelector((state) => state.userCode);
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [activeTab, setActiveTab] = useState('progress'); // progress: 진행중, end: 종료

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
  };

  const onDeleteBattle = async (battleCode) => {
    const res = await deleteBattle(battleCode);
    if (res.status === 200) {
      const updatedBattleList = await getBattleList(userCode);
      setData(updatedBattleList.data.list);
      navigate('/battle');
    } else {
      console.error('배틀 삭제 실패');
    }
  };

  const handleBattleItemClick = (item) => {
    if (!item) {
      console.error('Item is not valid');
      return;
    }

    const isUserInPlaylist =
      item.playerList &&
      item.playerList.some((player) => player.userCode === userCode);
    const isUserInTriggerList =
      item.triggerList &&
      item.triggerList.some((player) => player.userCode === userCode);

    let destination = '/battle/code';
    if (isUserInPlaylist || isUserInTriggerList) {
      destination = '/battle/detail';
    }

    navigate(destination, { state: { battleCode: item.battleCode } });
  };

  return (
    <>
      <header className={BattleStyles.header}>
        <p className={BattleStyles.headerTitle}>배틀 목록</p>
      </header>
      <div className={BattleStyles.wrapper}>
        <Link to="/battle/code" state={{}}>
          <div className={BattleStyles.inviteCodeInput}>
            <img
              className={BattleStyles.inviteImage}
              src={Invite}
              alt="초대장"
            />
            <p>받은 초대 코드 입력하기</p>
          </div>
        </Link>

        <div className={BattleStyles.battleStatus}>
          <div
            className={`${BattleStyles.battleProgress} ${
              activeTab === 'progress' && BattleStyles.active
            }`}
            onClick={() => setActiveTab('progress')}
          >
            진행중
          </div>
          <div
            className={`${BattleStyles.battleEnd} ${
              activeTab === 'end' && BattleStyles.active
            }`}
            onClick={() => setActiveTab('end')}
          >
            종료
          </div>
        </div>

        <ul>
          {data &&
            data
              .filter(
                (item) =>
                  (activeTab === 'progress' &&
                    item.status === 1 &&
                    getDday(new Date(item.startDate), new Date(item.endDate)) >
                      0) ||
                  (activeTab === 'end' &&
                    item.status === 1 &&
                    getDday(
                      new Date(item.startDate),
                      new Date(item.endDate),
                    ) === 0),
              )
              .map((item, index) => (
                <div onClick={() => handleBattleItemClick(item)}>
                  <li key={item.battleCode} className={BattleStyles.container}>
                    <img
                      className={BattleStyles.profileImg}
                      src={profileImg}
                      alt={'아바타 이미지'}
                    />
                    <div className={BattleStyles.content}>
                      <div className={BattleStyles.battleTitle}>
                        {item.name}
                      </div>
                      <div className={BattleStyles.dDay}>
                        <span>
                          {' '}
                          {getDday(
                            new Date(item.startDate),
                            new Date(item.endDate),
                          ) === 0
                            ? '종료'
                            : `D-${getDday(
                                new Date(item.startDate),
                                new Date(item.endDate),
                              )}`}
                        </span>
                      </div>
                      {item.playerList[0].liveStatus === 1 ||
                      item.playerList[0].liveStatus === 1 ? (
                        <img
                          className={BattleStyles.liveImg}
                          src={liveImg}
                          alt={'라이브 표시 이미지'}
                        />
                      ) : null}
                    </div>
                    <div className={BattleStyles.partner}>
                      {item.playerList[0].nickname}
                      &nbsp; vs &nbsp;
                      {item.playerList[0].nickname}
                    </div>
                    <div className={BattleStyles.triggerCnt}>
                      자극자 {item.triggerCnt}명
                    </div>
                    {/* {item.userCode === userCode && (
                      <button onClick={() => onDeleteBattle(item.battleCode)}>
                        배틀 삭제
                      </button>
                    )} */}
                  </li>
                </div>
              ))}
        </ul>

        <ul>
          {data &&
            data
              .filter((item) => item.status === 0 && activeTab === 'progress')
              .map((item, index) => (
                <Link
                  to="/battle/create"
                  state={{
                    battleCode: item.battleCode,
                  }}
                >
                  <li key={item.battleCode} className={BattleStyles.container}>
                    <img
                      className={BattleStyles.profileImg}
                      src={profileImg}
                      alt={'아바타 이미지'}
                    />

                    <div className={BattleStyles.content}>
                      <div className={BattleStyles.battleTitle}>
                        {item.name}
                      </div>
                      <div className={BattleStyles.dDay}>
                        <span> 검토중</span>
                      </div>
                    </div>
                    <div className={BattleStyles.partner}>계약서 검토중</div>

                    {item.userCode === userCode && (
                      <img
                        className={BattleStyles.trashCan}
                        src={trashCan}
                        alt={'삭제 이미지'}
                        onClick={() => onDeleteBattle(item.battleCode)}
                      />
                    )}
                  </li>
                </Link>
              ))}
        </ul>
        <div className={BattleStyles.btnRed} onClick={onCreateBattle}>
          1 : 1배틀 만들기
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BattleList;
