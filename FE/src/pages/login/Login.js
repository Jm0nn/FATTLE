// import './Login.css';
import styles from '../../styles/login/Login.module.css';
// import KakaoBtn from '../../assets/login/kakao_btn';
import { useDispatch, useSelector } from 'react-redux';
import kakao_btn from '../../assets/login/kakao_btn.png';
import { API } from '../../services/login/URL';
const Login = () => {
  return (
    <div>
      <div className={styles.background}>
        <p className={styles.LoginText}>ㅤ</p>
        <div className={styles.wrapper}>
          <div className={styles.title}>
            <div className={styles.title_font}>FATTLE</div>
            <div className={styles.content_font}>
              친구와의 배틀을 통해
              <br></br>
              캐릭터와 함께 성장하는 다이어트
            </div>
          </div>
          <div className={styles.kakao}>
            <div
              className={styles.kakaoBtn}
              type="button"
              onClick={(e) => {
                e.preventDefault();
                // 주소로 이동 후 Login-callback.js에 데이터 전달
                window.location.href = `${API.LOGIN_GET}`;
              }}
            >
              <img
                className={styles.kakao}
                src={kakao_btn}
                alt="Kakao Button"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
