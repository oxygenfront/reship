import classNames from 'classnames'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  logout,
  selectIsAuth,
  selectUserData,
} from '../../redux/slices/authSlice'
import { selectFilter, setSearchValue } from '../../redux/slices/fiterSlice'
import styles from './Menu.module.sass'

const Menu = () => {
  const dispatch = useDispatch()
  const isAuth = useSelector(selectIsAuth)
  const { data, status } = useSelector(selectUserData)

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
  }, [])
  return (
    <div className={styles.search_section}>
      <div
        className={classNames(
          styles.container,
          styles.search_section__container
        )}
      >
        {windowWidth <= 767 ? null : (
          <Link to="/catalog" className={styles.search_section__catalog}>
            <img
              className="search-section__catalog-img"
              src="./assets/img/free-icon-tiles-6569357 1.png"
              alt="tiles"
            />
            <span>#вКаталог</span>
          </Link>
        )}
        <div className={styles.search_section__search_block}>
          <input
            type="text"
            placeholder="Поиск товара"
            className={styles.search_section__search_item}
            // onChange={(e) => dispatch(setSearchValue(e.target.value))}
          />
          <button className={styles.search_section__search_block_glass}>
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
        {isAuth ? (
          status === 'success' && (
            <>
              <Link
                to="/personal"
                className={styles.search_section__profile_block}
              >
                <img src="./assets/img/user.svg" alt="user" />
                <p>
                  {data.first_name[0].toUpperCase() + data.first_name.slice(1)}
                </p>
              </Link>
              <Link
                to=""
                onClick={onClickLogout}
                className={styles.search_section__logout_block}
              >
                <img src="./assets/img/free-icon-power.svg" alt="power" />
              </Link>
            </>
          )
        ) : (
          <>
            {/* <Link
              to="/register"
              className={styles.search_section__registr_block}
            >
              <div className={styles.search_section__registr_item}>
                Регистрация
              </div>
            </Link> */}
            {windowWidth > 575 ? (
              <Link to="/login" className={styles.search_section__login_block}>
                <div className={styles.search_section__login_item}>Войти</div>
              </Link>
            ) : null}
          </>
        )}
      </div>
    </div>
  )
}

export default Menu
