import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../../styles/main/DayQuest.module.css';
import API from '../../services/main/URL';
import { useSelector } from 'react-redux';
import checkImg from '../../assets/images/main/check.svg';
import notCheckImg from '../../assets/images/main/notcheck.svg';

// 각 운동 코드와 설명을 매핑하는 객체
const exerciseDescriptions = {
  run: '러닝 30분',
  pus: '팔굽혀 펴기 50회',
  bur: '버피 테스트 20회',
  pla: '플랭크 1분',
  squ: '스쿼트 20개',
  pul: '턱걸이 10개',
};

function DayQuest() {
  const [completedCount, setCompletedCount] = useState(1);
  const [questList, setQuestList] = useState([]);
  const [lastVisitedDate, setLastVisitedDate] = useState(null);
  const [selectedBars, setSelectedBars] = useState([]);
  const userCode = useSelector((state) => {
    return state.userCode;
  });

  useEffect(() => {
    axios
      .get(`${API.QUEST_LIST_GET}${userCode}`)
      .then((response) => {
        setQuestList(response.data);
      })
      .catch((error) => {
        console.error('데이터를 불러오는 데 실패했습니다:', error.message);
      });
  }, []);

  const handleQuestClick = (index, value) => {
    const isSelected = selectedBars.includes(index);
    const newValue = isSelected ? -value : value;

    setSelectedBars((prevSelectedBars) => {
      if (isSelected) {
        return prevSelectedBars.filter((barIndex) => barIndex !== index);
      } else {
        return [...prevSelectedBars, index];
      }
    });

    // 퀘스트 클릭 시 해당 값을 서버에 업데이트
    axios
      .post(`${API.UPDATE_QUEST_POST}`, {
        userCode: userCode,
        exercise: 'RUN',
      })
      .then((response) => {
        // 성공적으로 업데이트된 경우에만 로컬 상태 업데이트
        setCompletedCount((prevCount) => prevCount + newValue);
      })
      .catch((error) => {
        console.error('퀘스트를 업데이트하는 데 실패했습니다:', error.message);
      });
  };

  return (
    <div className={styles.dayQuestContainer}>
      <h3 className={styles.questTitle}>일일퀘스트</h3>

      <div className={styles.exerciseListContainer}>
        <div
          className={`${styles.exerciseItem} ${
            questList.foodCnt > 0
              ? styles.exerciseItemSelected
              : styles.exerciseItemUnselected
          }`}
          onClick={() => handleQuestClick(-1, questList.foodCnt)}
        >
          <p>건강한 식단 먹기: {questList.foodCnt}</p>
          <img
            src={questList.foodCnt > 0 ? checkImg : notCheckImg}
            alt="Check icon"
            className={styles.checkImage}
          />
        </div>
        <div
          className={`${styles.exerciseItem} ${
            questList.dayCheck === 1
              ? styles.exerciseItemSelected
              : styles.exerciseItemUnselected
          }`}
          onClick={() => handleQuestClick(-2, questList.dayCheck)}
        >
          <p>출석 체크: {questList.dayCheck}</p>
          <img
            src={questList.dayCheck === 1 ? checkImg : notCheckImg}
            alt="Check icon"
            className={styles.checkImage}
          />
        </div>
        {/* exercise의 각 항목 출력 */}
        {questList.exercise &&
          Object.entries(questList.exercise).map(([key, value], index) => (
            <div
              key={key}
              className={`${styles.exerciseItem} ${
                value === 1
                  ? styles.exerciseItemSelected
                  : styles.exerciseItemUnselected
              }`}
              onClick={() => handleQuestClick(index, value)}
            >
              <p>
                {exerciseDescriptions[key]}: {value}
              </p>
              <img
                src={value === 1 ? checkImg : notCheckImg}
                alt="Check icon"
                className={styles.checkImage}
              />
            </div>
          ))}
      </div>

      {/* 완료된 퀘스트 개수가 7개까지만 표시 */}
      {completedCount < 7 ? (
        <p>{`${completedCount}/7`}</p>
      ) : (
        <p>오늘 퀘스트 완료</p>
      )}
    </div>
  );
}

export default DayQuest;
