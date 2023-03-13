import React from 'react'
import { Link } from 'react-router-dom'

const Forgot = () => {
  return (
    <div className="forgot">
      <div className="container forgot__container">
        <div className="forgot__wrapper">
          <div className="forgot__message">
            <img src="./assets/img/check-mark 1.svg" alt="check" />
            <span>
              Мы отправили письмо на ваш E-mail c новым паролем для входа
            </span>
          </div>
          <Link to="/login" className="forgot__exit">
            <span>Вернуться ко входу</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Forgot
