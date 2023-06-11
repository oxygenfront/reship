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
import { set } from '../../redux/slices/themeSlice'
import { Switch } from '@headlessui/react'
const Header = () => {
  const [isBurger, setIsBurger] = useState(false)
  const isAuth = useSelector(selectIsAuth)
  const theme = useSelector((state) => state.theme)
  const { data, status } = useSelector(selectUserData)
  const onChangeCategory = useCallback((sort) => {
    dispatch(setChoosenCategorie(sort))
  }, [])

  const dispatch = useDispatch()
  const onClickLogout = () => {
    if (window.confirm('Вы действительно хотите выйти?')) {
      dispatch(logout())
      window.localStorage.removeItem('token')
    }
  }

  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  })
  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('theme', theme)
  }, [theme])
  const onCloseBurger = () => {
    setIsBurger(!isBurger)
  }

  const handleChange = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    dispatch(set(next))
  }

  return (
    <header className={styles.header}>
      {/* {isBurger ? (
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
      ) : null} */}
      <div className={styles.header__container}>
        <div className={styles.header__cont}>
          <div className={styles.header_switch_wrapper}>
            <Switch
              checked={theme === 'dark'}
              onChange={handleChange}
              className={styles.header_switch}
            >
              <span
                className={
                  theme === 'light'
                    ? styles.header_switch_circle
                    : styles.header_switch_circle_active
                }
                aria-hidden="true"
              />
              <div className={styles.header_switch_sun}>
                <img src="../assets/img/sun.svg" alt="sun" />
              </div>
              <div className={styles.header_switch_moon}>
                <img src="../assets/img/moon.svg" alt="moon" />
              </div>
            </Switch>
          </div>
          <div className={styles.header_center}>
            <Link to="/" className={styles.header__delivery}>
              Доставка и оплата
            </Link>
            <Link to="/" className={styles.header__faq}>
              FAQ
            </Link>
            <Link to="/" className={styles.header__comments}>
              Отзывы
            </Link>
          </div>

          {isAuth && status === 'success' && data.admin === 1 ? (
            <Link to="/admin" className={styles.header__admin}>
              ADMIN
            </Link>
          ) : null}
        </div>

        {/* <button
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
        </button> */}
      </div>
    </header>
  )
}

export default Header
