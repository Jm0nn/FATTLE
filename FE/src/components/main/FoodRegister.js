import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Footer from '../../commons/Footer';
import styles from '../../styles/main/FoodRegister.module.css';
import camera from '../../assets/images/main/camera.svg';
import cameratext from '../../assets/images/main/cameratext.svg';

function FoodRegister() {
  const [foodList, setFoodList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [relatedKeywords, setRelatedKeywords] = useState([]);
  const [cameraStream, setCameraStream] = useState(null);
  const [isCameraOn, setIsCameraOn] = useState(false);

  useEffect(() => {
    try {
      axios.get(`http://localhost:5000/list`).then((response) => {
        setFoodList(response.data);
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
    setSearchQuery(''); // 검색 완료 후 검색창 비우기
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
        {/* 연관 검색어 표시 */}
        {searchQuery && (
          <div className={styles.relatedKeywordsContainer}>
            <ul className={styles.relatedKeywords}>
              {relatedKeywords.map((keyword, index) => (
                <li
                  key={index}
                  onClick={() => handleRelatedKeywordClick(keyword)}
                >
                  {keyword}
                </li>
              ))}
            </ul>
          </div>
        )}

        <button className={styles.searchButton} onClick={handleSearchClick}>
          검색
        </button>
      </div>

      <div>
        {/* 검색 결과 표시 */}
        {/* <div className={styles.horizontalListContainer}>
          <ul className={styles.horizontalList}>
            {searchResults.map((food) => (
              <li key={food.foodCd}>
                <img src={food.imgPath} alt={food.name} />
                <div className={styles.foodlist}>
                  <p>
                    {' '}
                    {food.type === 1
                      ? '아침'
                      : food.type === 2
                      ? '점심'
                      : food.type === 3
                      ? '저녁'
                      : '간식'}
                  </p>
                  <h3>{food.name}</h3>
                  <p>탄: {food.carbo} g</p>
                  <p>단: {food.protein} g</p>
                  <p>지: {food.fat} g</p>
                  <p>칼로리: {food.calory} kcal</p>
                </div>
              </li>
            ))}
          </ul>
        </div> */}
      </div>

      <div className={styles.cameraContainer}>
        <img src={cameratext} alt="" className={styles.cameratextImage} />
        <img
          src={camera}
          alt=""
          className={styles.cameraImage}
          onClick={handleCameraClick}
        />

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
      </div>
      <Footer />
    </div>
  );
}

export default FoodRegister;
