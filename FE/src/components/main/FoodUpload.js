import React, { useState, useEffect } from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import styles from '../../styles/main/FoodUpload.module.css';
import uploadbutton from '../../assets/images/main/uploadbutton.svg';
import checkButton from '../../assets/images/main/check2.svg';
import { API } from '../../services/main/URL';
import { useSelector } from 'react-redux';
import FoodRegister from './FoodRegister';
import axios from 'axios';

function FoodUpload() {
  const [images, setImages] = useState([
    uploadbutton, // 이미지 1
    uploadbutton, // 이미지 2
    uploadbutton, // 이미지 3
    uploadbutton, // 이미지 4
  ]);

  const [copy, setCopy] = useState([
    uploadbutton, // 이미지 1
    uploadbutton, // 이미지 2
    uploadbutton, // 이미지 3
    uploadbutton, // 이미지 4
  ]);
  const userCode = useSelector((state) => {
    return state.userCode;
  });

  useEffect(() => {
    axios.get(`${API.FOOD_TODAYS_GET}${userCode}`).then((res) => {
      let cnt = Object.keys(res.data.list).length;
      for (let i = 0; i < cnt; i++) {
        // console.log(res.data.list[i]);
        setCopy(images);
        // copy = [...images];
        copy[res.data.list[i].type - 1] = checkButton;
        // console.log(copy);
        setImages(copy);
      }
      // console.log(res.data.list[0]);
    });
  }, []);
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.box}>
          <span className={styles.label1}>아침</span>
          <Link to="/foodupload" state={{ type: 1 }}>
            <img
              src={images[0]}
              alt=""
              className={styles.positionAbsolute}
              width="60"
              height="60"
            />
          </Link>
        </div>
        <div className={styles.box}>
          <span className={styles.label2}>점심</span>
          <Link to="/foodupload" state={{ type: 2 }}>
            <img
              src={images[1]}
              alt=""
              className={styles.positionAbsolute}
              width="60"
              height="60"
            />
          </Link>
        </div>
        <div className={styles.box}>
          <span className={styles.label3}>저녁</span>
          <Link to="/foodupload" state={{ type: 3 }}>
            <img
              src={images[2]}
              alt=""
              className={styles.positionAbsolute}
              width="60"
              height="60"
            />
          </Link>
        </div>
        <div className={styles.box}>
          <span className={styles.label4}>간식</span>
          <Link to="/foodupload">
            <img
              src={images[3]}
              alt=""
              className={styles.positionAbsolute}
              width="60"
              height="60"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default FoodUpload;
