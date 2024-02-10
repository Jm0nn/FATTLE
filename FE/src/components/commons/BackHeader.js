import BackArrow from '../../assets/svg/commons/BackArrow.svg';
import styles from '../../styles/commons/BackHeader.module.css';
const BackHeader = ({ title, navigate }) => {
  const goBackHandler = () => {
    navigate(-1);
  };
  return (
    <>
      <div className={styles.container}>
        <img
          className={styles.img}
          src={BackArrow}
          alt="BackArrow"
          onClick={goBackHandler}
        />
        <div>{title}</div>
      </div>
    </>
  );
};

export default BackHeader;
