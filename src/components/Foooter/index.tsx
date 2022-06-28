import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './footer.module.scss';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <a className={styles.footer_logo} href="/">
        Qpick
      </a>
      <ul className={styles.footer_menu}>
        <li className={styles.footer_menu_item}>
          <NavLink to="/cart">Корзина</NavLink>
        </li>
        <li className={styles.footer_menu_item}>
          <NavLink to="/service">Условия сервиса</NavLink>
        </li>
      </ul>
      <div className={styles.footer_social}>
        <a href="#">
          <img src="./img/instagram.svg" alt="instagram" />
        </a>
        <a href="#">
          <img src="./img/telegram.svg" alt="telegram" />
        </a>
        <a href="#">
          <img src="./img/whatsApp.svg" alt="WhatsApp" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
