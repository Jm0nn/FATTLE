import React, { useEffect, useRef, useState } from 'react';
import { patchMypage } from '../../services/mypage/api';
import { useLocation } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// import styles
import styles from '../../styles/mypage/MypageModify.module.css';
import BackHeader from '../../components/commons/BackHeader';
const MypageModify = () => {
  const userCode = useSelector((state) => state.userCode);
  const { state } = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (state === null) {
      navigate('/login');
    } else {
      setNickname(state.nickname);
      setIntroduction(state.introduction);
    }
  }, []);
  const [nickname, setNickname] = useState('');
  const [introduction, setIntroduction] = useState('');
  // variable
  const nicknameInput = useRef(null);
  const introductionTextarea = useRef(null);

  // const [status, setStatus] = useState('');

  // method
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(userCode);
    try {
      const status = await patchMypage({
        userCode,
        nickname,
        introduction,
      });
      if (status === 200) {
        navigate('/mypage');
      } else {
        alert('수정실패');
      }
    } catch (error) {
      console.log(error);
      navigate('/');
    }
  };
  const onChangeHandler = (e) => {
    if (e.target === nicknameInput.current) {
      setNickname(e.target.value);
    } else {
      // textaea 변화 감지 로직
      if (e.target.value.length >= 155) {
      } else {
        setIntroduction(e.target.value);
      }
    }
  };

  return (
    <>
      {state !== null && (
        <>
          <div className={styles.container}>
            <BackHeader title={'프로필 수정'} navigate={navigate} />
            <main className={styles.main}>
              <div className={styles.profile}>
                <img src={`/${state.profileImg}`} alt="profileImg" />
              </div>
              <div className={styles.group}>
                <div>
                  <label className={styles.label} htmlFor="nickname">
                    닉네임
                  </label>
                </div>
                <div>
                  <input
                    className={styles.input}
                    type="text"
                    name="nickname"
                    ref={nicknameInput}
                    value={nickname}
                    placeholder="닉네임"
                    onChange={(e) => {
                      onChangeHandler(e);
                    }}
                  />
                </div>
              </div>
              <div className={styles.group}>
                <div>
                  <label className={styles.label} htmlFor="introduction">
                    소개말
                  </label>
                </div>
                <div>
                  {' '}
                  <textarea
                    className={styles.textarea}
                    spellCheck="false"
                    name="introduction"
                    type="text"
                    ref={introductionTextarea}
                    value={introduction}
                    placeholder="자기 소개"
                    onChange={(e) => {
                      onChangeHandler(e);
                    }}
                  />
                </div>
              </div>
              <button className={styles.btn} onClick={handleSubmit}>
                수정하기
              </button>
            </main>
          </div>
        </>
      )}
    </>
  );
};

export default MypageModify;
