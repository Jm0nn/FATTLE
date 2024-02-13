import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getBattleInfo } from '../../services/battle/api.js';

function BattleCodeInput() {
  const { state } = useLocation();
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  const handleInputChange = (e) => {
    setPassword(e.target.value);
  };

  const handleJoinRoom = async () => {
    try {
      // 배틀 정보 가져오기
      const res = await getBattleInfo(state.battleCode);
      setData(res.data);

      // 가져온 배틀 정보를 사용하여 비밀번호 설정
      const correctPassword = res.data.battleCode;

      if (password === correctPassword) {
        navigate('/battle/detail', { state: { battleCode: state.battleCode } });
        console.log('방 입장 완료');
      } else {
        alert('비밀번호가 일치하지 않습니다.');
      }
    } catch (error) {
      console.error('Error fetching battle info:', error);
      alert('배틀 정보를 가져오는 데 실패했습니다.');
    }
  };

  return (
    <div>
      <h2>방 비밀번호 입력</h2>
      <input
        type="password"
        placeholder="비밀번호를 입력하세요"
        value={password}
        onChange={handleInputChange}
      />
      <button onClick={handleJoinRoom}>방 입장하기</button>
    </div>
  );
}

export default BattleCodeInput;
