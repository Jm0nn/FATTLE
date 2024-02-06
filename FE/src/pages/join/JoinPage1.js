import { useState } from 'react';
import { API } from '../../services/login/URL';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
// 닉네임 중복 체크 컴포넌트
const JoinPage1 = () => {
  const location = useLocation();

  const navigate = useNavigate();
  const [joinInfo, setJoinInfo] = useState({
    userCode: location.state.userCode,
    nickname: '',
    sex: '',
    height: '',
    weight: '',
    goalWeight: '',
    goalCalory: '',
    goalCarbon: '',
    goalProtein: '',
    goalFat: '',
  });
  const [dupli, setDupli] = useState(true);
  return (
    <div>
      <div className="nameCheck">
        <input
          placeholder="닉네임 입력"
          onChange={(e) => {
            setDupli(true);
            setJoinInfo({
              ...joinInfo,
              nickname: e.target.value,
            });
          }}
        ></input>
        <button
          onClick={() => {
            axios // NICKNAME_GET
              .get(`${API.NICKNAME_GET}${joinInfo.nickname}`)
              .then((res) => {
                alert('좋은 닉네임 입니다.');
                setDupli(false);
              })
              .catch((err) => {
                if (joinInfo.nickname.length === 0) {
                  alert('닉네임을 입력해 주세요!!!');
                } else {
                  alert('중복된 닉네임 입니다!!!');
                }
                console.log(err);
              });
          }}
        >
          중복 확인
        </button>
      </div>

      <div className="genderCheck">
        <label>
          <input
            type="radio"
            name="gender"
            onClick={() => {
              setJoinInfo({
                ...joinInfo,
                sex: 'M',
              });
            }}
          />
          남자
        </label>
        <label>
          <input
            type="radio"
            name="gender"
            onClick={() => {
              setJoinInfo({
                ...joinInfo,
                sex: 'W',
              });
            }}
          />
          여자
        </label>
      </div>

      <div className="myInfo">
        <input
          placeholder="CM"
          onChange={(e) => {
            setJoinInfo({
              ...joinInfo,
              height: e.target.value,
            });
          }}
        ></input>
      </div>
      <div className="goal">
        <input
          placeholder="Kg"
          onChange={(e) => {
            setJoinInfo({
              ...joinInfo,
              weight: e.target.value,
            });
          }}
        ></input>
        <input
          placeholder="goalKg"
          onChange={(e) => {
            setJoinInfo({
              ...joinInfo,
              goalWeight: e.target.value,
            });
          }}
        ></input>
      </div>

      <div className="next">
        <button
          disabled={dupli}
          onClick={() => {
            navigate('/join/page2', {
              state: {
                userCode: joinInfo.userCode,
                nickname: joinInfo.nickname,
                sex: joinInfo.sex,
                height: joinInfo.height,
                weight: joinInfo.weight,
                goalWeight: joinInfo.goalWeight,
                goalCalory: joinInfo.goalCalory,
                goalCarbon: joinInfo.goalCarbon,
                goalProtein: joinInfo.goalProtein,
                goalFat: joinInfo.goalFat,
              },
            });
          }}
        >
          다음
        </button>
      </div>
    </div>
  );
};

export default JoinPage1;
