import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Main from './../pages/main/Main';
import Login from './../pages/login/Login';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Auth = (props) => {
  const [page, setPage] = useState(false);

  const userCode = useSelector((state) => {
    return state.userCode;
  });

  useEffect(() => {
    axios.get(`http://localhost:8000/user/login/${userCode}`).then((res) => {
      console.log(res.status);
      if (res.status === 200) {
        setPage(true);
      } else {
        setPage(false);
      }
    });
  }, []);
  if (page) {
    return (
      <div>
        <Main />
        <Navigate to={'/'} />
      </div>
    );
  } else {
    return (
      <div>
        <Login />
        <Navigate to={'/login'} />
      </div>
    );
  }
};

export default Auth;
