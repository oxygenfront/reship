import React, { useState } from 'react'
import { isEmail } from 'validator'
import InputMask from 'react-input-mask'
import { useDispatch } from 'react-redux'
import { fetchCreateOrder } from '../redux/slices/orderSlice'
import { fetchAuthMe } from '../redux/slices/authSlice'

import { clearItems } from '../redux/slices/cartSlice'
const Order = () => {
  const dispatch = useDispatch()
  const token = localStorage.getItem('token')
  const initialState = {
    init: '',
    number: '',
    email: '',
    city: '',
    street: '',
    number_home: '',
    number_flat: '',
    postal_code: '',
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
      clearItems()
      dispatch(fetchAuthMe(token))
    }
    setOrder(initialState)
    setIsValidEmail(isEmail(order.email))

    console.log(isValidEmail)
  }
  return (
    <section className="auth">
      <div className="container auth__container">
        <h1 className="auth__title">Оформление заказа</h1>
        <div className="main-form main-form_order">
          <form className="main-form__form" action="">
            <input
              className="main-form__form-input"
              name="init"
              value={order.init}
              onChange={updateOrder}
              type="text"
              placeholder="ФИО получателя"
            />
            <InputMask
              className="main-form__form-input"
              name="number"
              mask="+7 (999) 999-99-99"
              placeholder="+7 (___) ___-__-__"
              value={order.number}
              onChange={updateOrder}
              type="text"
            />
            <input
              className="main-form__form-input"
              name="email"
              value={order.email}
              onChange={updateOrder}
              type="text"
              placeholder="E-mail получателя"
            />
            <input
              className="main-form__form-input"
              name="city"
              value={order.city}
              onChange={updateOrder}
              type="text"
              placeholder="Город"
            />
            <input
              className="main-form__form-input"
              name="street"
              value={order.street}
              onChange={updateOrder}
              type="text"
              placeholder="Улица"
            />
            <input
              className="main-form__form-input"
              name="number_home"
              value={order.number_home}
              onChange={updateOrder}
              type="text"
              placeholder="Номер дома/строения"
            />
            <input
              className="main-form__form-input"
              name="number_flat"
              value={order.number_flat}
              onChange={updateOrder}
              type="text"
              placeholder="Номер квартиры *"
            />
            <input
              className="main-form__form-input"
              name="postal_code"
              value={order.postal_code}
              onChange={updateOrder}
              type="text"
              placeholder="Почтовый индекс"
            />
            <input
              className="main-form__form-btn"
              type="submit"
              value="Перейти к оплате"
              onClick={sendForm}
            />
          </form>
        </div>
      </div>
    </section>
  )
}

export default Order
