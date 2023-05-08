import classNames from 'classnames'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  logout,
  selectIsAuth,
  selectUserData,
} from '../../redux/slices/authSlice'
import { selectFilter, setSearchValue } from '../../redux/slices/fiterSlice'
import styles from './Menu.module.sass'
import { Dialog } from '@headlessui/react'
import { selectItemsData } from '../../redux/slices/itemsSlice'
import Card from '../Card/Card'
import { selectCart } from '../../redux/slices/cartSlice'

const Menu = () => {
  const dispatch = useDispatch()

  const isMounted = useRef(false)
  const isAuth = useSelector(selectIsAuth)
  const { data, status } = useSelector(selectUserData)
  const { searchValue } = useSelector(selectFilter)

  const { items, itemsStatus = status } = useSelector(selectItemsData)
  const { cartItems } = useSelector(selectCart)

  const totalCount = cartItems.reduce((sum, item) => sum + item.count, 0)
  const theme = useSelector((state) => state.theme)
  const [isOpen, setIsOpen] = useState(false)
  const onClickLogout = () => {
    if (window.confirm('Вы действительно хотите выйти?')) {
      dispatch(logout())
      window.localStorage.removeItem('token')
    }
  }
  const [isNotEmpty, setIsNotEmpty] = useState(false)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const favoriteCount =
    isAuth && status === 'success'
      ? data.favorites && data.favorites.length
      : null
  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])
  useEffect(() => {
    if (isMounted.current) {
      const json = JSON.stringify(cartItems)
      localStorage.setItem('cart', json)
    }
    isMounted.current = true
  }, [cartItems])
  return (
    <div className={styles.search_section}>
      <div
        className={classNames(
          styles.container,
          styles.search_section__container
        )}
      >
        {windowWidth <= 767 ? null : (
          <>
            <Link to="/" className={styles.search_section__logo}>
              <img src="../assets/img/logo.svg" alt="logo" />
            </Link>

            <Link to="/catalog" className={styles.search_section__catalog}>
              <span>Каталог</span>

              <div className={styles.search_section__catalog_arrow}></div>
            </Link>
          </>
        )}
        <div className={styles.search_section__search_block}>
          <input
            type="text"
            placeholder="Поиск по каталогу"
            className={styles.search_section__search_item}
            onChange={(e) => dispatch(setSearchValue('123'))}
          />
          <Dialog
            className={styles.modal}
            open={isOpen}
            onClose={() => setIsOpen(false)}
          >
            <div className={styles.modal_bg} aria-hidden="true"></div>
            <div className={styles.modal_scroll}>
              <div className={styles.modal_container}>
                <Dialog.Panel>
                  {searchValue === '' && (
                    <Dialog.Title>
                      Введите название продукта и нажмите на поиск
                    </Dialog.Title>
                  )}

                  <Dialog.Description></Dialog.Description>

                  {itemsStatus === 'success' &&
                    searchValue !== '' &&
                    items
                      .filter((item) => {
                        if (
                          item.name
                            .toLowerCase()
                            .includes(searchValue.toLowerCase())
                        ) {
                          setIsNotEmpty(true)
                          return true
                        } else {
                          return false
                        }
                      })
                      .map((item) => (
                        <Card
                          key={item.id}
                          id={item.id}
                          name={item.name}
                          old_price={item.old_price}
                          price={item.price}
                        ></Card>
                      ))}

                  <button
                    className={styles.modal_container_close}
                    onClick={() => setIsOpen(false)}
                  >
                    X
                  </button>
                </Dialog.Panel>
              </div>
            </div>
          </Dialog>

          <button
            onClick={() => setIsOpen(true)}
            className={styles.search_section__search_block_glass}
          >
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
        <div className={styles.search_section_links}>
          <Link to="/personal/favorites">
            {theme === 'light' ? (
              <img
                className={styles.search_section_links_heart}
                src="../assets/img/heart.svg"
                alt="favorites"
              />
            ) : (
              <img
                className={styles.search_section_links_heart}
                src="../assets/img/heart-white.svg"
                alt="favorites"
                width={35}
              />
            )}

            {favoriteCount > 0 ? (
              <span className={styles.search_section_links_heart_count}>
                {favoriteCount}
              </span>
            ) : null}
          </Link>
          <Link to="/cart">
            {theme === 'light' ? (
              <img
                className={styles.search_section_links_cart}
                src="../assets/img/cart.svg"
                alt="cart"
                width={33}
              />
            ) : (
              <img
                className={styles.search_section_links_cart}
                src="../assets/img/cart-white.svg"
                alt="cart"
                width={33}
              />
            )}

            {totalCount > 0 ? (
              <span className={styles.search_section_links_cart_count}>
                {totalCount}
              </span>
            ) : null}
          </Link>
        </div>
        {isAuth ? (
          status === 'success' && (
            <>
              {windowWidth > 767 ? (
                <div className={styles.search_section__profile_block}>
                  <Link to="/personal">
                    {data.first_name ? (
                      <>
                        <p>
                          {data.first_name[0].toUpperCase() +
                            data.first_name.slice(1)}
                        </p>
                      </>
                    ) : null}
                  </Link>
                  <div className={styles.search_section__catalog_block}>
                    <div
                      className={styles.search_section__catalog_arrow_profile}
                    ></div>
                  </div>
                </div>
              ) : null}
              {windowWidth > 767 ? (
                <Link
                  to=""
                  onClick={onClickLogout}
                  className={styles.search_section__logout_block}
                >
                  <img src="../assets/img/free-icon-power.svg" alt="power" />
                </Link>
              ) : null}
            </>
          )
        ) : (
          <>
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
