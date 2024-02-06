import React, { useState } from 'react';
import axios from 'axios';
import Frame2 from '../../assets/images/main/Frame2.svg';
import { API } from '../../services/main/URL';
import styles from '../../styles/main/BodyinfoModify.module.css';

const BodyinfoModify = () => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const apiUrl = `${API.USER_GET}`;
      const data = {
        height: height,
        weight: weight,
      };

      const response = await axios.patch(apiUrl, data);
      console.log(response.data);

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
        onClick={openModal}
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
            <form onSubmit={handleFormSubmit}>
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
