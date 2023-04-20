import React, { useEffect, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { DeliveryItem, FavoriteItem, Menu, PersonItem } from '../components'
import { useDispatch, useSelector } from 'react-redux'
import { selectIsAuth, selectUserData } from '../redux/slices/authSlice'
import {
  fetchChangeEmail,
  fetchChangePassword,
} from '../redux/slices/changeSlice'

const Personal = () => {
  const dispatch = useDispatch()
  const isAuth = useSelector(selectIsAuth)
  const { data, status } = useSelector(selectUserData)
  const token = localStorage.getItem('token')
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const [personPages, setPersonPages] = useState({
    delHistory: false,
    delInfo: false,
    favorites: false,
    reviews: false,
  })

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

  const [changeMail, setChangeMail] = useState(true)
  const [personMail, setPersonMail] = useState({
    mail: 'email',
  })

  const updateMail = (e) => {
    setPersonMail({
      ...personMail,
      [e.target.name]: e.target.value,
    })
  }

  const [changeSecret, setChangeSecret] = useState(false)
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

  const onCloseAll = () => {
    setChangeState({ changeEmail: false, changePassword: false })
    setChangeSecret(false)
  }
  const onClickSavePassword = async () => {
    console.log(password)
    const data = await dispatch(fetchChangePassword(password))
    console.log(data)
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
    console.log(email)
    const data = await dispatch(fetchChangeEmail(email))
    console.log(data)
    if (!data.payload) {
      return alert('Не удалось изменить электронную почту')
    }
    if (data.payload) {
      return alert('Электронная почта успешно изменена')
    }
    setChangeState({ changeEmail: !changeState.changeEmail })
    setPersonMail({ mail: '' })
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
    if (status === 'success') {
      setPersonName({
        firstName: data.first_name,
        lastName: data.last_name,
      })
      setPersonMail({ mail: data.email })
    }
  }, [status])

  useEffect(() => {
    setPersonPages({ delHistory: true })
  }, [])
  if (status === 'success' && !isAuth) {
    return <Navigate to="/"></Navigate>
  }
  if (status === 'success') {
    data.favorites.map((order) => console.log(order))
  }
  return (
    <>
      <Menu />
      <section className="person">
        <div className="container person__container">
          <div className="person__card">
            <div className="person__img-block">
              <img
                src="../assets/user_img/default.jpg"
                alt="avatar"
                className="person__img"
              />
            </div>
            <div className="person__info">
              {changeName ? (
                <div className="person__info-item">
                  {personName.lastName} {personName.firstName}
                </div>
              ) : (
                <div className="person__info-input-button">
                  <input
                    className="person__info-input"
                    value={personName.lastName}
                    onChange={updateName}
                    placeholder="Введите фамилию"
                    name="lastName"
                  />
                  <input
                    className="person__info-input"
                    value={personName.firstName}
                    onChange={updateName}
                    placeholder="Введите имя"
                    name="firstName"
                  />
                  <button
                    className="person__info-input_button"
                    onClick={() => setChangeName(!changeName)}
                  >
                    Сохранить
                  </button>
                </div>
              )}

              {changeMail ? (
                <div className="person__info-item">{personMail.mail}</div>
              ) : (
                <div className="person__info-input-button">
                  <input
                    className="person__info-input mail"
                    value={personMail.mail}
                    onChange={updateMail}
                    placeholder="Введите свой email"
                    name="mail"
                  />
                  <button
                    className="person__info-input_button"
                    onClick={() => setChangeMail(!changeMail)}
                  >
                    Сохранить
                  </button>
                </div>
              )}

              <button className="person__info-item">
                Укажите адрес доставки
              </button>

              <button
                className="person__info-item"
                id="settings-conf"
                onClick={() => setChangeSecret(!changeSecret)}
              >
                Настройки конфиденциальности
                <img src="./assets/img/gear.svg" alt="" />
              </button>
            </div>
          </div>

          {changeSecret ? (
            <div className="person__secret">
              <div className="person__secret-wrapper">
                {windowWidth <= 575 ? (
                  <div className="person__secret-wrapper_adaptive">
                    <button
                      className="person__secret-change-btn"
                      id="change-pass"
                      onClick={() =>
                        setChangeState({
                          changePassword: !changeState.changePassword,
                        })
                      }
                    >
                      Изменить пароль
                    </button>
                    <button
                      className="person__secret-change-btn"
                      id="change-mail"
                      onClick={() =>
                        setChangeState({
                          changeEmail: !changeState.changeEmail,
                        })
                      }
                    >
                      Изменить E-mail
                    </button>
                  </div>
                ) : (
                  <>
                    <button
                      className="person__secret-change-btn"
                      id="change-pass"
                      onClick={() =>
                        setChangeState({
                          changePassword: !changeState.changePassword,
                        })
                      }
                    >
                      Изменить пароль
                    </button>
                    <button
                      className="person__secret-change-btn"
                      id="change-mail"
                      onClick={() =>
                        setChangeState({
                          changeEmail: !changeState.changeEmail,
                        })
                      }
                    >
                      Изменить E-mail
                    </button>
                  </>
                )}
                <button
                  className="person__secret-close"
                  id="close-secret"
                  onClick={onCloseAll}
                >
                  <div className="person__secret-close__cross">
                    <div className="person__secret-close__cross_item"></div>
                    <div className="person__secret-close__cross_item"></div>
                  </div>
                </button>
              </div>
            </div>
          ) : null}

          {changeState.changePassword ? (
            <div className="person__secret-change-block person__secret-change-block-pass">
              <div
                className={
                  windowWidth <= 767
                    ? 'person__secret-change-block-wrapper adaptive'
                    : 'person__secret-change-block-wrapper'
                }
              >
                {windowWidth <= 767 ? (
                  <div className="person__secret-change-block-adaptive">
                    <input
                      className="person__secret-change-inp-pass"
                      onChange={updatePassword}
                      value={password.last_password}
                      name="password"
                      type="password"
                      placeholder="Введите старый пароль"
                    />
                    <input
                      className="person__secret-change-inp-pass"
                      name="new_password"
                      onChange={updatePassword}
                      value={password.new_password}
                      type="password"
                      placeholder="Введите новый пароль"
                    />
                    <button
                      className="person__secret-change-confirm"
                      id="person-confirm-pass"
                      onClick={onClickSavePassword}
                    >
                      Сохранить изменения
                    </button>
                  </div>
                ) : (
                  <>
                    <input
                      className="person__secret-change-inp-pass"
                      onChange={updatePassword}
                      value={password.last_password}
                      name="password"
                      type="password"
                      placeholder="Введите старый пароль"
                    />
                    <input
                      className="person__secret-change-inp-pass"
                      name="new_password"
                      onChange={updatePassword}
                      value={password.new_password}
                      type="password"
                      placeholder="Введите новый пароль"
                    />
                    <button
                      className="person__secret-change-confirm"
                      id="person-confirm-pass"
                      onClick={onClickSavePassword}
                    >
                      Сохранить изменения
                    </button>
                  </>
                )}
                <button
                  className="person__secret-close"
                  id="person-close-pass"
                  onClick={() =>
                    setChangeState({
                      changePassword: !changeState.changePassword,
                    })
                  }
                >
                  <div className="person__secret-close__cross">
                    <div className="person__secret-close__cross_item"></div>
                    <div className="person__secret-close__cross_item"></div>
                  </div>
                </button>
              </div>
            </div>
          ) : null}

          {changeState.changeEmail ? (
            <div className="person__secret-change-block person__secret-change-block-mail">
              <div
                className={
                  windowWidth <= 767
                    ? 'person__secret-change-block-wrapper adaptive'
                    : 'person__secret-change-block-wrapper'
                }
              >
                {windowWidth <= 767 ? (
                  <div className="person__secret-change-block-adaptive">
                    <input
                      className="person__secret-change-inp-pass"
                      onChange={updateEmail}
                      value={email.new_email}
                      name="new_email"
                      placeholder="Введите новый E-mail"
                    />
                    <input
                      className="person__secret-change-inp-pass"
                      onChange={updateEmail}
                      value={email.password}
                      name="password"
                      type="password"
                      placeholder="Введите пароль"
                    />
                    <button
                      className="person__secret-change-confirm"
                      id="person-confirm-mail"
                      onClick={onClickSaveEmail}
                    >
                      Сохранить изменения
                    </button>
                  </div>
                ) : (
                  <>
                    <input
                      className="person__secret-change-inp-pass"
                      onChange={updateEmail}
                      value={email.new_email}
                      name="new_email"
                      placeholder="Введите новый E-mail"
                    />
                    <input
                      className="person__secret-change-inp-pass"
                      onChange={updateEmail}
                      value={email.password}
                      name="password"
                      type="password"
                      placeholder="Введите пароль"
                    />
                    <button
                      className="person__secret-change-confirm"
                      id="person-confirm-mail"
                      onClick={onClickSaveEmail}
                    >
                      Сохранить изменения
                    </button>
                  </>
                )}
                <button
                  className="person__secret-close"
                  id="person-close-mail"
                  onClick={() =>
                    setChangeState({ changeEmail: !changeState.changeEmail })
                  }
                >
                  <div className="person__secret-close__cross">
                    <div className="person__secret-close__cross_item"></div>
                    <div className="person__secret-close__cross_item"></div>
                  </div>
                </button>
              </div>
            </div>
          ) : null}

          <div
            className={
              changeSecret ? 'person__opacity active' : 'person__opacity'
            }
          >
            {windowWidth > 767 ? (
              <div className="person__buttons buttons__10" id="person-btn">
                <button
                  className={
                    personPages.delHistory
                      ? 'person__buttons-item buttons__10-item active'
                      : 'person__buttons-item buttons__10-item'
                  }
                  id="lk-history"
                  onClick={() => setPersonPages({ delHistory: true })}
                >
                  <span>История заказов</span>
                </button>
                <button
                  className={
                    personPages.delInfo
                      ? 'person__buttons-item buttons__10-item active'
                      : 'person__buttons-item buttons__10-item'
                  }
                  id="lk-wait"
                  onClick={() => setPersonPages({ delInfo: true })}
                >
                  <span>Ожидают доставки</span>
                </button>
                <button
                  className={
                    personPages.favorites
                      ? 'person__buttons-item buttons__10-item active'
                      : 'person__buttons-item buttons__10-item'
                  }
                  id="lk-favorites"
                  onClick={() => setPersonPages({ favorites: true })}
                >
                  <span>Избранные товары</span>
                </button>
                <button
                  className={
                    personPages.reviews
                      ? 'person__buttons-item buttons__10-item active'
                      : 'person__buttons-item buttons__10-item'
                  }
                  id="lk-reviews"
                  onClick={() => setPersonPages({ reviews: true })}
                >
                  <span>Оставить отзыв</span>
                </button>
              </div>
            ) : (
              <div className="person__buttons buttons__10" id="person-btn">
                <div className="person__buttons-flex">
                  <button
                    className={
                      personPages.delHistory
                        ? 'person__buttons-item buttons__10-item active'
                        : 'person__buttons-item buttons__10-item'
                    }
                    id="lk-history"
                    onClick={() => setPersonPages({ delHistory: true })}
                  >
                    <span>История заказов</span>
                  </button>
                  <button
                    className={
                      personPages.delInfo
                        ? 'person__buttons-item buttons__10-item active'
                        : 'person__buttons-item buttons__10-item'
                    }
                    id="lk-wait"
                    onClick={() => setPersonPages({ delInfo: true })}
                  >
                    <span>Ожидают доставки</span>
                  </button>
                </div>
                <div className="person__buttons-flex">
                  <button
                    className={
                      personPages.favorites
                        ? 'person__buttons-item buttons__10-item active'
                        : 'person__buttons-item buttons__10-item'
                    }
                    id="lk-favorites"
                    onClick={() => setPersonPages({ favorites: true })}
                  >
                    <span>Избранные товары</span>
                  </button>
                  <button
                    className={
                      personPages.reviews
                        ? 'person__buttons-item buttons__10-item active'
                        : 'person__buttons-item buttons__10-item'
                    }
                    id="lk-reviews"
                    onClick={() => setPersonPages({ reviews: true })}
                  >
                    <span>Оставить отзыв</span>
                  </button>
                </div>
              </div>
            )}

            {personPages.delHistory ? (
              status === 'success' && data.orders.length > 0 ? (
                data.orders.map((order) => (
                  <div
                    key={order.id}
                    className="person__delivery-history_wrapper"
                  >
                    <div className="person__delivery-history_wrapper-title">
                      Дата покупки: {timeConverter(order.date_start)}
                    </div>
                    {order.products.map((product) => (
                      <PersonItem
                        count={product.count}
                        name={product.name}
                        id={product.product_id}
                        price={product.price}
                        key={product.product_id}
                      ></PersonItem>
                    ))}
                  </div>
                ))
              ) : (
                <div className="person__history-wrapper">
                  <div className="person__reviews_text-block">
                    <p>
                      Вы еще не совершали покупок - вернитесь сюда позднее, а
                      пока можете <Link to="/catalog">перейти в каталог</Link>,
                      для выбора товара
                    </p>
                  </div>
                </div>
              )
            ) : null}

            {personPages.delInfo ? (
              data.orders.length > 0 ? (
                <div className="person__delivery-info_wrapper">
                  <div className="person__delivery-info_block">
                    <div className="person__delivery-info">
                      <div className="person__delivery-info_main">
                        Ближайшая доставка ожидается <span>...</span>
                      </div>
                      <hr className="hr" />
                      <div className="person__delivery-info_main">
                        Количество товаров к получению: <span>3 шт</span>
                      </div>
                      <hr className="hr" />
                      <div className="person__delivery-info_text">
                        При себе обязательно иметь документ удостоверяющий
                        личность
                      </div>
                    </div>
                  </div>

                  <div className="person__delivery-links">
                    <a className="person__delivery-links_track" href="/#">
                      <span>Отследить заказ</span>
                    </a>
                    <a className="person__delivery-links_deliv" href="/#">
                      <span>Задать вопрос по доставке</span>
                    </a>
                  </div>

                  <div className="person__delivery-items">
                    {status === 'success' &&
                      data.orders.map((order) =>
                        order.products.map((product) => (
                          <DeliveryItem
                            name={product.name}
                            price={product.price}
                            count={product.count}
                            id={product.product_id}
                            key={product.product_id}
                          />
                        ))
                      )}
                  </div>
                </div>
              ) : (
                <div className="person__history-wrapper">
                  <div className="person__reviews_text-block">
                    <p>
                      Вы еще не совершали покупок - вернитесь сюда позднее, а
                      пока можете <Link to="/catalog">перейти в каталог</Link>,
                      для выбора товара
                    </p>
                  </div>
                </div>
              )
            ) : null}

            {personPages.favorites && status === 'success' ? (
              data.favorites.length > 0 ? (
                <div className="person__favorites-wrapper">
                  <div className="person__favorites-wrapper-items">
                    {data.favorites.map((item) => (
                      <FavoriteItem
                        key={item.product_id}
                        id={item.product_id}
                        price={item.price}
                        name={item.name}
                      ></FavoriteItem>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="person__wait-wrapper">
                  <div className="person__reviews_text-block">
                    <p>
                      Вы еще не добавляли товары в “Избранное” - вернитесь сюда
                      позднее, а пока можете <br />
                      <Link to="/catalog">перейти в каталог</Link>, для выбора
                      товара
                    </p>
                  </div>
                </div>
              )
            ) : null}

            {personPages.reviews ? (
              <div className="person__reviews">
                <div className="person__reviews_text-block">
                  <p>
                    <span>Мы любим своих клиентов</span> и хотим, чтобы вы
                    делились своими реальными <br /> отзывами о “ReShip” и нас
                    становилось все больше
                  </p>
                </div>

                {windowWidth <= 992 ? (
                  <div className="person__reviews-buttons buttons__10 ">
                    <div className="person__reviews-buttons_flex">
                      <a
                        href="https://vk.com/topic-214661020_49238528"
                        className="person__reviews-buttons-item buttons__10-item"
                      >
                        <span>Оставить отзыв в ВКонтакте</span>
                      </a>
                      <a
                        href="/#"
                        className="person__reviews-buttons-item buttons__10-item"
                      >
                        <span>Оставить отзыв в Discord</span>
                      </a>
                    </div>
                    <div className="person__reviews-buttons_flex">
                      <a
                        href="https://vk.com/topic-214661020_49238528"
                        className="person__reviews-buttons-item buttons__10-item"
                      >
                        <span>ВКонтакте отзывы</span>
                      </a>
                      <a
                        href="https://discord.com/channels/994699375014064198/994699375655788626"
                        className="person__reviews-buttons-item buttons__10-item"
                      >
                        <span>Discord отзывы</span>
                      </a>
                    </div>
                  </div>
                ) : (
                  <div className="person__reviews-buttons buttons__10 ">
                    <a
                      href="https://vk.com/topic-214661020_49238528"
                      className="person__reviews-buttons-item buttons__10-item"
                    >
                      <span>Оставить отзыв в ВКонтакте</span>
                    </a>
                    <a
                      href="/#"
                      className="person__reviews-buttons-item buttons__10-item"
                    >
                      <span>Оставить отзыв в Discord</span>
                    </a>
                    <a
                      href="https://vk.com/topic-214661020_49238528"
                      className="person__reviews-buttons-item buttons__10-item"
                    >
                      <span>ВКонтакте отзывы</span>
                    </a>
                    <a
                      href="https://discord.com/channels/994699375014064198/994699375655788626"
                      className="person__reviews-buttons-item buttons__10-item"
                    >
                      <span>Discord отзывы</span>
                    </a>
                  </div>
                )}
              </div>
            ) : null}

            <div
              className="person__history-wrapper"
              style={{ display: 'none' }}
            >
              <div className="person__reviews_text-block">
                <p>
                  Вы еще не совершали покупок - вернитесь сюда позднее, а пока
                  можете <Link to="/catalog">перейти в каталог</Link>, <br />{' '}
                  для выбора товара
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Personal
