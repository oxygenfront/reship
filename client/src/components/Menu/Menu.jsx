import classNames from 'classnames'
import { Fragment, memo, useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import {
  logout,
  selectIsAuth,
  selectUserData,
} from '../../redux/slices/authSlice'
import {
  selectFilter,
  setChoosenCategorie,
  setSearchValue,
} from '../../redux/slices/fiterSlice'
import styles from './Menu.module.sass'
import { Dialog, Transition } from '@headlessui/react'

import { selectCart } from '../../redux/slices/cartSlice'
import { Menu as DropDown } from '@headlessui/react'

import { addFavorite, selectFavorites } from '../../redux/slices/favoriteSlice'
import Modal from './Modal'

const Menu = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isMounted = useRef(false)
  const isAuth = useSelector(selectIsAuth)
  const { data, status } = useSelector(selectUserData)
  const { searchValue } = useSelector(selectFilter)
  const { favorites } = useSelector(selectFavorites)

  const { cartItems } = useSelector(selectCart)
  const theme = useSelector((state) => state.theme)
  const totalCount = cartItems.reduce((sum, item) => sum + item.count, 0)
  const [isOpen, setIsOpen] = useState(false)
  const refInput = useRef(null)
  const [focusedInput, setFocusedInput] = useState(false)
  const handleFocus = () => {
    setFocusedInput(true)
  }
  const handleBlur = () => {
    setFocusedInput(false)
  }
  const [searchOpen, setSearchOpen] = useState(false)
  const [scrollTop, setScrollTop] = useState(0)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const [showBurger, setShowBurger] = useState(false)
  const favoriteCount = favorites ? favorites.length : null
  const stylesBurgerMenuWrapperNoShow = {
    width: '100vw',
    height: '100vh',
    position: 'absolute',
    left: '0',
    top: '100px',
    zIndex: '0',
    background: 'none',
  }
  const stylesBurgerMenuWrapperShow = {
    width: '100vw',
    height: '100vh',
    position: 'absolute',
    left: '0',
    top: '100px',
    zIndex: '0',
    background: 'rgba(0, 0, 0, .6)',
    transition: 'all .2s linear',
  }
  const stylesBurgerMenuListNoShow = {
    transition: 'all .2s linear',
    position: 'absolute',
    background: 'transparent',
    borderRadius: '30px',
    top: '14px',
    right: '-250px',
    height: '85vh',
    width: '247px',
  }
  const stylesBurgerMenuListShow = {
    transition: 'all .2s linear',
    position: 'absolute',
    borderRadius: '30px',
    top: '14px',
    right: '35px',
    height: '84vh',
    width: '247px',
  }
  const onClickLogout = () => {
    if (window.confirm('Вы действительно хотите выйти?')) {
      dispatch(logout())
      window.localStorage.removeItem('token')
      return navigate('/')
    }
  }
  const onClickClear = () => {
    dispatch(setSearchValue(''))
  }
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
      const favJson = JSON.stringify(favorites)
      localStorage.setItem('cart', json)
      localStorage.setItem('favorites', favJson)
    }
    isMounted.current = true
  }, [cartItems, favorites])
  useEffect(() => {
    const handleScroll = () => setScrollTop(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  function handelFocesedInput() {
    setFocusedInput(true)
    refInput.current.focus()
  }
  function handleOpenModalCtalog() {
    setFocusedInput(false)
    setIsOpen(true)
  }
  return (
    <div
      className={styles.search_section}
      style={scrollTop > 0 ? { transform: 'translateY(-80px)' } : null}
    >
      <div
        className={classNames(
          styles.container,
          styles.search_section__container
        )}
      >
        <>
          <Link to="/" className={styles.search_section__logo}>
            <img src="../assets/img/logo.svg" alt="logo" />
          </Link>

          <Link
            style={
              focusedInput && windowWidth <= 450
                ? { width: '42px', fontSize: '0' }
                : null
            }
            onClick={handleOpenModalCtalog}
            className={styles.search_section__catalog}
          >
            <span>Каталог</span>

            <div
              className={styles.search_section__catalog_arrow}
              style={
                focusedInput && windowWidth <= 450 ? { marginLeft: 0 } : null
              }
            ></div>
          </Link>
        </>

        <div
          className={styles.search_section__search_block}
          style={
            !focusedInput && windowWidth <= 450
              ? {
                  width: '13%',
                  border: 'white',
                }
              : null
          }
        >
          <input
            ref={refInput}
            onFocus={handleFocus}
            // onBlur={handleBlur}
            value={searchValue}
            type="text"
            placeholder={
              focusedInput && windowWidth <= 450
                ? 'Поиск'
                : windowWidth > 450
                ? 'Поиск  по каталогу'
                : null
            }
            style={!focusedInput && windowWidth <= 450 ? { margin: 0 } : null}
            className={styles.search_section__search_item}
            onChange={(e) => dispatch(setSearchValue(e.target.value))}
          />
          {searchValue ? (
            <div className={styles.search_section__search_item_close}></div>
          ) : null}
          <Modal setIsOpen={setIsOpen} isOpen={isOpen}></Modal>
          {/* <Dialog
            as="div"
            className={styles.modal}
            open={searchOpen}
            onClose={() => setSearchOpen(false)}
          >
            <div className={styles.modal_bg} aria-hidden="true"></div>
            <div className={styles.modal_scroll}>
              <div className={styles.searchmodal_container}>
                <Dialog.Panel>
                  <div className={styles.searchmodal_wrapper}>
                    <div className={styles.searchmodal_top}>
                      <p>История</p>
                      <p>Очистить</p>
                    </div>
                  </div>
                </Dialog.Panel>
              </div>
            </div>
          </Dialog> */}
          {!focusedInput && windowWidth <= 450 ? (
            <button
              className={styles.search_section__search_block_glass}
              onClick={handelFocesedInput}
            >
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          ) : windowWidth <= 450 ? (
            <Link
              to="/catalog"
              onClick={() => setFocusedInput(!focusedInput)}
              className={styles.search_section__search_block_glass}
            >
              <i className="fa-solid fa-magnifying-glass"></i>
            </Link>
          ) : (
            <Link
              to="/catalog"
              className={styles.search_section__search_block_glass}
            >
              <i className="fa-solid fa-magnifying-glass"></i>
            </Link>
          )}
        </div>
        {windowWidth > 991 ? (
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
        ) : null}
        {isAuth ? (
          status === 'success' && (
            <>
              {windowWidth > 991 ? (
                <div className={styles.search_section__profile_block}>
                  <Link to="/personal">
                    {data.first_name ? (
                      <>
                        <p>
                          {data.first_name[0].toUpperCase() +
                            data.first_name.slice(1)}
                        </p>
                      </>
                    ) : (
                      <button className={styles.search_section_burger}>
                        <span />
                      </button>
                    )}
                  </Link>

                  <div className={styles.menu_wrapper}>
                    <DropDown as="div" className={styles.menu}>
                      <div>
                        <DropDown.Button className={styles.menu_button}>
                          <div className={styles.search_section__catalog_block}>
                            <div
                              className={
                                styles.search_section__catalog_arrow_profile
                              }
                            ></div>
                          </div>
                        </DropDown.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <DropDown.Items className={styles.menu_items}>
                          <div className={styles.menu_items_wrapper}>
                            <DropDown.Item className={styles.menu_items_item}>
                              <Link to="/personal">Личный кабинет</Link>
                            </DropDown.Item>
                            <DropDown.Item
                              to="/personal/favorites"
                              className={styles.menu_items_item}
                            >
                              <Link>Избранные</Link>
                            </DropDown.Item>
                            <DropDown.Item
                              to="/settings"
                              className={styles.menu_items_item}
                            >
                              <Link>Настройки</Link>
                            </DropDown.Item>
                            <DropDown.Item
                              to="/orders"
                              className={styles.menu_items_item}
                            >
                              <Link>Мои Заказы</Link>
                            </DropDown.Item>
                            <DropDown.Item
                              to="/cart"
                              className={styles.menu_items_item}
                            >
                              <Link>Корзина</Link>
                            </DropDown.Item>
                            <DropDown.Item
                              className={styles.menu_items_item_quit}
                            >
                              <button onClick={onClickLogout}>Выйти</button>
                            </DropDown.Item>
                          </div>
                        </DropDown.Items>
                      </Transition>
                    </DropDown>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setShowBurger(!showBurger)}
                  className={classNames(styles.search_section_burger, {
                    [styles.active]: showBurger,
                  })}
                >
                  <span />
                  <span />
                  <span />
                </button>
              )}
            </>
          )
        ) : (
          <>
            {windowWidth > 991 ? (
              <Link to="/login" className={styles.search_section__login_block}>
                <div className={styles.search_section__login_item}>Войти</div>
              </Link>
            ) : (
              <button
                onClick={() => setShowBurger(!showBurger)}
                className={classNames(styles.search_section_burger, {
                  [styles.active]: showBurger,
                })}
              >
                <span />
                <span />
                <span />
              </button>
            )}
          </>
        )}

        {showBurger ? (
          <div
            className={styles.search_section_burger_wrapper}
            style={
              !showBurger
                ? stylesBurgerMenuWrapperNoShow
                : stylesBurgerMenuWrapperShow
            }
          >
            {isAuth ? (
              status === 'success' && (
                <ul
                  className={styles.search_section_burger_items}
                  style={
                    !showBurger
                      ? stylesBurgerMenuListNoShow
                      : stylesBurgerMenuListShow
                  }
                >
                  <Link
                    onClick={() => setShowBurger(!showBurger)}
                    to="/personal"
                    className={styles.search_section_burger_items_item}
                  >
                    Профиль
                  </Link>
                  <hr className="hr" />
                  <Link
                    onClick={() => setShowBurger(!showBurger)}
                    to="/cart"
                    className={styles.search_section_burger_items_item}
                  >
                    Моя корзина
                  </Link>
                  <hr className="hr" />
                  <Link
                    onClick={() => setShowBurger(!showBurger)}
                    to="/personal/favorites"
                    className={styles.search_section_burger_items_item}
                  >
                    Избранное
                  </Link>
                  <hr className="hr" />
                  <Link
                    onClick={() => setShowBurger(!showBurger)}
                    to="/settings"
                    className={styles.search_section_burger_items_item}
                  >
                    Настройки
                  </Link>
                  <hr className="hr" />
                  <Link
                    to="/orders"
                    onClick={() => setShowBurger(!showBurger)}
                    className={styles.search_section_burger_items_item}
                  >
                    Мои заказы
                  </Link>
                  <hr className="hr" />
                  <li
                    onClick={(() => setShowBurger(!showBurger), onClickLogout)}
                    className={styles.search_section_burger_items_item}
                  >
                    Выйти
                  </li>
                </ul>
              )
            ) : (
              <ul
                className={styles.search_section_burger_items}
                style={
                  !showBurger
                    ? stylesBurgerMenuListNoShow
                    : stylesBurgerMenuListShow
                }
              >
                <Link
                  onClick={() => setShowBurger(!showBurger)}
                  to="/login"
                  className={styles.search_section_burger_items_item}
                >
                  Войти
                </Link>
                <hr className="hr" />
                <Link
                  onClick={() => setShowBurger(!showBurger)}
                  to="/register"
                  className={styles.search_section_burger_items_item}
                >
                  Зарегистрироваться
                </Link>
                <hr className="hr" />
                <li
                  onClick={() => setShowBurger(!showBurger)}
                  className={styles.search_section_burger_items_item}
                >
                  Мои избранные
                </li>
                <hr className="hr" />
                <li
                  onClick={() => setShowBurger(!showBurger)}
                  className={styles.search_section_burger_items_item}
                >
                  Моя корзина
                </li>
                <li
                  onClick={() => setShowBurger(!showBurger)}
                  className={styles.search_section_burger_items_item}
                ></li>
              </ul>
            )}
            <></>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default Menu
