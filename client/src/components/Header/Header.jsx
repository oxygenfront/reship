import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Header.module.scss'

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <div className={styles.header__cont}>
          <Link to="/" className={styles.header__logo_block}>
            <img
              src="../assets/img/logo.svg"
              alt="logo"
              className={styles.header__logo_block}
            />
          </Link>
          <Link to="/catalog" className={styles.header__discount}>
            <img src="../assets/img/free-icon-fire-8648355 1.svg" alt="fire" />
            <span>Акции</span>
          </Link>
        </div>
        <div className={styles.header__cont}>
          <Link to="/" className={styles.header__delivery}>
            Доставка и оплата
          </Link>
          <Link to="/" className={styles.header__faq}>
            FAQ
          </Link>
        </div>
        <div className={styles.header__cont}>
          <Link to="/cart" className={styles.header__cart}>
            <img
              src="../assets/img/free-icon-shopping-bag-5023684 1.png"
              alt="shopping-bag"
            />
            <span>Корзина</span>
          </Link>
          <Link to="/personal" className={styles.header__like}>
            <img src="../assets/img/heart 1.svg" alt="heart" />
          </Link>
          <div className={styles.header__line}></div>
          <a
            href="https://vk.com/reship"
            className={styles.header__messenger_item}
          >
            <img src="../assets/img/vkontakte 1.svg" alt="vk" />
          </a>
          {/* <a href="/" className={styles.header__messenger_item}>
            <img src="../assets/img/telegram.svg" alt=""></img>
          </a> */}
          <a href="/" className={styles.header__messenger_item}>
            <img src="../assets/img/discord 1.svg" alt="" />
          </a>
        </div>
      </div>
    </header>
  )
}

export default Header
