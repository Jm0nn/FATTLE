import './Login.css';
// import KakaoBtn from '../../assets/login/kakao_btn';
import { useDispatch, useSelector } from 'react-redux';
import kakao_btn from '../../assets/login/kakao_btn.png';
import { API } from '../../services/login/URL';
const Login = () => {
  return (
    <div>
      <div className="background">
        <p className="LoginText">ㅤ</p>
        <div className="wrapper">
          <div className="title">
            <div className="title_font">FATTLE</div>
          </div>

          <div className="kakao">
            <a
              className="kakaoBtn"
              type="button"
              onClick={(e) => {
                e.preventDefault();
                // 주소로 이동 후 Login-callback.js에 데이터 전달
                window.location.href = `${API.LOGIN_GET}`;
              }}
            >
              <img className="kakao" src={kakao_btn} alt="Kakao Button" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
