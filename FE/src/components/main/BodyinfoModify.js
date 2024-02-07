import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Frame2 from '../../assets/images/main/Frame2.svg';
import API from '../../services/main/URL';
import styles from '../../styles/main/BodyinfoModify.module.css';
import { useSelector } from 'react-redux';
const BodyinfoModify = () => {
  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const userCode = useSelector((state) => {
    return state.userCode;
  });

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const HandleFormSubmit = async (e) => {
    e.preventDefault();

    useEffect(() => {
      axios.get(`${API.USER_GET}${userCode}`).then((res) => {
        console.log(userCode);
      });
    }, []);

    try {
      const apiUrl = `${API.USER_GET}${userCode}`;
      {
        console.log('asd');
      }
      const data = {
        height: height,
        weight: weight,
      };

      // const response = await axios.patch(apiUrl, data);
      // console.log(response.data);

      // axios
      //   .patch(apiUrl, data)
      //   .then((res) => {
      //     console.log(res);
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });

      closeModal();
    } catch (error) {
      console.error('체중 및 신장 업데이트 오류:', error.message);
    }
  };

  return (
    <div>
      <img
        src={Frame2}
        alt="Click to open modal"
        onClick={() => {
          axios.get(`${API.USER_GET}${userCode}`).then((res) => {
            console.log(res.data.height);
            setHeight(res.data.height);
            console.log(res.data.weight);
            setWeight(res.data.weight);
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
                <label htmlFor="height">신장</label>
                <input
                  type="text"
                  id="height"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className={styles.inputstyle}
                />
                cm
              </div>
              <div>
                <label htmlFor="weight">체중</label>
                <input
                  type="text"
                  id="weight"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className={styles.inputstyle}
                />
                kg
              </div>
              <button type="submit" className={styles.buttonstyle}>
                완료
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BodyinfoModify;
