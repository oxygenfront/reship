import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectCart } from '../../redux/slices/cartSlice'
import styles from './Header.module.sass'

const Header = () => {
  const { items, totalPrice } = useSelector(selectCart)
  const isMounted = useRef(false)
  const totalCount = items.reduce((sum, item) => sum + item.count, 0)
  useEffect(() => {
    if (isMounted.current) {
      const json = JSON.stringify(items)
      localStorage.setItem('cart', json)
    }
    isMounted.current = true
  }, [items])
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
          <Link to="/admin">ADMIN</Link>
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
          <a href="/" className={styles.header__messenger_item}>
            <img src="../assets/img/telegram.svg" alt=""></img>
          </a>
          <a
            href="https://vk.com/reship"
            className={styles.header__messenger_item}
          >
            <img src="../assets/img/vkontakte 1.svg" alt="vk" />
          </a>
          <a href="/" className={styles.header__messenger_item}>
            <img src="../assets/img/discord 1.svg" alt="" />
          </a>
        </div>
      </div>
    </header>
  )
}

export default Header
