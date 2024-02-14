import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Frame2 from '../../assets/images/main/Frame2.svg';
import API from '../../services/main/URL';
import styles from '../../styles/main/BodyinfoModify.module.css';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
const FoodRegist = ({ foodRegist, setFoodRegist }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const userCode = useSelector((state) => {
    return state.userCode;
  });

  const location = useLocation();

  // console.log('------------------------');
  // console.log(userCode);
  // console.log(location.state.type);
  // console.log(foodRegist[0].name);
  // console.log(foodRegist[0].calory);
  // console.log(foodRegist[0].carbo);
  // console.log(foodRegist[0].protein);
  // console.log(foodRegist[0].fat);
  // console.log(foodRegist[0].imgName);
  // console.log('------------------------');
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const HandleFormSubmit = (e) => {
    console.log('실행됨');
    e.preventDefault();
    axios
      .post(`${API.FOOD_UPLOAD}`, {
        userCode: userCode,
        type: location.state.type,
        name: foodRegist[0].name,
        calory: foodRegist[0].calory,
        carbo: foodRegist[0].carbo,
        protein: foodRegist[0].protein,
        fat: foodRegist[0].fat,
        imgName: foodRegist[0].imgName,
      })
      .then((res) => {
        alert('저장되었습니다.');
        closeModal();
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <img
        src={Frame2}
        alt="Click to open modal"
        onClick={() => {
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
              {foodRegist.map((a, i) => (
                <div key={i}>
                  <span>{a.name}</span>
                  <span> {a.gram}</span>
                  <span> {a.calory}</span>
                  <span> {a.carbo}</span>
                  <span> {a.protein}</span>
                  <span
                    onClick={() => {
                      const updatedFoodRegist = foodRegist.filter(
                        (item, index) => index !== i,
                      );
                      setFoodRegist(updatedFoodRegist);
                    }}
                  >
                    없애기
                  </span>
                </div>
              ))}
              <button
                type="submit"
                // className={styles.buttonstyle}
              >
                최종등록
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodRegist;
