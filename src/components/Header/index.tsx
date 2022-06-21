import React from 'react';
import styles from './header.module.scss';

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.header_menu}>
        <h4 className={styles.header_menu_logo}>Qpick</h4>
        <div className={styles.header_menu_trigger}>
          <img src="./img/phone.svg" />
          <p>Выбрать модель телефона</p>
        </div>
      </div>
      <div className={styles.header_items}>
        <div className={styles.header_items_favorites}>
          <img src="./img/favorites.svg" />
          <span>0</span>
        </div>
        <div className={styles.header_items_cart}>
          <img src="./img/cart.svg" />
          <span>0</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
