import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { API } from '../../../services/login/URL';
import { changeCode } from '../../../store/store';
const KakaoLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get('code');
    axios // KAKAO_GET
      .get(`${API.KAKAO_GET}${code}`)
      .then((res1) => {
        axios // LOGIN_GET
          .get(`${API.LOGIN_CALLBACK_GET}${res1.data.userCode}`)
          .then((res2) => {
            if (res2.status === 200) {
              dispatch(changeCode(res1.data.userCode));
              navigate('/');
            } else if (res2.status === 204) {
              navigate('/join/page1', {
                state: {
                  userCode: res1.data.userCode,
                },
              });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
};

export default KakaoLogin;
