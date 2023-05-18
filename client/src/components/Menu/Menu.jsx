import classNames from 'classnames'
import { Fragment, useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
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
import { addFavorite } from '../../redux/slices/favoriteSlice'

const Menu = () => {
  const dispatch = useDispatch()

  const isMounted = useRef(false)
  const isAuth = useSelector(selectIsAuth)
  const { data, status } = useSelector(selectUserData)
  const { searchValue } = useSelector(selectFilter)
  const { favorites } =
    status === 'success' ? getFavoritesFromLs(data.favorites) : []
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
  const [localCategory, setLocalCategory] = useState('мышки')
  const [localCategoryEn, setLocalCategoryEn] = useState('mouse')
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const favoriteCount = favorites ? favorites.length : null

  const onChangeCategory = useCallback((sort) => {
    dispatch(setChoosenCategorie(sort))
  }, [])

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

  const [scrollTop, setScrollTop] = useState(0)

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
        {windowWidth <= 767 ? null : (
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
        )}
        <div className={styles.search_section__search_block}>
          <input
            type="text"
            placeholder="Поиск по каталогу"
            className={styles.search_section__search_item}
            onChange={(e) => dispatch(setSearchValue(e.target.value))}
          />
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
                          onClick={() => {
                            setLocalCategoryEn('mouse')
                            setLocalCategory('мышки')
                          }}
                        >
                          <img
                            src="../assets/img/microfone.svg"
                            alt="microfone"
                          />
                          Мышки
                        </li>
                        <li
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
                          onClick={() => {
                            setLocalCategoryEn('accessory')
                            setLocalCategory('аксессуары')
                          }}
                        >
                          <img src="../assets/img/keyboard.svg" alt="access" />
                          Аксессуары
                        </li>
                        <li
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
                      </Link>
                    </div>
                  </div>
                </Dialog.Panel>
              </div>
            </div>
          </Dialog>

          <button className={styles.search_section__search_block_glass}>
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
