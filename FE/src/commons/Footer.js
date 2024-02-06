import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from '../styles/commons/Footer.module.css'
import home from '../assets/images/footer/home.svg';
import person from '../assets/images/footer/person.svg';
import battle from '../assets/images/footer/battle.svg';
import ranking from '../assets/images/footer/ranking.svg';
import home2 from '../assets/images/footer/home2.svg';
import person2 from '../assets/images/footer/person2.svg';
import battle2 from '../assets/images/footer/battle2.svg';
import ranking2 from '../assets/images/footer/ranking2.svg'

function Footer() {
  const location = useLocation()

  return (
    <footer className={styles.footer}>
      <Link to="/main">
        <img src={location.pathname === '/main' ? home2 : home} alt='' className={ styles.footericon } />
      </Link>
      <Link to="/battle">
        <img src={location.pathname === '/battle' ? battle2 : battle} alt='' className={ styles.footericon } />
      </Link>
      <Link to="/ranking">
        <img src={location.pathname === '/ranking' ? ranking2 : ranking} alt='' className={ styles.footericon } />
      </Link>
      <Link to="/mypage">
        <img src={location.pathname === '/mypage' ? person2 : person} alt='' className={ styles.footericon } />
      </Link>
    </footer>
  );
}

export default Footer