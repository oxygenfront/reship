import React, { useEffect, useState } from 'react'
import { isEmail } from 'validator'
import InputMask from 'react-input-mask'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchCreateOrder,
  fetchGetPreviewPrice,
} from '../redux/slices/orderSlice'
import { fetchAuthMe, selectUserData } from '../redux/slices/authSlice'
import { Navigate, useNavigate } from 'react-router-dom'
import { clearItems } from '../redux/slices/cartSlice'
import { getCartFromLS } from '../utils/getCartFromLs'
import { calcTotalPrice } from '../utils/calcTotalPrice'

const Order = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  const { data, status } = useSelector(selectUserData)
  const { cartItems } = getCartFromLS()
  const totalPrice = calcTotalPrice(cartItems)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const [accordeon, setAccordeon] = useState({
    first_item: false,
    second_item: false,
    third_item: false,
    fourth_item: false,
    fifth_item: false,
    sixth_item: false,
    seventh_item: false,
    eighth_item: false,
  })
  const [tariff, setTariff] = useState('1')
  const [delPrice, setDelPrice] = useState(0)
  const totalCount = cartItems.reduce((sum, item) => sum + item.count, 0)
  // const deliveryPrice = totalCount === 1 ? 500 : 500 + (totalCount - 1) * 250
  const total_weight = cartItems.reduce((acc, item) => {
    return acc + item.count * item.weight
  }, 0)

  const initialState = {
    first_name: '',
    last_name: '',
    number: '',
    email: '',
    adress: '',
    promocode: '',
    basket: [],
    tariff_code: '',
  }
  const [adress, setAdress] = useState({
    region: '',
    city: '',
    street: '',
    postal_code: '',
  })
  const [order, setOrder] = useState({
    first_name: '',
    last_name: '',
    number: '',
    email: '',
    adress: '',

    promocode: window.localStorage.getItem('promocode')
      ? window.localStorage.getItem('promocode')
      : '',
    basket: JSON.stringify(cartItems),
    tariff_code: tariff,
  })

  const [isValidEmail, setIsValidEmail] = useState(false)
  function updateOrder(e) {
    setOrder({
      ...order,
      [e.target.name]: e.target.value,
    })
  }
  const [pass, setPass] = useState(false)
  function updateAdress(e) {
    setAdress({
      ...adress,
      [e.target.name]: e.target.value,
    })
  }
  const onClickSubAdress = () => {
    setOrder({
      ...order,
      adress: JSON.stringify({ adress: Object.values(adress).join(', ') }),
    })
    setPass(true)
    alert('Адресс доставки подтвержден')
  }
  const onClickDelivery = async () => {
    const data = await dispatch(
      fetchGetPreviewPrice({
        city: adress.city,
        tariff_code: tariff,
        weight: total_weight,
      })
    )
    if (!data.payload) {
      alert('Ошибка при расчете доставки')
    } else {
      alert(
        `Стоимость доставки успешно расчитана и составляет ${data.payload.total_sum} руб`
      )
      setDelPrice(data.payload.total_sum)
    }

    return
  }

  async function sendForm(e) {
    e.preventDefault()
    if (!isEmail(order.email)) {
      alert('Email указан некорректно')
      setIsValidEmail(isEmail(order.email))
      return
    }

    const data = await dispatch(
      fetchCreateOrder({
        ...order,
        tariff_code: tariff.toString(),
        city: adress.city,
      })
    )
    if (!data.payload) {
      alert('Не удалось создать заказ')
    } else {
      localStorage.removeItem('promocode')
      dispatch(clearItems())
      dispatch(fetchAuthMe(token))
      setAdress({ region: '', street: '', postal_code: '', city: '' })
      setOrder(initialState)
      return navigate('/order/confirmed')
    }

    setIsValidEmail(isEmail(order.email))
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
      const data_adress = JSON.parse(data.adress_delivery)?.adress.split(',')

      data_adress.length > 1 &&
        setAdress({
          city: data_adress[1],
          street: data_adress[2] + (data_adress[3] ? data_adress[3] : ''),
        })
      setOrder({
        ...order,
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        user_id: data.id,
        number: data.number_tel !== '' ? data.number_tel : '',
      })
    }
  }, [status])

  return (
    <section className="auth">
      <div className="container main-form_container">
        <h1 className="main-form__title">
          Оформление<br></br> <span>заказа</span>
        </h1>
        <div className="main-form_buyer">
          <div className="main-form_buyer_title">Покупатель</div>
          <div className="main-form_buyer_items">
            <div className="main-form_buyer_item_wrapper">
              <div className="main-form_buyer_item_inputs">
                <div className="main-form_buyer_item_inputs_input_wrapper">
                  <div className="main-form_buyer_item_inputs_input_title">
                    Имя
                  </div>
                  <input
                    type="text"
                    name="first_name"
                    id=""
                    value={order.first_name}
                    onChange={updateOrder}
                  />
                </div>
                <div className="main-form_buyer_item_inputs_input_wrapper">
                  <div className="main-form_buyer_item_inputs_input_title">
                    Фамилия
                  </div>
                  <input
                    type="text"
                    name="last_name"
                    id=""
                    value={order.last_name}
                    onChange={updateOrder}
                  />
                </div>
                <div className="main-form_buyer_item_inputs_input_wrapper">
                  <div className="main-form_buyer_item_inputs_input_title">
                    Номер телефона
                  </div>
                  <InputMask
                    name="number"
                    type="text"
                    mask="+7 (999) 999-99-99"
                    onChange={updateOrder}
                    value={order.number}
                    placeholder="+7 (___) ___-__-__"
                    className="settings__change_block_inputs-item"
                  />
                </div>
                <div className="main-form_buyer_item_inputs_input_wrapper">
                  <div className="main-form_buyer_item_inputs_input_title">
                    Электронная почта
                  </div>
                  <input
                    type="text"
                    id=""
                    name="email"
                    value={order.email}
                    onChange={updateOrder}
                  />
                </div>
              </div>
              <div className="main-form_buyer_item_buttons">
                <button className="main-form_buyer_item_buttons_1">
                  Отменить
                </button>
                <button className="main-form_buyer_item_buttons_2">
                  Сохранить изменения
                </button>
              </div>
            </div>
            <div className="main-form_buyer_item">
              <div className="main-form__total_wrapper">
                <div className="">
                  <div className="main-form__total_items">
                    {cartItems.map((item) => (
                      <div key={item.id} className="main-form__total_item">
                        <p>{item.name}</p>
                        <p>{item.count} шт</p>
                        <p>{item.price} руб</p>
                      </div>
                    ))}
                  </div>
                  <div className="main-form__total_delivery">
                    <p>Доставка</p>
                    <p>{delPrice > 0 ? delPrice : 0} руб</p>
                  </div>
                </div>

                <div className="cart__total-wrapper-info_total">
                  Итог{' '}
                  <span>
                    {window.localStorage.getItem('promocode')
                      ? Math.round(
                          (totalPrice + delPrice) *
                            (1 - window.localStorage.getItem('promocode') / 100)
                        )
                      : totalPrice + delPrice}{' '}
                    руб
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="main-form_adress">
          <div className="main-form_buyer_title">Адрес</div>
          <div className="main-form_adress_items">
            {/* <div className="main-form_adress_item">
              <div className="main-form_adress_item_title">
                <p>Адрес</p>
              </div>
              <p
                onClick={(e) =>
                  setOrder({
                    ...order,
                    adress: JSON.stringify({ adress: e.target.innerHTML }),
                  })
                }
              >
                {status === 'success' &&
                  JSON.parse(data.adress_delivery).adress}
              </p>
            </div> */}
            <div className="main-form_buyer_item_wrapper">
              <div className="main-form_buyer_item_inputs">
                <div className="main-form_buyer_item_inputs_input_wrapper">
                  <div className="main-form_buyer_item_inputs_input_title">
                    Регион/область
                  </div>
                  <input
                    type="text"
                    name="region"
                    id=""
                    value={adress.region}
                    onChange={updateAdress}
                  />
                </div>
                <div className="main-form_buyer_item_inputs_input_wrapper">
                  <div className="main-form_buyer_item_inputs_input_title">
                    Город
                  </div>
                  <input
                    type="text"
                    name="city"
                    id=""
                    value={adress.city}
                    onChange={updateAdress}
                  />
                </div>
                <div className="main-form_buyer_item_inputs_input_wrapper">
                  <div className="main-form_buyer_item_inputs_input_title">
                    Адрес проживания
                  </div>
                  <input
                    placeholder="Улица, дом,подьезд, кв"
                    type="text"
                    id=""
                    name="street"
                    value={adress.street}
                    onChange={updateAdress}
                  />
                </div>
                <div className="main-form_buyer_item_inputs_input_wrapper">
                  <div className="main-form_buyer_item_inputs_input_title">
                    Почтовый индекс
                  </div>
                  <input
                    type="text"
                    id=""
                    name="postal_code"
                    value={adress.postal_code}
                    onChange={updateAdress}
                  />
                </div>
              </div>
              <div className="main-form_buyer_item_buttons">
                <button className="main-form_buyer_item_buttons_1">
                  Отменить
                </button>
                <button
                  onClick={onClickSubAdress}
                  className="main-form_buyer_item_buttons_2"
                >
                  Сохранить изменения
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="main-form_delivery">
          <div className="main-form_buyer_title">
            Доставка<p>Доставка происходит через СДЭК</p>
          </div>

          <div className="main-form_faq__accordeon">
            <div
              className={
                accordeon.first_item
                  ? 'main-form_faq__item active'
                  : tariff === 136
                  ? 'main-form_faq__item_tariff'
                  : 'main-form_faq__item'
              }
              onClick={() => {
                setTariff(136)
                setDelPrice(485)
              }}
            >
              <div className="main-form_faq__item-first-block">
                <div className="main-form_faq__item-title">
                  Посылка склад-склад
                </div>

                <div
                  onClick={() =>
                    setAccordeon({ first_item: !accordeon.first_item })
                  }
                  className="main-form_faq__item-arrows_block"
                >
                  <div className="main-form_faq__item-price">485 руб</div>
                  <div className="main-form_faq__item-arrows"></div>
                </div>
              </div>
              <div className="main-form_faq__item-about">
                <div className="main-form_faq__item-about-title">
                  Как это работает?
                </div>
                <div className="main-form_faq__item-about-text">
                  Мы привозим посылку в СДЭК, а дальше в городе доставки
                  получатель самостоятельно забирает ее
                </div>
                <div className="main-form_faq__item-about-title">Сроки</div>
                <div className="main-form_faq__item-about-text">
                  3 - 5 рабочих дней
                </div>
              </div>
            </div>
            <div
              className={
                accordeon.second_item
                  ? 'main-form_faq__item active'
                  : tariff === 137
                  ? 'main-form_faq__item_tariff'
                  : 'main-form_faq__item'
              }
            >
              <div
                onClick={() => {
                  setTariff(137)
                  setDelPrice(630)
                }}
                className="main-form_faq__item-first-block"
              >
                <div className="main-form_faq__item-title">
                  Посылка склад-дверь
                </div>
                <div
                  onClick={() =>
                    setAccordeon({ second_item: !accordeon.second_item })
                  }
                  className="main-form_faq__item-arrows_block"
                >
                  <div className="main-form_faq__item-price">630 руб</div>
                  <div className="main-form_faq__item-arrows"></div>
                </div>
              </div>
              <div className="main-form_faq__item-about">
                <div className="main-form_faq__item-about-title">
                  Как это работает?
                </div>
                <div className="main-form_faq__item-about-text">
                  Мы привозим посылку в СДЭК, а дальше в городе доставки
                  получатель самостоятельно забирает ее
                </div>
                <div className="main-form_faq__item-about-title">Сроки</div>
                <div className="main-form_faq__item-about-text">
                  3 - 5 рабочих дней
                </div>
              </div>
            </div>
            <div
              className={
                accordeon.third_item
                  ? 'main-form_faq__item active'
                  : tariff === 368
                  ? 'main-form_faq__item_tariff'
                  : 'main-form_faq__item'
              }
            >
              <div
                onClick={() => {
                  setTariff(368)
                  setDelPrice(630)
                }}
                className="main-form_faq__item-first-block"
              >
                <div className="main-form_faq__item-title">
                  Посылка дверь-постамат
                </div>
                <div
                  onClick={() =>
                    setAccordeon({ third_item: !accordeon.third_item })
                  }
                  className="main-form_faq__item-arrows_block"
                >
                  <div className="main-form_faq__item-price">630 руб</div>
                  <div className="main-form_faq__item-arrows"></div>
                </div>
              </div>
              <div className="main-form_faq__item-about">
                <div className="main-form_faq__item-about-title">
                  Как это работает?
                </div>
                <div className="main-form_faq__item-about-text">
                  Мы привозим посылку в СДЭК, а дальше в городе доставки
                  получатель самостоятельно забирает ее
                </div>
                <div className="main-form_faq__item-about-title">Сроки</div>
                <div className="main-form_faq__item-about-text">
                  3 - 5 рабочих дней
                </div>
              </div>
            </div>
            <div
              className={
                accordeon.fourth_item
                  ? 'main-form_faq__item active'
                  : tariff === 233
                  ? 'main-form_faq__item_tariff'
                  : 'main-form_faq__item'
              }
            >
              <div
                onClick={() => {
                  setTariff(233)
                  setDelPrice(665)
                }}
                className="main-form_faq__item-first-block"
              >
                <div className="main-form_faq__item-title">
                  Экономичная посылка склад-дверь
                </div>
                <div
                  onClick={() =>
                    setAccordeon({ fourth_item: !accordeon.fourth_item })
                  }
                  className="main-form_faq__item-arrows_block"
                >
                  <div className="main-form_faq__item-price">665 руб</div>
                  <div className="main-form_faq__item-arrows"></div>
                </div>
              </div>
              <div className="main-form_faq__item-about">
                <div className="main-form_faq__item-about-title">
                  Как это работает?
                </div>
                <div className="main-form_faq__item-about-text">
                  Мы привозим посылку в СДЭК, а дальше в городе доставки
                  получатель самостоятельно забирает ее
                </div>
                <div className="main-form_faq__item-about-title">Сроки</div>
                <div className="main-form_faq__item-about-text">
                  3 - 5 рабочих дней
                </div>
              </div>
            </div>
            <div
              className={
                accordeon.fifth_item
                  ? 'main-form_faq__item active'
                  : tariff === 234
                  ? 'main-form_faq__item_tariff'
                  : 'main-form_faq__item'
              }
            >
              <div
                onClick={() => {
                  setTariff(234)
                  setDelPrice(775)
                }}
                className="main-form_faq__item-first-block"
              >
                <div className="main-form_faq__item-title">
                  Экономичная посылка склад-склад
                </div>
                <div
                  onClick={() =>
                    setAccordeon({ fifth_item: !accordeon.fifth_item })
                  }
                  className="main-form_faq__item-arrows_block"
                >
                  <div className="main-form_faq__item-price">775 руб</div>
                  <div className="main-form_faq__item-arrows"></div>
                </div>
              </div>
              <div className="main-form_faq__item-about">
                <div className="main-form_faq__item-about-title">
                  Как это работает?
                </div>
                <div className="main-form_faq__item-about-text">
                  Мы привозим посылку в СДЭК, а дальше в городе доставки
                  получатель самостоятельно забирает ее
                </div>
                <div className="main-form_faq__item-about-title">Сроки</div>
                <div className="main-form_faq__item-about-text">
                  3 - 5 рабочих дней
                </div>
              </div>
            </div>
            <div
              className={
                accordeon.sixth_item
                  ? 'main-form_faq__item active'
                  : tariff === 378
                  ? 'main-form_faq__item_tariff'
                  : 'main-form_faq__item'
              }
            >
              <div
                onClick={() => {
                  setTariff(378)
                  setDelPrice(775)
                }}
                className="main-form_faq__item-first-block"
              >
                <div className="main-form_faq__item-title">
                  Экономичная посылка склад-постамат
                </div>
                <div
                  onClick={() =>
                    setAccordeon({ sixth_item: !accordeon.sixth_item })
                  }
                  className="main-form_faq__item-arrows_block"
                >
                  <div className="main-form_faq__item-price">775 руб</div>
                  <div className="main-form_faq__item-arrows"></div>
                </div>
              </div>
              <div className="main-form_faq__item-about">
                <div className="main-form_faq__item-about-title">
                  Как это работает?
                </div>
                <div className="main-form_faq__item-about-text">
                  Мы привозим посылку в СДЭК, а дальше в городе доставки
                  получатель самостоятельно забирает ее
                </div>
                <div className="main-form_faq__item-about-title">Сроки</div>
                <div className="main-form_faq__item-about-text">
                  3 - 5 рабочих дней
                </div>
              </div>
            </div>
            <div
              className={
                accordeon.seventh_item
                  ? 'main-form_faq__item active'
                  : tariff === 291
                  ? 'main-form_faq__item_tariff'
                  : 'main-form_faq__item'
              }
            >
              <div
                onClick={() => {
                  setTariff(291)
                  setDelPrice(940)
                }}
                className="main-form_faq__item-first-block"
              >
                <div className="main-form_faq__item-title">
                  CDEK Express склад-склад
                </div>
                <div
                  onClick={() =>
                    setAccordeon({ seventh_item: !accordeon.seventh_item })
                  }
                  className="main-form_faq__item-arrows_block"
                >
                  <div className="main-form_faq__item-price">940 руб</div>
                  <div className="main-form_faq__item-arrows"></div>
                </div>
              </div>
              <div className="main-form_faq__item-about">
                <div className="main-form_faq__item-about-title">
                  Как это работает?
                </div>
                <div className="main-form_faq__item-about-text">
                  Мы привозим посылку в СДЭК, а дальше в городе доставки
                  получатель самостоятельно забирает ее
                </div>
                <div className="main-form_faq__item-about-title">Сроки</div>
                <div className="main-form_faq__item-about-text">
                  3 - 5 рабочих дней
                </div>
              </div>
            </div>
            <div
              className={
                accordeon.eighth_item
                  ? 'main-form_faq__item active'
                  : tariff === 294
                  ? 'main-form_faq__item_tariff'
                  : 'main-form_faq__item'
              }
            >
              <div
                onClick={() => {
                  setTariff(294)
                  setDelPrice(1020)
                }}
                className="main-form_faq__item-first-block"
              >
                <div className="main-form_faq__item-title">
                  CDEK Express склад-дверь
                </div>
                <div
                  onClick={() =>
                    setAccordeon({ eighth_item: !accordeon.eighth_item })
                  }
                  className="main-form_faq__item-arrows_block"
                >
                  <div className="main-form_faq__item-price">1020 руб</div>
                  <div className="main-form_faq__item-arrows"></div>
                </div>
              </div>
              <div className="main-form_faq__item-about">
                <div className="main-form_faq__item-about-title">
                  Как это работает?
                </div>
                <div className="main-form_faq__item-about-text">
                  Мы привозим посылку в СДЭК, а дальше в городе доставки
                  получатель самостоятельно забирает ее
                </div>
                <div className="main-form_faq__item-about-title">Сроки</div>
                <div className="main-form_faq__item-about-text">
                  3 - 5 рабочих дней
                </div>
              </div>
            </div>
          </div>
          {tariff === '1' && adress.city === '' ? (
            <button
              disabled={true}
              onClick={onClickDelivery}
              className="main-form_submit disabled del"
            >
              Выберите тариф и подтвердите адрес доставки
            </button>
          ) : (
            <button onClick={onClickDelivery} className="main-form_submit del">
              Рассчитать стоимость доставки
            </button>
          )}
        </div>
        <div className="main-form_payment">
          <div className="main-form_buyer_title">Оплата/Реквизиты</div>
          {windowWidth < 767 ? (
            <div className="main-form_payment_wrapper">
              <div className="main-form_payment_container">
                <div className="main-form_payment_items">
                  <div className="main-form_payment_item_sm">
                    <div className="main-form_payment_item_sm_wrapper">
                      <p className="main-form_payment_item_sm_title_bank">
                        Банк
                      </p>
                      <p>Сбербанк</p>
                    </div>
                    <div className="main-form_payment_item_sm_wrapper">
                      <p className="main-form_payment_item_sm_title">
                        Номер карты
                      </p>
                      <p>2202203605915232</p>
                    </div>
                    <div className="main-form_payment_item_sm_wrapper">
                      <p className="main-form_payment_item_sm_title">
                        Получатель
                      </p>
                      <p>Давид Б</p>
                    </div>
                  </div>
                  <div className="main-form_payment_item_sm">
                    <div className="main-form_payment_item_sm_wrapper">
                      <p className="main-form_payment_item_sm_title_bank">
                        Банк
                      </p>
                      <p>Тинькофф</p>
                    </div>
                    <div className="main-form_payment_item_sm_wrapper">
                      <p className="main-form_payment_item_sm_title">
                        Номер карты
                      </p>
                      <p> 2200700802202126</p>
                    </div>
                    <div className="main-form_payment_item_sm_wrapper">
                      <p className="main-form_payment_item_sm_title">
                        Получатель
                      </p>
                      <p>Давид Б</p>
                    </div>
                  </div>
                  <div className="main-form_payment_item_sm">
                    <div className="main-form_payment_item_sm_wrapper">
                      <p className="main-form_payment_item_sm_title_bank">
                        Банк
                      </p>
                      <p>Райффайзен</p>
                    </div>
                    <div className="main-form_payment_item_sm_wrapper">
                      <p className="main-form_payment_item_sm_title">
                        Номер карты
                      </p>
                      <p> 2200300514540200</p>
                    </div>
                    <div className="main-form_payment_item_sm_wrapper">
                      <p className="main-form_payment_item_sm_title">
                        Получатель
                      </p>
                      <p>Давид Б</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="main-form_payment_wrapper">
              <div className="main-form_payment_container">
                <div className="main-form_payment_item">
                  <div className="main-form_payment_item_titles">
                    <div className="main-form_payment_item_title_bank">
                      Банк
                    </div>
                    <div className="main-form_payment_item_title">
                      Номер карты
                    </div>
                    <div className="main-form_payment_item_title">
                      Получатель
                    </div>
                  </div>
                  <div className="main-form_payment_items">
                    <div className="main-form_payment_items_item">
                      <p className="main-form_payment_items_item_bank">
                        Сбербанк
                      </p>
                      <p>2202203605915232</p>
                      <p>Давид Б</p>
                    </div>
                    <div className="main-form_payment_items_item">
                      <p className="main-form_payment_items_item_bank">
                        Тинькофф
                      </p>
                      <p> 2200700802202126</p>
                      <p>Давид Б</p>
                    </div>
                    <div className="main-form_payment_items_item">
                      <p className="main-form_payment_items_item_bank">
                        Райффайзен
                      </p>
                      <p> 2200300514540200</p>
                      <p>Давид Б</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        {pass ? (
          <button
            className="main-form_submit"
            onClick={sendForm}
            disabled={false}
          >
            Подтвердить заказ
          </button>
        ) : (
          <button
            className="main-form_submit disabled"
            onClick={sendForm}
            disabled={true}
          >
            Подтвердите адрес
          </button>
        )}
      </div>
    </section>
  )
}

export default Order
