import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function ExpHistory() {
  const [expHistory, setExpHistory] = useState([])
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    axios.get('http://localhost:5000/ExpHistory')
      .then(response => {
        if (response.data.history) {
          const history = response.data.history
          setExpHistory(history)
        } else {
          setError('경험치 히스토리 데이터가 존재하지 않습니다.')
        }
      })
      .catch(error => {
        setError('경험치 히스토리 데이터를 불러오는 중 에러 발생:', error)
      });
  }, []);

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div>
      <button onClick={handleGoBack}>&lt;</button>
      <h2>경험치 히스토리</h2>
      {error ? (
        <p>{error}</p>
      ) : (
        <ul>
          {expHistory.map((historyEntry, index) => (
            <li key={index}>
              <p>날짜: {historyEntry.exp_dt}</p>
              <p>유형: {historyEntry.exp_type}</p>
              <p>포인트: +{historyEntry.exp_point}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ExpHistory