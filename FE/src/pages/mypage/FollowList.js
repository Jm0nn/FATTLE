import React, { useEffect, useRef, useState } from 'react';
import { getFollowerList, getFollowingList } from '../../services/mypage/api';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileImg from '../../assets/svg/mypage/ProfileImg.svg';
import BackHeader from '../../components/commons/BackHeader';

// style import
import styles from '../../styles/mypage/FolloweList.module.css';
const FollowList = () => {
  const userCode = useSelector((state) => state.userCode);
  const followerEle = useRef(null);
  const followingEle = useRef(null);
  const navigate = useNavigate();
  const { state } = useLocation();
  const [mode, setMode] = useState(null);
  let key = 0;
  const [data, setData] = useState(null);
  useEffect(() => {
    // who에 따라 팔로잉을 불러올지 팔로워를 불러올지 분기해줌
    if (state === null) {
      navigate('/');
    } else {
      setMode(state.who);
      first();
    }
  }, []);
  const first = async () => {
    if (state.who === 'follower') {
      setData(await getFollowerList(userCode));
    } else if (state.who === 'following') {
      setData(await getFollowingList(userCode));
    }
    selectAndClassNameAdd(state.who);
  };
  // 팔로잉, 팔로우 탭 클릭했을 때 밑선 색 변화해주는 함수
  const selectAndClassNameAdd = (select) => {
    if (select === 'follower') {
      followerEle.current.classList.add(styles.active);
      followingEle.current.classList.remove(styles.active);
    } else {
      followingEle.current.classList.add(styles.active);
      followerEle.current.classList.remove(styles.active);
    }
  };
  const selectTab = async (select) => {
    if (select === 'follower') {
      setData(await getFollowerList(userCode));
    } else {
      setData(await getFollowingList(userCode));
    }
    selectAndClassNameAdd(select);
  };
  return (
    <>
      {state !== null && (
        <>
          <div className={styles.container}>
            <BackHeader title="팔로워/팔로잉" navigate={navigate} />
            <div className={styles.header}>
              <div
                ref={followerEle}
                className={styles.follower}
                onClick={async () => selectTab('follower')}
              >
                팔로워&nbsp; {state.followerCnt}
              </div>
              <div
                ref={followingEle}
                className={styles.following}
                onClick={async () => selectTab('following')}
              >
                팔로잉&nbsp; {state.followingCnt}
              </div>
            </div>
            {/* 구분선 */}
            {data && (
              <div className={styles.listContainer}>
                {data.map((user) => (
                  <div className={styles.listItem}>
                    <img src={ProfileImg} alt="profileImg" />
                    <div>{user.nickname}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default FollowList;
