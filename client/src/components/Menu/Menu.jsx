import React from 'react'
import classNames from 'classnames'
import styles from './Menu.module.scss'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout, selectIsAuth } from '../../redux/slices/authSlice'
import { selectFilter, setSearchValue } from '../../redux/slices/fiterSlice'

const Menu = () => {
  const dispatch = useDispatch()
  const isAuth = useSelector(selectIsAuth)
  const { searchValue } = useSelector(selectFilter)
  const onClickLogout = () => {
    if (window.confirm('Вы действительно хотите выйти?')) {
      dispatch(logout())
      window.localStorage.removeItem('token')
    }
  }

  return (
    <div className={styles.search_section}>
      <div
        className={classNames(
          styles.container,
          styles.search_section__container
        )}
      >
        <Link to="/catalog" className={styles.search_section__catalog}>
          <img
            className="search-section__catalog-img"
            src="./assets/img/free-icon-tiles-6569357 1.png"
            alt="tiles"
          />
          <span>#вКаталог</span>
        </Link>
        <div className={styles.search_section__search_block}>
          <input
            type="text"
            placeholder="Поиск товара"
            className={styles.search_section__search_item}
            onChange={(e) => dispatch(setSearchValue(e.target.value))}
          />
          <button className={styles.search_section__search_block_glass}>
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
        {isAuth ? (
          <>
            <Link
              to="/personal"
              className={styles.search_section__profile_block}
            >
              <img src="./assets/img/user.svg" alt="user" />
              <p>Фамилия И.</p>
            </Link>
            <Link
              to=""
              onClick={onClickLogout}
              className={styles.search_section__logout_block}
            >
              <img src="./assets/img/free-icon-power.svg" alt="power" />
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/register"
              className={styles.search_section__registr_block}
            >
              <div className={styles.search_section__registr_item}>
                Регистрация
              </div>
            </Link>
            <Link to="/login" className={styles.search_section__login_block}>
              <div className={styles.search_section__login_item}>Войти</div>
            </Link>
          </>
        )}
      </div>
    </div>
  )
}

export default Menu
