import classNames from 'classnames';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectCart } from '../../redux/slices/cartSlice';
import styles from './Header.module.sass';
const Header = () => {
  const [isBurger, setIsBurger] = useState(false);

  const { items, totalPrice } = useSelector(selectCart);
  const isMounted = useRef(false);
  const totalCount = items.reduce((sum, item) => sum + item.count, 0);
  useEffect(() => {
    if (isMounted.current) {
      const json = JSON.stringify(items);
      localStorage.setItem('cart', json);
    }
    isMounted.current = true;
  }, [items]);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header className={styles.header}>
      {isBurger ? (
        <div className={styles.header__adaptive_burger}>
          <div className={styles.header__adaptive_burger_wrapper}>
            <a className={styles.header__adaptive_burger_wrapper_item}>
              Доставка и оплата
            </a>
            <a className={styles.header__adaptive_burger_wrapper_item}>FAQ</a>
            <div className={styles.header__adaptive_burger_wrapper_item}>
              <Link to='/cart' className={styles.header__cart}>
                <img
                  src='../assets/img/free-icon-shopping-bag-5023684 1.png'
                  alt='shopping-bag'
                />
                <span>Корзина</span>
              </Link>
            </div>
            <div className={styles.header__adaptive_burger_wrapper_item}>
              <Link to='/personal' className={styles.header__cart}>
                <img src='../assets/img/heart 1.svg' alt='heart' />
                <span>Избранное</span>
              </Link>
            </div>
            <div className={styles.header__adaptive_burger_wrapper_item}>
              <Link to='/catalog' className={styles.header__burger__catalog}>
                <img
                  className='search-section__catalog-img'
                  src='./assets/img/free-icon-tiles-6569357 1.png'
                  alt='tiles'
                />
                <span>#вКаталог</span>
              </Link>
            </div>

            <div className={styles.header__adaptive_burger_wrapper_messages}>
              <a href='/' className={styles.header__messenger_item}>
                <img src='../assets/img/telegram.svg' alt=''></img>
              </a>
              <a
                href='https://vk.com/reship'
                className={styles.header__messenger_item}
              >
                <img src='../assets/img/vkontakte 1.svg' alt='vk' />
              </a>
              <a href='/' className={styles.header__messenger_item}>
                <img src='../assets/img/discord 1.svg' alt='' />
              </a>
            </div>
          </div>
        </div>
      ) : null}
      <div className={styles.header__container}>
        <div className={styles.header__cont}>
          <Link to='/' className={styles.header__logo_block}>
            <img
              src='../assets/img/logo.svg'
              alt='logo'
              className={styles.header__logo_block}
            />
          </Link>
          <Link to='/catalog' className={styles.header__discount}>
            <img src='../assets/img/free-icon-fire-8648355 1.svg' alt='fire' />
            <span>Акции</span>
          </Link>
        </div>

        <div className={styles.header__cont}>
          <Link to='/' className={styles.header__delivery}>
            Доставка и оплата
          </Link>
          <Link to='/' className={styles.header__faq}>
            FAQ
          </Link>
        </div>
        <div className={styles.header__cont}>
          {/* <Link to="/cart" className={styles.header__cart}>
            <img
              src="../assets/img/free-icon-shopping-bag-5023684 1.png"
              alt="shopping-bag"
            />
            <span>Корзина</span>
          </Link> */}
          {/* <Link to="/personal" className={styles.header__like}>
            <img src="../assets/img/heart 1.svg" alt="heart" />
          </Link> */}
          <a href='/' className={styles.header__messenger_item}>
            <img src='../assets/img/telegram.svg' alt=''></img>
          </a>
          <a
            href='https://vk.com/reship'
            className={styles.header__messenger_item}
          >
            <img src='../assets/img/vkontakte 1.svg' alt='vk' />
          </a>
          <a href='/' className={styles.header__messenger_item}>
            <img src='../assets/img/discord 1.svg' alt='' />
          </a>
        </div>

        <button
          onClick={() => setIsBurger(!isBurger)}
          className={
            isBurger
              ? styles.header__adaptive_burger_button + ' ' + styles.active
              : styles.header__adaptive_burger_button
          }
        >
          <div className={styles.header__adaptive_burger_button_line}></div>
          <div className={styles.header__adaptive_burger_button_line}></div>
          <div className={styles.header__adaptive_burger_button_line}></div>
        </button>
      </div>
    </header>
  );
};

export default Header;
