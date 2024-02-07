import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// Component
import Calendar from '../../components/mypage/Calendar';
import BackHeader from '../../components/commons/BackHeader.js';

// utils
import { getCalendarDetail } from '../../services/mypage/api';
import getCalendarList from '../../utils/mypage/getCalendarList.js';

// Styles
import calendarDetailStyles from '../../styles/mypage/CalendarDetail.module.css';
import calendarStyles from '../../styles/mypage/Calendar.module.css';
import getQuestSuccessDayList from '../../utils/mypage/getQuestSuccessDayList.js';

const CalendarDetail = (props) => {
  const userCode = useSelector((state) => state.userCode);
  const [data, setData] = useState(null);
  const [questSuccessDayList, setQuestSuccessDayList] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date().getMonth() + 1);
  const navigate = useNavigate();

  const { dates, isDayInCurrentMonth } = getCalendarList();
  useEffect(() => {
    (async () => {
      try {
        const { data, status } = await getCalendarDetail(
          selectedDate,
          userCode,
        );
        setData(data);
        setQuestSuccessDayList(getQuestSuccessDayList(data.days, 'date'));
      } catch (error) {
        navigate('/');
      }
    })();
  }, []);

  // method
  const getCalendarDayClassName = (day, index) => {
    let className = '';
    if (isDayInCurrentMonth[index]) {
      if (questSuccessDayList.includes(day)) {
        className = className.concat(calendarStyles['success']);
      }
      return className;
    }
    className = className.concat(' ', calendarStyles['other']);
    return className;
  };
  return (
    <>
      <BackHeader navigate={navigate} />
      {data && (
        <>
          <Calendar>
            {dates.map((day, index) => (
              <li
                key={index}
                className={`${calendarStyles.day} ${getCalendarDayClassName(
                  day,
                  index,
                )}`}
              >
                {day}
              </li>
            ))}
          </Calendar>
        </>
      )}
    </>
  );
};

export default CalendarDetail;
