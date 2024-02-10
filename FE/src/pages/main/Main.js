import Character from "../../components/main/Character";
import DayQuest from "../../components/main/DayQuest";
import Footer from "../../commons/Footer"
import FoodUpload from "../../components/main/FoodUpload";
import styles from '../../styles/main/main.module.css'


const Main = () => {
    return (
    <div className={styles.wrapper}>
        <Character />
        <DayQuest />
        <FoodUpload />
        <Footer />

    </div>
  )
};
  
  export default Main; 
