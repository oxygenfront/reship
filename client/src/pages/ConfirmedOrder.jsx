import React from 'react'
import { Link } from 'react-router-dom'

const ConfirmedOrder = () => {
  return (
    <div className="confirmed_wrapper">
      <div className="confirmed_container container">
        <h1 className="confirmed_title">
          Заказ успешно <br></br>
          <span>оформлен</span>
        </h1>
        <img src="../assets/img/order-accepted.png" alt="confirmed" />
        <p className="confirmed_text">
          В течение нескольких дней<br></br> мы подтвердим ваш заказ
        </p>
        <Link className="confirmed_button" to="/">
          Вернуться на главную
        </Link>
      </div>
    </div>
  )
}

export default ConfirmedOrder
