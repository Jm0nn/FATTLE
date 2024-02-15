import Character from '../../components/main/Character';
import DayQuest from '../../components/main/DayQuest';
import Footer from '../../commons/Footer';
import FoodUpload from '../../components/main/FoodUpload';
import styles from '../../styles/main/main.module.css';
import { useState } from 'react';

const Main = () => {
  const [check, setCheck] = useState(false);
  return (
    <div className={styles.wrapper}>
      <Character check={check} setCheck={setCheck} />
      <DayQuest check={check} setCheck={setCheck} />
      <FoodUpload />
      <Footer />
    </div>
  );
};

export default Main;
