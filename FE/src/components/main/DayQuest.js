import React, { useState, useEffect } from "react";
import styles from "../../styles/main/DayQuest.module.css";

function DayQuest() {
  const [completedCount, setCompletedCount] = useState(0);
  const [questList, setQuestList] = useState(Array(10).fill(false));
  const [lastVisitedDate, setLastVisitedDate] = useState(null);

  useEffect(() => {
    // 로컬 스토리지에서 저장된 완료된 퀘스트 정보와 날짜 정보를 가져옴
    const storedQuestList = JSON.parse(localStorage.getItem("questList")) || Array(10).fill(false);
    const storedDate = localStorage.getItem("lastVisitedDate");

    if (storedDate) {
      setLastVisitedDate(new Date(storedDate));
    } else {
      // 날짜 정보가 없으면 초기화
      setLastVisitedDate(new Date());
      setQuestList(Array(10).fill(false));
      setCompletedCount(0);
      localStorage.setItem("questList", JSON.stringify(Array(10).fill(false)));
      localStorage.setItem("lastVisitedDate", new Date().toString());
    }

    setQuestList(storedQuestList);
    const newCompletedCount = storedQuestList.filter((quest) => quest).length;
    setCompletedCount(newCompletedCount);
  }, []);

  const handleQuestClick = (index) => {
    if (completedCount === 10) {
      return; // 7개까지만 클릭 가능하도록 막음
    }

    setQuestList((prevQuestList) => {
      const newQuestList = [...prevQuestList];
      newQuestList[index] = !newQuestList[index];

      // 완료된 퀘스트 개수 계산
      const newCompletedCount = newQuestList.filter((quest) => quest).length;
      setCompletedCount(newCompletedCount);

      // 로컬 스토리지에 완료된 퀘스트 정보와 날짜 정보 저장
      localStorage.setItem("questList", JSON.stringify(newQuestList));
      localStorage.setItem("lastVisitedDate", new Date().toString());

      return newQuestList;
    });
  };

  const questNames = [
    "출석",
    "운동1", "운동2", "운동3", "운동4", "운동5", "운동6",
    "아침식단", "점심식단", "저녁식단"
  ];

  // 자정에 퀘스트 초기화
  useEffect(() => {
    const midnight = new Date();
    midnight.setHours(24, 0, 0, 0);

    const timeUntilMidnight = midnight - new Date();

    const timeout = setTimeout(() => {
      setLastVisitedDate(new Date());
      setQuestList(Array(10).fill(false));
      setCompletedCount(0);
      localStorage.setItem("questList", JSON.stringify(Array(10).fill(false)));
      localStorage.setItem("lastVisitedDate", new Date().toString());
    }, timeUntilMidnight);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className={styles.dayQuestContainer}>
      <h3 className={styles.questTitle}>일일퀘스트</h3>

      <div className={styles.exerciseListContainer}>
        <ul className={styles.exerciseList}>
          {questNames.map((questName, index) => (
            <li
              key={index}
              onClick={() => handleQuestClick(index)}
              className={`${styles.exerciseItem} ${questList[index] ? styles.exerciseItemSelected : styles.exerciseItemUnselected}`}
            >
              <span style={{ alignSelf: "center" }}>{questName}</span>
            </li>
          ))}
        </ul>
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











