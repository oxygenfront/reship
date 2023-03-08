import React from 'react';
import styles from './Header.module.scss';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <div className={styles.header__cont}>
          <a href='/' className={styles.header__logo_block}>
            <img
              src='./assets/img/logo.svg'
              alt='logo'
              className={styles.header__logo_block}
            />
          </a>
          <button className={styles.header__discount}>
            <img src='./assets/img/free-icon-fire-8648355 1.svg' alt='fire' />
            <span>Акции</span>
          </button>
        </div>
        <div className={styles.header__cont}>
          <a href='/' className={styles.header__delivery}>
            Доставка и оплата
          </a>
          <a href='/index.html#faq' className={styles.header__faq}>
            FAQ
          </a>
        </div>
        <div className={styles.header__cont}>
          <button className={styles.header__cart}>
            <img
              src='./assets/img/free-icon-shopping-bag-5023684 1.png'
              alt='shopping-bag'
            />
            <span>Корзина</span>
          </button>
          <button className={styles.header__like}>
            <img src='./assets/img/heart 1.svg' alt='heart' />
          </button>
          <div className={styles.header__line}></div>
          <a href='/' className={styles.header__messenger_item}>
            <img src='./assets/img/vkontakte 1.svg' alt='vk' />
          </a>
          <a href='/' className={styles.header__messenger_item}>
            <img src='./assets/img/telegram.svg' alt=''></img>
          </a>
          <a href='/' className={styles.header__messenger_item}>
            <img src='./assets/img/discord 1.svg' alt='' />
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
