import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  logout,
  selectIsAuth,
  selectUserData,
} from '../../redux/slices/authSlice'
import { selectCart } from '../../redux/slices/cartSlice'
import { setChoosenCategorie } from '../../redux/slices/fiterSlice'
import styles from './Header.module.sass'
const Header = () => {
  const [isBurger, setIsBurger] = useState(false)
  const isAuth = useSelector(selectIsAuth)
  const { items } = useSelector(selectCart)
  const { data, status } = useSelector(selectUserData)
  const onChangeCategory = useCallback((sort) => {
    dispatch(setChoosenCategorie(sort))
  }, [])
  const isMounted = useRef(false)
  const totalCount = items.reduce((sum, item) => sum + item.count, 0)

  const dispatch = useDispatch()
  const onClickLogout = () => {
    if (window.confirm('Вы действительно хотите выйти?')) {
      dispatch(logout())
      window.localStorage.removeItem('token')
    }
  }

  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  useEffect(() => {
    if (isMounted.current) {
      const json = JSON.stringify(items)
      localStorage.setItem('cart', json)
    }
    isMounted.current = true
  }, [items])

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  })

  const onCloseBurger = () => {
    setIsBurger(!isBurger)
  }

  const favoriteCount =
    isAuth && status === 'success'
      ? data.favorites && data.favorites.length
      : null

  return (
    <header className={styles.header}>
      {isBurger ? (
        <div className={styles.header__adaptive_burger_background}>
          <div className={styles.header__adaptive_burger}>
            <div className={styles.header__adaptive_burger_wrapper}>
              <div className={styles.header__adaptive_burger_items}>
                {isAuth ? (
                  status === 'success' && (
                    <div className={styles.header__wrapper_burger_login_logout}>
                      <Link
                        onClick={onCloseBurger}
                        to="/personal"
                        className={styles.search_section__profile_block}
                      >
                        <img src="../assets/img/user.svg" alt="user" />
                        <p>
                          {data.first_name[0].toUpperCase() +
                            data.first_name.slice(1)}
                        </p>
                      </Link>
                      <Link
                        to=""
                        onClick={onClickLogout}
                        className={styles.search_section__logout_block}
                      >
                        <img
                          src="../assets/img/free-icon-power-8509243 white.svg"
                          alt="power"
                        />
                      </Link>
                    </div>
                  )
                ) : (
                  <>
                    <Link
                      onClick={onCloseBurger}
                      to="/login"
                      className={styles.search_section__login_block}
                    >
                      <div className={styles.search_section__login_item}>
                        Войти
                      </div>
                    </Link>
                  </>
                )}
                <div className={styles.header__adaptive_burger_wrapper_item}>
                  <Link
                    onClick={onCloseBurger}
                    to="/catalog"
                    className={styles.header__burger__catalog}
                  >
                    <img
                      className="search-section__catalog-img"
                      src="../assets/img/free-icon-tiles-6569357 1.png"
                      alt="tiles"
                    />
                    <span>#вКаталог</span>
                  </Link>
                </div>
                <div className={styles.header__adaptive_burger_wrapper_item}>
                  <Link
                    to="/cart"
                    className={styles.header__cart}
                    onClick={onCloseBurger}
                  >
                    <img
                      src="../assets/img/free-icon-shopping-bag-5023684 1.png"
                      alt="shopping-bag"
                    />

                    <span>Корзина</span>
                  </Link>
                </div>

                <div className={styles.header__adaptive_burger_wrapper_item}>
                  {isAuth ? (
                    <Link
                      to="/personal/favorites"
                      className={styles.header__cart}
                      onClick={onCloseBurger}
                    >
                      <img src="../assets/img/heart 1.svg" alt="heart" />

                      <span>Избранное</span>
                    </Link>
                  ) : null}
                </div>

                <div
                  className={styles.header__adaptive_burger_wrapper_messages}
                >
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
            </div>
          </div>
        </div>
      ) : null}
      <div className={styles.header__container}>
        {/* <div className={styles.header__cont}>
          <Link to="/" className={styles.header__logo_block}>
            <img
              src="../assets/img/logo.svg"
              alt="logo"
              className={styles.header__logo_block}
            />
          </Link>
          <Link
            onClick={() => onChangeCategory('акции')}
            to="/catalog"
            className={styles.header__discount}
          >
            <img src="../assets/img/free-icon-fire-8648355 1.svg" alt="fire" />
            <span>Акции</span>
          </Link>
        </div> */}

        <div className={styles.header__cont}>
          <Link to="/" className={styles.header__delivery}>
            Доставка и оплата
          </Link>
          <Link to="/" className={styles.header__faq}>
            FAQ
          </Link>
          <Link to="/" className={styles.header__comments}>
            Отзывы
          </Link>
          {isAuth && status === 'success' && data.admin === 1 ? (
            <Link to="/admin">ADMIN</Link>
          ) : null}
        </div>
        {/* <div className={styles.header__cont}>
          <Link to="/cart" className={styles.header__cart}>
            <div className={styles.header__cart_wrapper}>
              <img
                src="../assets/img/free-icon-shopping-bag-5023684 1.png"
                alt="shopping-bag"
              />
              <p>{totalCount > 0 ? totalCount : null}</p>
            </div>
            <span>Корзина</span>
          </Link>
          {isAuth ? (
            <Link to="/personal/favorites" className={styles.header__like}>
              <img src="../assets/img/heart 1.svg" alt="heart" />
              <p>{favoriteCount > 0 ? favoriteCount : null}</p>
            </Link>
          ) : null}
        </div> */}

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
  )
}

export default Header
