import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './footer.module.scss';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <a className={styles.footer__logo} href="/">
        Qpick
      </a>
      <ul className={styles.footer__menu}>
        <li className={styles.footer__item}>
          <NavLink to="/service">Условия сервиса</NavLink>
        </li>
      </ul>
      <div>
        <a className={styles.footer__social} href="https://www.instagram.com/">
          <img src="./img/instagram.svg" alt="instagram" />
        </a>
        <a className={styles.footer__social} href="https://web.telegram.org/">
          <img src="./img/telegram.svg" alt="telegram" />
        </a>
        <a className={styles.footer__social} href="https://www.whatsapp.com/">
          <img src="./img/whatsApp.svg" alt="WhatsApp" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
