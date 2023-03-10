import React from 'react'
import classNames from 'classnames'
import styles from './Menu.module.scss'
import { Link } from 'react-router-dom'

const Menu = () => {
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
          />
          <button className={styles.search_section__search_block_glass}>
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
        <Link to="/register" className={styles.search_section__registr_block}>
          <div className={styles.search_section__registr_item}>Регистрация</div>
        </Link>
        <Link to="/login" className={styles.search_section__login_block}>
          <div className={styles.search_section__login_item}>Войти</div>
        </Link>
      </div>
    </div>
  )
}

export default Menu
