import React, { useEffect, useState } from 'react'
import { isEmail } from 'validator'
import InputMask from 'react-input-mask'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCreateOrder } from '../redux/slices/orderSlice'
import { fetchAuthMe, selectUserData } from '../redux/slices/authSlice'

import { clearItems, selectCart } from '../redux/slices/cartSlice'
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
    init: '',
    number: '',
    email: '',
    city: '',
    street: '',
    number_home: '',
    number_flat: '',
    postal_code: '',
    promocode: '',
    basket: [],
    customer_id: '',
  }
  const [order, setOrder] = useState({
    init: '',
    number: '',
    email: '',
    city: '',
    street: '',
    number_home: '',
    number_flat: '',
    postal_code: '',
    token,
    promocode: window.localStorage.getItem('promocode')
      ? window.localStorage.getItem('promocode')
      : '',
    basket: JSON.stringify(cartItems),
  })
  const [isValidEmail, setIsValidEmail] = useState(false)
  function updateOrder(e) {
    setOrder({
      ...order,
      [e.target.name]: e.target.value,
    })
  }

  async function sendForm(e) {
    e.preventDefault()
    if (!isEmail(order.email)) {
      alert('Email указан некорректно')
      setIsValidEmail(isEmail(order.email))
      return
    }

    const data = await dispatch(fetchCreateOrder(order))
    if (!data.payload) {
      alert('Не удалось создать заказ')
    } else {
      alert('Заказ успешно создан')
      localStorage.removeItem('promocode')
      dispatch(clearItems())
      dispatch(fetchAuthMe(token))
    }
    setOrder(initialState)
    setIsValidEmail(isEmail(order.email))

    console.log(isValidEmail)
  }

  useEffect(() => {
    status === 'success' && setOrder({ customer_id: data.id })
  }, [status])
  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])
  console.log(order)

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
                  <input type="text" name="init" id="" onChange={updateOrder} />
                </div>
                <div className="main-form_buyer_item_inputs_input_wrapper">
                  <div className="main-form_buyer_item_inputs_input_title">
                    Фамилия
                  </div>
                  <input type="text" name="init" id="" onChange={updateOrder} />
                </div>
                <div className="main-form_buyer_item_inputs_input_wrapper">
                  <div className="main-form_buyer_item_inputs_input_title">
                    Номер телефона
                  </div>
                  <input type="text" />
                </div>
                <div className="main-form_buyer_item_inputs_input_wrapper">
                  <div className="main-form_buyer_item_inputs_input_title">
                    Электронная почта
                  </div>
                  <input type="text" name="" id="" />
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
            <div className="main-form_adress_item">
              <div className="main-form_adress_item_title">
                <p>Адрес 1</p>
              </div>
              <p>Москва, Ленинский проспект, кв31</p>
            </div>
            <div className="main-form_adress_item">
              <div className="main-form_adress_item_title">
                <p>Адрес 2</p>
              </div>
              <p>Москва, Ленинский проспект, кв31</p>
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
        <button className="main-form_submit">Подтвердить заказ</button>
      </div>
    </section>
  )
}

export default Order
