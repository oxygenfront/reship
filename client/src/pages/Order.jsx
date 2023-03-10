import React from 'react'

const Order = () => {
  return (
    <section className="auth">
      <div className="container auth__container">
        <h1 className="auth__title">Оформление заказа</h1>
        <div className="main-form main-form_order">
          <form className="main-form__form" action="">
            <input
              className="main-form__form-input"
              type="text"
              placeholder="ФИО получателя"
            />
            <input
              className="main-form__form-input"
              type="text"
              placeholder="Контактный номер телефона"
            />
            <input
              className="main-form__form-input"
              type="text"
              placeholder="E-mail получателя"
            />
            <input
              className="main-form__form-input"
              type="text"
              placeholder="Город"
            />
            <input
              className="main-form__form-input"
              type="text"
              placeholder="Улица"
            />
            <input
              className="main-form__form-input"
              type="text"
              placeholder="Номер дома/строения"
            />
            <input
              className="main-form__form-input"
              type="text"
              placeholder="Номер квартиры *"
            />
            <input
              className="main-form__form-input"
              type="text"
              placeholder="Почтовый индекс"
            />
            <input
              className="main-form__form-btn"
              type="submit"
              value="Перейти к оплате"
            />
          </form>
        </div>
      </div>
    </section>
  )
}

export default Order
