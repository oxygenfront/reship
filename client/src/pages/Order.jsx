import React, { useState } from 'react'

const Order = () => {
  const initialState = {
    fullName: '',
    number: '',
    email: '',
    city: '',
    street: '',
    numberHouse: '',
    numberApartment: '',
    postIndex: ''
  }
  const [order, setOrder] = useState({
    fullName: '',
    number: '',
    email: '',
    city: '',
    street: '',
    numberHouse: '',
    numberApartment: '',
    postIndex: ''
  })

  function updateOrder(e) {
    setOrder({
      ...order,
      [e.target.name]: e.target.value
    })
  }
  
  function sendForm(e) {
    e.preventDefault()
    setOrder(initialState)
    console.log(order)
  }
  return (
    <section className='auth'>
      <div className='container auth__container'>
        <h1 className='auth__title'>Оформление заказа</h1>
        <div className='main-form main-form_order'>
          <form className='main-form__form' action=''>
            <input
              className='main-form__form-input'
              name='fullName'
              value={order.fullName}
              onChange={updateOrder}
              type='text'
              placeholder='ФИО получателя'
            />
            <input
              className='main-form__form-input'
              name='number'
              value={order.number}
              onChange={updateOrder}
              type='text'
              placeholder='Контактный номер телефона'
            />
            <input
              className='main-form__form-input'
              name='email'
              value={order.email}
              onChange={updateOrder}
              type='text'
              placeholder='E-mail получателя'
            />
            <input
              className='main-form__form-input'
              name='city'
              value={order.city}
              onChange={updateOrder}
              type='text'
              placeholder='Город'
            />
            <input
              className='main-form__form-input'
              name='street'
              value={order.street}
              onChange={updateOrder}
              type='text'
              placeholder='Улица'
            />
            <input
              className='main-form__form-input'
              name='numberHouse'
              value={order.numberHouse}
              onChange={updateOrder}
              type='text'
              placeholder='Номер дома/строения'
            />
            <input
              className='main-form__form-input'
              name='numberApartment'
              value={order.numberApartment}
              onChange={updateOrder}
              type='text'
              placeholder='Номер квартиры *'
            />
            <input
              className='main-form__form-input'
              name='postIndex'
              value={order.postIndex}
              onChange={updateOrder}
              type='text'
              placeholder='Почтовый индекс'
            />
            <input
              className='main-form__form-btn'
              type='submit'
              value='Перейти к оплате'
              onClick={sendForm}
            />
          </form>
        </div>
      </div>
    </section>
  );
}

export default Order
