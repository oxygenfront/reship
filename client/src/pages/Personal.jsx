import React, { useEffect, useState, Fragment } from 'react'
import { Link, Navigate } from 'react-router-dom'
import {
  Card,
  DeliveryItem,
  FavoriteItem,
  Footer,
  Menu,
  PersonItem,
} from '../components'
import { useDispatch, useSelector } from 'react-redux'
import { selectIsAuth, selectUserData } from '../redux/slices/authSlice'
import {
  fetchChangeEmail,
  fetchChangePassword,
} from '../redux/slices/changeSlice'
import { selectItemsData } from '../redux/slices/itemsSlice'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper'
import { Menu as DropDown, Popover } from '@headlessui/react'
import { DateRangePicker } from 'rsuite'

const Personal = () => {
  const dispatch = useDispatch()
  const isAuth = useSelector(selectIsAuth)
  const { data, status } = useSelector(selectUserData)
  const { items, itemsStatus = status } = useSelector(selectItemsData)
  const token = localStorage.getItem('token')
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const [sortBy, setSortBy] = useState({
    date: false,
    status: false,
    price: false,
  })
  const [calendarValue, setCalendarValue] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [changeName, setChangeName] = useState(true)
  const [personName, setPersonName] = useState({
    firstName: 'Имя',
    lastName: 'Фамилия',
  })

  const updateName = (e) => {
    setPersonName({
      ...personName,
      [e.target.name]: e.target.value,
    })
  }

  const [changeState, setChangeState] = useState({
    changePassword: false,
    changeEmail: false,
  })
  const [password, setPassword] = useState({
    password: '',
    new_password: '',
    token,
  })

  const updatePassword = (e) => {
    setPassword({
      ...password,
      [e.target.name]: e.target.value,
    })
  }

  const [email, setEmail] = useState({
    new_email: '',
    password: '',
    token,
  })

  const updateEmail = (e) => {
    setEmail({
      ...email,
      [e.target.name]: e.target.value,
    })
  }

  const onClickSavePassword = async () => {
    const data = await dispatch(fetchChangePassword(password))
    if (!data.payload) {
      return alert('Не удалось изменить пароль')
    }
    if (data.payload) {
      return alert('Пароль успешно изменен')
    }

    setChangeState({
      changePassword: !changeState.changePassword,
    })
    setPassword({ lastPassword: '', newPassword: '' })
  }
  const onClickSaveEmail = async () => {
    const data = await dispatch(fetchChangeEmail(email))
    if (!data.payload) {
      return alert('Не удалось изменить электронную почту')
    }
    if (data.payload) {
      return alert('Электронная почта успешно изменена')
    }
    setChangeState({ changeEmail: !changeState.changeEmail })
  }
  function timeConverter(UNIX_timestamp) {
    const date = new Date(UNIX_timestamp)

    return date.toLocaleString('ru-US', {
      day: 'numeric',
      year: 'numeric',
      month: 'long',
    })
  }

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (status === 'success') {
      setPersonName({
        firstName: data.first_name,
        lastName: data.last_name,
      })
    }
  }, [status])

  if (status === 'success' && !isAuth) {
    return <Navigate to="/"></Navigate>
  }
  if (status === 'success') {
    data.favorites.map((order) => console.log(order))
  }
  // if (calendarValue.length > 0) {
  //   console.log(calendarValue[0].toLocaleString().slice(0, 10))
  //   const timeStamp = new Date(
  //     calendarValue[0]
  //       .toLocaleString()
  //       .slice(0, 10)
  //       .split('.')
  //       .reverse()
  //       .join('.')
  //   ).getTime()
  //   console.log(timeStamp)
  // }

  return (
    <>
      <div className="personal">
        <div className="personal__container container">
          <div className="personal__user-block">
            <div className="personal__user-block_name">
              Добрый день, <br />{' '}
              {status === 'success' && data.first_name ? (
                <span>
                  {data.first_name[0].toUpperCase() + data.first_name.slice(1)}
                </span>
              ) : null}
            </div>
            <div className="personal__user-block_profile">
              <div className="personal__user-block_profile_img-block">
                <img
                  src="../assets/user_img/default.jpg"
                  alt="avatar"
                  className="person__img"
                />
              </div>
              <div className="personal__user-block_profile_right-block">
                <div className="personal__user-block_profile_right-block_name">
                  {personName.firstName} {personName.lastName}
                </div>
                <Link
                  to="/settings"
                  className="personal__user-block_profile_right-block_button"
                >
                  Изменить профиль
                </Link>
              </div>
            </div>
          </div>

          <div className="personal__middle-block">
            <div className="personal__middle-block_buttons">
              <Link
                to="/personal/favorites"
                className="personal__middle-block_buttons_item"
              >
                Избранные
              </Link>
              <Link to="/cart" className="personal__middle-block_buttons_item">
                Корзина
              </Link>
              <Link
                to="/settings"
                className="personal__middle-block_buttons_item"
              >
                Настройки
              </Link>
              <Link
                to="/orders"
                className="personal__middle-block_buttons_item"
              >
                Мои заказы
              </Link>
            </div>
            <div className="personal__middle-block_latest-orders">
              <div className="personal__middle-block_latest-orders_header">
                <span>Последние заказы</span>
                <div className="personal__middle-block_latest-orders_menu_wrapper">
                  {console.log(isOpen)}
                  <DropDown
                    as="div"
                    className="personal__middle-block_latest-orders_menu"
                  >
                    {({ open }) => (
                      <>
                        <div>
                          <DropDown.Button className="">
                            <div onClick={() => setIsOpen(!isOpen)}>
                              <img
                                src="../assets/img/settings-button.png"
                                alt="settings"
                              />
                            </div>
                          </DropDown.Button>
                        </div>
                        {isOpen && (
                          <DropDown.Items
                            static
                            className="personal__middle-block_latest-orders_menu_items"
                          >
                            <p className="personal__middle-block_latest-orders_menu_items-title">
                              Сортировать по
                            </p>

                            <div className="personal__middle-block_latest-orders_menu_items-wrapper">
                              <DropDown.Item
                                onClick={(e) => {
                                  setSortBy({ date: !sortBy.date })
                                }}
                                className="personal__middle-block_latest-orders_menu_items-item"
                              >
                                <div className="">
                                  <p>Дате</p>
                                  <div className="personal__middle-block_latest-orders_menu_items-item_pluses">
                                    <div className="personal__middle-block_latest-orders_menu_items-item_pluses_block">
                                      <div className="personal__middle-block_latest-orders_menu_items-item_pluses_itemv"></div>
                                      <div className="personal__middle-block_latest-orders_menu_items-item_pluses_itemh"></div>
                                    </div>
                                  </div>
                                </div>
                              </DropDown.Item>
                              {sortBy.date === true ? (
                                <DateRangePicker
                                  onChange={(value) => setCalendarValue(value)}
                                  value={calendarValue}
                                  isoWeek={true}
                                  character=" до "
                                  appearance="subtle"
                                  size="xs"
                                  placeholder={'Укажите период'}
                                  showOneCalendar={true}
                                  preventOverflow={false}
                                ></DateRangePicker>
                              ) : null}
                              <DropDown.Item
                                onClick={(e) => {
                                  setSortBy({ status: !sortBy.status })
                                  e.cancelBubble = true
                                }}
                                className="personal__middle-block_latest-orders_menu_items-item"
                              >
                                <div className="">
                                  <p>Статусу заказа</p>
                                  <div className="personal__middle-block_latest-orders_menu_items-item_pluses">
                                    <div className="personal__middle-block_latest-orders_menu_items-item_pluses_block">
                                      <div className="personal__middle-block_latest-orders_menu_items-item_pluses_itemv"></div>
                                      <div className="personal__middle-block_latest-orders_menu_items-item_pluses_itemh"></div>
                                    </div>
                                  </div>
                                </div>
                              </DropDown.Item>
                              {sortBy.status === true ? (
                                <div className="personal__middle-block_latest-orders_menu_items-item_status-wrapper">
                                  <ul>
                                    <li>Отменено</li>
                                    <li>Получено</li>
                                    <li>Ожидает получения</li>
                                  </ul>
                                </div>
                              ) : null}
                              <DropDown.Item
                                onClick={() =>
                                  setSortBy({ price: !sortBy.price })
                                }
                                className="personal__middle-block_latest-orders_menu_items-item"
                              >
                                <div className="">
                                  <p>Цене</p>
                                  <div className="personal__middle-block_latest-orders_menu_items-item_pluses">
                                    <div className="personal__middle-block_latest-orders_menu_items-item_pluses_block">
                                      <div className="personal__middle-block_latest-orders_menu_items-item_pluses_itemv"></div>
                                      <div className="personal__middle-block_latest-orders_menu_items-item_pluses_itemh"></div>
                                    </div>
                                  </div>
                                </div>
                              </DropDown.Item>
                              {sortBy.price === true ? (
                                <div className="personal__middle-block_latest-orders_menu_items-item_status-wrapper">
                                  <ul>
                                    <li>От наибольшей</li>
                                    <li>От наименьшей</li>
                                  </ul>
                                </div>
                              ) : null}
                            </div>
                          </DropDown.Items>
                        )}
                      </>
                    )}
                  </DropDown>
                </div>
              </div>
              <div className="personal__middle-block_latest-orders_items-block">
                <PersonItem></PersonItem>
                <PersonItem></PersonItem>
                <PersonItem></PersonItem>

                <Link
                  to="/orders"
                  className="personal__middle-block_latest-orders_items-block_all"
                >
                  Все заказы <span></span>
                </Link>
              </div>
            </div>
          </div>

          <div className="personal__reviews-block">
            <div className="personal__reviews-block_title">Мои отзывы</div>
            <Swiper
              modules={[Navigation]}
              navigation
              speed={1300} 
              slidesPerView={2}
              spaceBetween={45}
              className="personal__reviews-block_slider"
            >
              <SwiperSlide className="personal__reviews-block_slider-item">
                <div className="personal__reviews-block_slider-item_header">
                  <div className="personal__reviews-block_slider-item_header_left-block">
                    <div className="personal__reviews-block_slider-item_header_img-block">
                      <img src="../assets/img/logitech-lk.png" alt="" />
                    </div>
                    <div className="personal__reviews-block_slider-item_header_info">
                      <div className="personal__reviews-block_slider-item_header_info_name">
                        Logitech G Pro
                      </div>
                      <div className="personal__reviews-block_slider-item_header_info_color">
                        Черный
                      </div>
                    </div>
                  </div>
                  <div className="personal__reviews-block_slider-item_header_right-block">
                    <div className="personal__reviews-block_slider-item_header_stars">
                      <img src="../assets/img/star-review.png" alt="" />
                      <img src="../assets/img/star-review.png" alt="" />
                      <img src="../assets/img/star-review.png" alt="" />
                      <img src="../assets/img/star-review.png" alt="" />
                      <img src="../assets/img/star-review.png" alt="" />
                    </div>
                    <div className="personal__reviews-block_slider-item_header_date">
                      Сен 26, 2023
                    </div>
                  </div>
                </div>
                <hr className="hr" />
                <div className="personal__reviews-block_slider-item_review">
                  <span>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Dolore itaque labore minima culpa porro eligendi sed error
                    modi accusantium, dolores doloribus at. Corporis sed alias
                    non quis debitis veritatis quisquam.
                  </span>
                </div>
              </SwiperSlide>
              <SwiperSlide className="personal__reviews-block_slider-item">
                <div className="personal__reviews-block_slider-item_header">
                  <div className="personal__reviews-block_slider-item_header_left-block">
                    <div className="personal__reviews-block_slider-item_header_img-block">
                      <img src="../assets/img/logitech-lk.png" alt="" />
                    </div>
                    <div className="personal__reviews-block_slider-item_header_info">
                      <div className="personal__reviews-block_slider-item_header_info_name">
                        Logitech G Pro
                      </div>
                      <div className="personal__reviews-block_slider-item_header_info_color">
                        Черный
                      </div>
                    </div>
                  </div>
                  <div className="personal__reviews-block_slider-item_header_right-block">
                    <div className="personal__reviews-block_slider-item_header_stars">
                      <img src="../assets/img/star-review.png" alt="" />
                      <img src="../assets/img/star-review.png" alt="" />
                      <img src="../assets/img/star-review.png" alt="" />
                      <img src="../assets/img/star-review.png" alt="" />
                      <img src="../assets/img/star-review.png" alt="" />
                    </div>
                    <div className="personal__reviews-block_slider-item_header_date">
                      Сен 26, 2023
                    </div>
                  </div>
                </div>
                <hr className="hr" />
                <div className="personal__reviews-block_slider-item_review">
                  <span>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Dolore itaque labore minima culpa porro eligendi sed error
                    modi accusantium, dolores doloribus at. Corporis sed alias
                    non quis debitis veritatis quisquam.
                  </span>
                </div>
              </SwiperSlide>
              <SwiperSlide className="personal__reviews-block_slider-item">
                <div className="personal__reviews-block_slider-item_header">
                  <div className="personal__reviews-block_slider-item_header_left-block">
                    <div className="personal__reviews-block_slider-item_header_img-block">
                      <img src="../assets/img/logitech-lk.png" alt="" />
                    </div>
                    <div className="personal__reviews-block_slider-item_header_info">
                      <div className="personal__reviews-block_slider-item_header_info_name">
                        Logitech G Pro
                      </div>
                      <div className="personal__reviews-block_slider-item_header_info_color">
                        Черный
                      </div>
                    </div>
                  </div>
                  <div className="personal__reviews-block_slider-item_header_right-block">
                    <div className="personal__reviews-block_slider-item_header_stars">
                      <img src="../assets/img/star-review.png" alt="" />
                      <img src="../assets/img/star-review.png" alt="" />
                      <img src="../assets/img/star-review.png" alt="" />
                      <img src="../assets/img/star-review.png" alt="" />
                      <img src="../assets/img/star-review.png" alt="" />
                    </div>
                    <div className="personal__reviews-block_slider-item_header_date">
                      Сен 26, 2023
                    </div>
                  </div>
                </div>
                <hr className="hr" />
                <div className="personal__reviews-block_slider-item_review">
                  <span>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Dolore itaque labore minima culpa porro eligendi sed error
                    modi accusantium, dolores doloribus at. Corporis sed alias
                    non quis debitis veritatis quisquam.
                  </span>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>

          <div className="personal__interesting">
            {itemsStatus === 'success' &&
              items
                .slice(0, 3)
                .map((item) => (
                  <Card
                    view="grid"
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    price={item.price}
                  ></Card>
                ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Personal
