import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Frame2 from '../../assets/images/main/Frame2.svg';
import API from '../../services/main/URL';
// import API from '../../services/mypage/URL';
import styles from '../../styles/mypage/MyGoal.module.css';
// import styles from '../../styles/main/BodyinfoModify.module.css';
import { useSelector } from 'react-redux';
const MyGoal = () => {
  // const [weight, setWeight] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [goalWeight, setGoalWeight] = useState(0);
  const [goalCalory, setGoalCalory] = useState(0);
  const [goalCarbo, setGoalCarbo] = useState(0);
  const [goalProtein, setGoalProtein] = useState(0);
  const [goalFat, setGoalFat] = useState(0);

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
      .patch(`${API.GOAL_PATCH}`, {
        userCode,
        goalWeight,
        goalCalory,
        goalCarbo,
        goalProtein,
        goalFat,
      })
      .then((res) => {
        console.log('patch테스트');
        console.log(res);
        // axios
        //   .get(`${API.GOAL_PATCH}`)
        //   .then((res) => {
        //     console.log(res);
        //   })
        //   .catch((err) => {
        //     console.log(err);
        //   });
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
            console.log('get호출');
            setGoalWeight(res.data.goalWeight);
            setGoalCalory(res.data.goalCalory);
            setGoalCarbo(res.data.goalCarbo);
            setGoalProtein(res.data.goalProtein);
            setGoalFat(res.data.goalFat);
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
                <label htmlFor="goalWeight">목표 체중</label>
                <input
                  type="text"
                  id="goalWeight"
                  value={goalWeight}
                  onChange={(e) => {
                    setGoalWeight(e.target.value);
                  }}
                  className={styles.inputstyle}
                />
                kg
              </div>
              <div>
                <label htmlFor="goalCalory">칼로리</label>
                <input
                  type="text"
                  id="goalCalory"
                  value={goalCalory}
                  onChange={(e) => {
                    setGoalCalory(e.target.value);
                  }}
                  className={styles.inputstyle}
                />
                kcal
              </div>
              <div>
                <label htmlFor="goalCarbo">탄수화물</label>
                <input
                  type="text"
                  id="goalCarbo"
                  value={goalCarbo}
                  onChange={(e) => {
                    setGoalCarbo(e.target.value);
                  }}
                  className={styles.inputstyle}
                />
                g
              </div>
              <div>
                <label htmlFor="goalProtein">단백질</label>
                <input
                  type="text"
                  id="goalProtein"
                  value={goalProtein}
                  onChange={(e) => {
                    setGoalProtein(e.target.value);
                  }}
                  className={styles.inputstyle}
                />
                g
              </div>
              <div>
                <label htmlFor="goalFat">지방</label>
                <input
                  type="text"
                  id="goalFat"
                  value={goalFat}
                  onChange={(e) => {
                    setGoalFat(e.target.value);
                  }}
                  className={styles.inputstyle}
                />
                g
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
