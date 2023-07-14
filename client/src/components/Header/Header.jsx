import React, { useCallback, useEffect, useRef, useState } from 'react'
import classNames from 'classnames'
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
      <div className={classNames(styles.header__container, styles.container)}>
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
            <a
              target="_blank"
              href="https://vk.com/topic-214661020_49655928"
              className={styles.header__faq}
            >
              FAQ
            </a>
            <a
              target="_blank"
              href="https://vk.com/topic-214661020_49238528"
              className={styles.header__comments}
            >
              Отзывы
            </a>
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

export default React.memo(Header)
