import { useState } from 'react';
import axios from 'axios';
import { API } from '../../services/login/URL';
const NickName = () => {
  const [nickName, setNickName] = useState('');
  const [dupli, setDupli] = useState(true);
  return (
    <div>
      <input
        placeholder="닉네임 입력"
        onChange={(e) => {
          setDupli(true);
          setNickName(e.target.value);
          console.log(nickName);
        }}
      ></input>
      <button
        onClick={() => {
          console.log(nickName);
          console.log(`${API.NICKNAME_GET}${nickName}`);
          axios // NICKNAME_GET
            .get(`${API.NICKNAME_GET}${nickName}`)
            .then((res) => {
              console.log(res);
              setDupli(false);
              console.log(dupli);
            })
            .catch((err) => {
              if (nickName.length === 0) {
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
  );
};

export default NickName;
