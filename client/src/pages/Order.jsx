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
  useEffect(() => {
    status === 'success' && setOrder({ customer_id: data.id })
  }, [status])
  console.log(order)
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
        <div className="main-form_delivery">
          <div className="main-form_buyer_title">Доставка</div>
          <div className="main-form_delivery_items">
            <div className="main-form_delivery_item">
              <div className="main-form_delivery_item_top">
                <div className="main-form_delivery_item_title">
                  Доставка CDEK
                </div>
                <div className="main-form_delivery_item_price">500руб</div>
              </div>
              <div className="">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque
                expedita consequatur sapiente saepe nihil suscipit dignissimos
                magni iste explicabo nesciunt!
              </div>
            </div>
            <div className="main-form_delivery_item">
              <div className="main-form_delivery_item_top">
                <div className="main-form_delivery_item_title">
                  Доставка CDEK
                </div>
                <div className="main-form_delivery_item_price">500руб</div>
              </div>
              <div className="">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque
                expedita consequatur sapiente saepe nihil suscipit dignissimos
                magni iste explicabo nesciunt!
              </div>
            </div>
          </div>
        </div>
        <button className="main-form_submit">Подтвердить заказ</button>
      </div>
    </section>
  )
}

export default Order
