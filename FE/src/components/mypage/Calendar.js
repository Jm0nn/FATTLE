import React from 'react';
import styles from '../../styles/mypage/Calendar.module.css';
// svg import
import CalendarSVG from '../../assets/svg/mypage/Calendar.svg';

const Calendar = ({ children }) => {
  return (
    <div className={styles.wrapper}>
      <header>
        <div className={styles.nav}>
          {/* <button className={styles['material-icons']}> chevron_left </button> */}
          <p className={styles['current-date']}>
            <img
              style={{ display: 'inline-block', marginRight: '5px' }}
              src={CalendarSVG}
              alt="calendarSVG"
            />
            2024. 01
          </p>
          {/* <button className={styles['material-icons']}> chevron_right</button> */}
        </div>
      </header>
      <div className={styles.calendar}>
        <ul className={styles.weeks}>
          <li className={styles.date}>일</li>
          <li className={styles.date}>월</li>
          <li className={styles.date}>화</li>
          <li className={styles.date}>수</li>
          <li className={styles.date}>목</li>
          <li className={styles.date}>금</li>
          <li className={styles.date}>토</li>
        </ul>
        <ul className={styles.days}>{children}</ul>
      </div>
    </div>
  );
};

export default Calendar;
