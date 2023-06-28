import React, { useEffect, useState } from 'react'
import { isEmail } from 'validator'
import InputMask from 'react-input-mask'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCreateOrder } from '../redux/slices/orderSlice'
import { fetchAuthMe, selectUserData } from '../redux/slices/authSlice'
import { Navigate } from 'react-router-dom'
import { clearItems } from '../redux/slices/cartSlice'
import { getCartFromLS } from '../utils/getCartFromLs'
import { calcTotalPrice } from '../utils/calcTotalPrice'
const Order = () => {
  const dispatch = useDispatch()
  const token = localStorage.getItem('token')
  const { data, status } = useSelector(selectUserData)
  const { cartItems } = getCartFromLS()
  const totalPrice = calcTotalPrice(cartItems)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  const totalCount = cartItems.reduce((sum, item) => sum + item.count, 0)
  const deliveryPrice = totalCount === 1 ? 500 : 500 + (totalCount - 1) * 250
  const initialState = {
    first_name: '',
    last_name: '',
    number: '',
    email: '',
    adress: '',
    promocode: '',
    basket: [],
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
    token,
    promocode: window.localStorage.getItem('promocode')
      ? window.localStorage.getItem('promocode')
      : '',
    basket: JSON.stringify(cartItems),
    tariff_code: '1',
  })
  const [isValidEmail, setIsValidEmail] = useState(false)
  function updateOrder(e) {
    setOrder({
      ...order,
      [e.target.name]: e.target.value,
    })
  }
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
  }

  async function sendForm(e) {
    e.preventDefault()
    if (!isEmail(order.email)) {
      alert('Email указан некорректно')
      setIsValidEmail(isEmail(order.email))
      return
    }

    console.log(order)
    const data = await dispatch(fetchCreateOrder(order))
    if (!data.payload) {
      alert('Не удалось создать заказ')
    } else {
      alert('Заказ успешно создан')
      localStorage.removeItem('promocode')
      dispatch(clearItems())
      dispatch(fetchAuthMe(token))
      setAdress({ region: '', street: '', postal_code: '', city: '' })
      setOrder(initialState)
    }

    setIsValidEmail(isEmail(order.email))

    console.log(isValidEmail)
    return <Navigate to="/"></Navigate>
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
      console.log(data_adress)
      data_adress.length > 1 &&
        setAdress({
          city: data_adress[1],
          street: data_adress[2] + data_adress[3],
        })
    }
  }, [status])
  if (cartItems.length === 0) {
    return <Navigate to="/"></Navigate>
  }

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
                    <p>300 руб</p>
                  </div>
                </div>

                <div className="cart__total-wrapper-info_total">
                  Итог{' '}
                  <span>
                    {window.localStorage.getItem('promocode')
                      ? Math.round(
                          (totalPrice + deliveryPrice) *
                            (1 - window.localStorage.getItem('promocode') / 100)
                        )
                      : totalPrice + deliveryPrice}{' '}
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
        <button className="main-form_submit" onClick={sendForm}>
          Подтвердить заказ
        </button>
      </div>
    </section>
  )
}

export default Order
