import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Footer from '../../commons/Footer';
import styles from '../../styles/main/FoodRegister.module.css';
import camera from '../../assets/images/main/camera.svg';
import cameratext from '../../assets/images/main/cameratext.svg';
import API from '../../services/main/URL';
import FoodRegist from './FoodRegist';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import { useLocation } from 'react-router-dom';

function FoodRegister({ type }) {
  const [foodList, setFoodList] = useState([]);
  const [foodRegist, setFoodRegist] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [relatedKeywords, setRelatedKeywords] = useState([]);
  const [cameraStream, setCameraStream] = useState(null);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [uploadImgUrl, setUploadImgUrl] = useState('');
  const [file, setFile] = useState(null);
  const location = useLocation();

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const userCode = useSelector((state) => {
    return state.userCode;
  });

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append('uploadFile', file);
    axios
      .post(
        `https://i10e106.p.ssafy.io/api/food/img-upload/${userCode}/${location.state.type}`,
        formData,
      )
      .then((res) => {
        let copy = [...foodRegist];
        copy.push(res.data);
        setFoodRegist(copy);
        alert(`${res.data.name}이 등록되었습니다.`);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    try {
      axios.get(`${API.FOOD_SEARCH}${searchQuery}`).then((response) => {
        setFoodList(response.data.list);
      });
    } catch (error) {
      console.error('음식 데이터 불러오기 중 오류:', error.message);
    }
  }, []);
  useEffect(() => {
    // 검색어가 변경될 때 연관 검색어 업데이트
    setRelatedKeywords(
      foodList
        .map((food) => food.name)
        .filter((name) =>
          name.toLowerCase().includes(searchQuery.toLowerCase()),
        ),
    );
  }, [searchQuery, foodList]);
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  const handleSearchClick = () => {
    const filteredList = foodList.filter((food) =>
      food.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );
    setSearchResults(filteredList);
    // setSearchQuery(''); // 검색 완료 후 검색창 비우기
  };
  const handleRelatedKeywordClick = (keyword) => {
    setSearchQuery(keyword);
    handleSearchClick();
  };
  const handleCameraClick = async () => {
    try {
      if (!isCameraOn) {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        setCameraStream(stream);
      } else {
        // 카메라 끄기
        cameraStream.getTracks().forEach((track) => track.stop());
        setCameraStream(null);
      }
      // 카메라 상태 업데이트
      setIsCameraOn((prev) => !prev);
    } catch (error) {
      console.error('카메라에 접근하는 중 오류 발생:', error);
    }
  };
  const handleTakePhoto = () => {
    if (cameraStream) {
      const video = document.querySelector(`.${styles.cameraPreview}`);
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext('2d');
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      // 이미지 데이터를 가져와서 저장 또는 활용하는 로직 추가 가능
      const imageData = canvas.toDataURL('image/jpeg');
      console.log('찍은 사진 데이터:', imageData);
      // 예시로 이미지를 다운로드하는 링크를 생성
      const downloadLink = document.createElement('a');
      downloadLink.href = imageData;
      downloadLink.download = 'food_photo.jpg';
      downloadLink.click();
    }
  };
  return (
    <div className={styles.wrapper}>
      {/* 검색 창 */}
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="식단 검색"
          value={searchQuery}
          onChange={handleSearchChange}
          className={styles.searchInput}
        />
        <div className={styles.searchIcon}></div>
        {/* 연관 검색어 표시 */}
        {/* {searchQuery && (
          <div className={styles.relatedKeywordsContainer}>
            <ul className={styles.relatedKeywords}>
              {relatedKeywords.map((keyword, index) => (
                <li
                  key={index}
                  onClick={() => {
                    handleRelatedKeywordClick(keyword);
                  }}
                >
                  {keyword}
                </li>
              ))}
            </ul>
          </div>
        )} */}
        <button className={styles.searchButton} onClick={handleSearchClick}>
          <p>검색</p>
        </button>
        <FoodRegist
          foodRegist={foodRegist}
          setFoodRegist={setFoodRegist}
        ></FoodRegist>
      </div>
      <div>
        {/* 검색 결과 표시 */}
        <div className={styles.horizontalListContainer}>
          <ul className={styles.horizontalList}>
            {searchResults.map((food, i) => (
              <li key={i}>
                <div
                  className={styles.foodlist}
                  onClick={() => {
                    let copy = [...foodRegist];
                    copy.push(food);
                    setFoodRegist(copy);
                    alert(`${food.name}을 담았어요.`);
                  }}
                >
                  {/* <p>
                    {' '}
                    {food.type === 1
                      ? '아침'
                      : food.type === 2
                      ? '점심'
                      : food.type === 3
                      ? '저녁'
                      : '간식'}
                  </p> */}
                  <div className={styles.foodName}>{food.name}</div>
                  <div className={styles.foodNutrition}>
                    <div className={styles.foodCarbo}>
                      <p>탄</p>
                    </div>
                    <div className={styles.carboGram}>{food.carbo}</div>
                  </div>
                  <div className={styles.foodNutrition}>
                    <div className={styles.foodProtein}>
                      <p>단</p>
                    </div>
                    <div className={styles.proteinGram}>{food.protein}</div>
                  </div>
                  <div className={styles.foodNutrition}>
                    <div className={styles.foodFat}>
                      <p>지</p>
                    </div>
                    <div className={styles.fatGram}>{food.fat}</div>
                  </div>
                  {/* <div className={styles.foodNutrition}> */}
                  {/* <p>칼로리</p> */}
                  <p className={styles.foodCalory}>{food.calory}</p>
                  <p className={styles.foodCaloryUnit}>kcal</p>
                  {/* </div> */}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className={styles.cameraContainer}>
        <div>
          <img src={cameratext} alt="" className={styles.cameratextImage} />
          <img
            src={camera}
            alt=""
            className={styles.cameraImage}
            onClick={handleCameraClick}
          />
        </div>
        <div className={styles.camera}>
          {cameraStream && (
            <video
              autoPlay
              playsInline
              muted
              className={styles.cameraPreview}
              ref={(videoRef) =>
                videoRef && (videoRef.srcObject = cameraStream)
              }
            />
          )}
          {isCameraOn && (
            <button
              className={styles.takePhotoButton}
              onClick={handleTakePhoto}
            >
              사진 찍기
            </button>
          )}
        </div>
        {/* <img src={uploadImgUrl} img="img" /> */}
        <div>
          <input type="file" onChange={handleFileChange} />
          <button onClick={handleSubmit}>Upload</button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
export default FoodRegister;
