import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Frame2 from '../../assets/images/main/Frame2.svg';
import API from '../../services/main/URL';
import styles from '../../styles/mypage/MyGoal.module.css';
// import styles from '../../styles/main/BodyinfoModify.module.css';
import { useSelector } from 'react-redux';
const MyGoal = ({ setWeight1, setHeight1 }) => {
  const [height, setHeight] = useState(0);
  // const [weight, setWeight] = useState(0);
  const [isChange, setIsChange] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [weight, setWeight] = useState(0);
  const [kcal, setKcal] = useState(0);
  const [carbon, setCarbon] = useState(0);
  const [protein, setProtein] = useState(0);
  const [fat, setFat] = useState(0);

  const userCode = useSelector((state) => {
    return state.userCode;
  });

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const HandleFormSubmit = (e) => {
    axios
      .patch(`${API.USER_MODIFY_PATCH}`, {
        userCode,
        height,
        weight,
      })
      .then((res) => {
        console.log(res);
        axios
          .get(`${API.USER_GET}${userCode}`)
          .then((res) => {
            console.log(res);
            setWeight1(res.data.weight);
            setHeight1(res.data.height);
          })
          .catch((err) => {
            console.log(err);
          });
        // navigate('/');
      })
      .catch((err) => {
        console.log(err);
      });
    e.preventDefault();
    closeModal();
  };

  return (
    <div>
      나의 목표
      <img
        src={Frame2}
        alt="Click to open modal"
        onClick={() => {
          axios.get(`${API.USER_GET}${userCode}`).then((res) => {
            console.log(res);
            setWeight(res.data.weight);
            setKcal(res.data.goalCalory);
            setCarbon(res.data.goalCarbo);
            setProtein(res.data.goalProtein);
            setFat(res.data.goalFat);
          });
          openModal();
        }}
        className={styles.imgStyle}
      />
      {isModalOpen && (
        <div className={styles.modaloverlay} onClick={closeModal}>
          <div
            className={styles.modalcontent}
            onClick={(e) => e.stopPropagation()}
          >
            <button className={styles.closebutton} onClick={closeModal}>
              &times;
            </button>
            <form onSubmit={HandleFormSubmit}>
              <div>
                <label htmlFor="weight">목표 체중</label>
                <input
                  type="text"
                  id="weight"
                  value={weight}
                  onChange={(e) => {
                    setWeight(e.target.value);
                  }}
                  className={styles.inputstyle}
                />
                cm
              </div>
              <div>
                <label htmlFor="kcal">칼로리</label>
                <input
                  type="text"
                  id="kcal"
                  value={kcal}
                  onChange={(e) => {
                    setKcal(e.target.value);
                  }}
                  className={styles.inputstyle}
                />
                kg
              </div>
              <div>
                <label htmlFor="carbon">탄수화물</label>
                <input
                  type="text"
                  id="carbon"
                  value={carbon}
                  onChange={(e) => {
                    setWeight(e.target.value);
                  }}
                  className={styles.inputstyle}
                />
                kg
              </div>
              <div>
                <label htmlFor="protein">단백질</label>
                <input
                  type="text"
                  id="protein"
                  value={protein}
                  onChange={(e) => {
                    setWeight(e.target.value);
                  }}
                  className={styles.inputstyle}
                />
                kg
              </div>
              <div>
                <label htmlFor="fat">지방</label>
                <input
                  type="text"
                  id="fat"
                  value={fat}
                  onChange={(e) => {
                    setWeight(e.target.value);
                  }}
                  className={styles.inputstyle}
                />
                kg
              </div>
              <button
                type="submit"
                // className={styles.buttonstyle}
              >
                완료
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyGoal;
