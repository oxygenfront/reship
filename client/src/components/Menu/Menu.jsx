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
import { selectItemsData } from '../../redux/slices/itemsSlice'
import Card from '../Card/Card'
import { selectCart } from '../../redux/slices/cartSlice'
import { Menu as DropDown } from '@headlessui/react'
import { getFavoritesFromLs } from '../../utils/getFavoritesFromLs'
import { addFavorite, selectFavorites } from '../../redux/slices/favoriteSlice'

const Menu = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isMounted = useRef(false)
  const isAuth = useSelector(selectIsAuth)
  const { data, status } = useSelector(selectUserData)
  const { searchValue } = useSelector(selectFilter)
  const { favorites } = useSelector(selectFavorites)
  const { items, itemsStatus = status } = useSelector(selectItemsData)
  const { cartItems } = useSelector(selectCart)
  const theme = useSelector((state) => state.theme)

  const totalCount = cartItems.reduce((sum, item) => sum + item.count, 0)

  const [isOpen, setIsOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [scrollTop, setScrollTop] = useState(0)
  const [localCategory, setLocalCategory] = useState('мышки')
  const [localCategoryEn, setLocalCategoryEn] = useState('mouse')
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
  };
  const stylesBurgerMenuWrapperShow = {
    width: '100vw',
    height: '100vh',
    position: 'absolute',
    left: '0',
    top: '100px',
    zIndex: '0',
    background: 'rgba(0, 0, 0, .6)',
    transition: 'all .2s linear',
  };
  const stylesBurgerMenuListNoShow = {
    transition: 'all .2s linear',
    position: 'absolute',
    background: 'transparent',
    borderRadius: '30px',
    top: '14px',
    right: '-250px',
    height: '85vh',
    width: '247px',
  };
  const stylesBurgerMenuListShow = {
    transition: 'all .2s linear',
    position: 'absolute',
    background: 'white',
    borderRadius: '30px',
    top: '14px',
    right: '35px',
    height: '84vh',
    width: '247px',
  };

  const onChangeCategory = useCallback((sort) => {
    dispatch(setChoosenCategorie(sort))
  }, [])
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
            onClick={() => setIsOpen(true)}
            className={styles.search_section__catalog}
          >
            <span>Каталог</span>

            <div className={styles.search_section__catalog_arrow}></div>
          </Link>
        </>

        <div className={styles.search_section__search_block}>
          <input
            value={searchValue}
            type="text"
            placeholder="Поиск по каталогу"
            className={styles.search_section__search_item}
            onChange={(e) => dispatch(setSearchValue(e.target.value))}
          />
          {searchValue ? (
            <div className={styles.search_section__search_item_close}></div>
          ) : null}
          <Dialog
            as="div"
            className={styles.modal}
            open={isOpen}
            onClose={() => setIsOpen(false)}
          >
            <div className={styles.modal_bg} aria-hidden="true"></div>
            <div className={styles.modal_scroll}>
              <div className={styles.modal_container}>
                <Dialog.Panel>
                  <div className={styles.modal_items}>
                    <div className={styles.modal_leftcol}>
                      <ul>
                        <li
                          className={
                            localCategory === 'мышки'
                              ? styles.modal_leftcol_active
                              : null
                          }
                          onClick={() => {
                            setLocalCategoryEn('mouse')
                            setLocalCategory('мышки')
                          }}
                        >
                          <img src="../assets/img/mouse.svg" alt="mouse" />
                          Мышки
                        </li>
                        <li
                          className={
                            localCategory === 'клавиатуры'
                              ? styles.modal_leftcol_active
                              : null
                          }
                          onClick={() => {
                            setLocalCategoryEn('boards')
                            setLocalCategory('клавиатуры')
                          }}
                        >
                          <img
                            src="../assets/img/keyboard.svg"
                            alt="keyboard"
                          />
                          Клавиатуры
                        </li>
                        <li
                          className={
                            localCategory === 'наушники'
                              ? styles.modal_leftcol_active
                              : null
                          }
                          onClick={() => {
                            setLocalCategoryEn('headphones')
                            setLocalCategory('наушники')
                          }}
                        >
                          <img
                            src="../assets/img/headphones.svg"
                            alt="headphones"
                          />
                          Наушники
                        </li>
                        <li
                          className={
                            localCategory === 'микрофоны'
                              ? styles.modal_leftcol_active
                              : null
                          }
                          onClick={() => {
                            setLocalCategoryEn('microphone')
                            setLocalCategory('микрофоны')
                          }}
                        >
                          <img
                            src="../assets/img/microfone.svg"
                            alt="microfone"
                          />
                          Микрофоны
                        </li>
                        <li
                          className={
                            localCategory === 'аксессуары'
                              ? styles.modal_leftcol_active
                              : null
                          }
                          onClick={() => {
                            setLocalCategoryEn('accessory')
                            setLocalCategory('аксессуары')
                          }}
                        >
                          <img src="../assets/img/accessory.svg" alt="access" />
                          Аксессуары
                        </li>
                        <li
                          className={
                            localCategory === 'веб-камеры'
                              ? styles.modal_leftcol_active
                              : null
                          }
                          onClick={() => {
                            setLocalCategoryEn('camera')
                            setLocalCategory('веб-камеры')
                          }}
                        >
                          <img src="../assets/img/camera.svg" alt="camera" />
                          Веб-камеры
                        </li>
                      </ul>
                    </div>
                    <div className={styles.modal_center}>
                      <div className={styles.modal_center_title}>
                        <div>
                          <p>Особенности</p>
                        </div>
                        <div>
                          <p>Бренды</p>
                        </div>
                      </div>
                      <div className={styles.modal_center_items}>
                        <ul>
                          <li>Беспроводные</li>
                          <li>С русскими букавами</li>
                          <li>RGB-подсветка</li>
                          <li>Эргономичные </li>
                        </ul>
                        <ul>
                          <li>Varmilo</li>
                          <li>С русскими букавами</li>
                          <li>RGB-подсветка</li>
                          <li>Эргономичные </li>
                        </ul>
                      </div>
                      <div className={styles.modal_center_title}>
                        <div>
                          <p>Размер</p>
                        </div>
                      </div>
                      <div className={styles.modal_center_items}>
                        <ul>
                          <li>Полноразмерные 100%</li>
                          <li>Без нампада 75-80% </li>
                          <li>Без F-ряда 60-65%</li>
                        </ul>
                      </div>
                    </div>
                    <div className={styles.modal_right}>
                      <Link
                        to="/catalog"
                        onClick={() => {
                          setIsOpen(false)
                          onChangeCategory(localCategory)
                        }}
                      >
                        <img
                          src={`../assets/img/${localCategoryEn}-main-catalog.png`}
                          alt="mouse"
                        />
                        <span>Просмотреть все {localCategory}</span>
                        <div className={styles.swiper_button_next_wrapper}>
                          <div className={styles.swiper_button_next}></div>
                        </div>
                      </Link>
                    </div>
                  </div>
                </Dialog.Panel>
              </div>
            </div>
          </Dialog>
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
          <Link
            to="/catalog"
            className={styles.search_section__search_block_glass}
          >
            <i className="fa-solid fa-magnifying-glass"></i>
          </Link>
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
                  to='/personal'
                  className={styles.search_section_burger_items_item}
                >
                  Профиль
                </Link>
                <hr className='hr' />
                <Link
                  onClick={() => setShowBurger(!showBurger)}
                  to='/cart'
                  className={styles.search_section_burger_items_item}
                >
                  Моя корзина
                </Link>
                <hr className='hr' />
                <Link
                  onClick={() => setShowBurger(!showBurger)}
                  to='/personal/favorites'
                  className={styles.search_section_burger_items_item}
                >
                  Избранное
                </Link>
                <hr className='hr' />
                <Link
                  onClick={() => setShowBurger(!showBurger)}
                  to='/settings'
                  className={styles.search_section_burger_items_item}
                >
                  Настройки
                </Link>
                <hr className='hr' />
                <Link
                  to='/orders'
                  onClick={() => setShowBurger(!showBurger)}
                  className={styles.search_section_burger_items_item}
                >
                  Мои заказы
                </Link>
                <hr className='hr' />
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
                to='/login'
                className={styles.search_section_burger_items_item}
              >
                Войти
              </Link>
              <hr className='hr' />
              <Link
                onClick={() => setShowBurger(!showBurger)}
                to='/register'
                className={styles.search_section_burger_items_item}
              >
                Зарегистрироваться
              </Link>
              <hr className='hr' />
              <li
                onClick={() => setShowBurger(!showBurger)}
                className={styles.search_section_burger_items_item}
              >
                Мои избранные
              </li>
              <hr className='hr' />
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
        </div>
      </div>
    </div>
  )
}

export default Menu
