import React from 'react'

const Login = () => {
  return (
    <div>
      <section className="auth">
        <div className="container auth__container">
          <h1 className="auth__title">
            <img src="/img/input 1.svg" alt="" />
            Вход в аккаунт ReShip
          </h1>
          <div className="main-form">
            <form className="main-form__form" action="">
              <input
                className="main-form__form-input"
                type="text"
                placeholder="Адресс эл. почты"
              />
              <input
                className="main-form__form-input"
                type="text"
                placeholder="Пароль"
              />
              <input
                className="buttons__19"
                type="submit"
                value="Выполнить вход"
              />
            </form>
            <div className="auth__links">
              <a href="/forgot.html" className="auth__forgot">
                Забыли пароль?
              </a>
              <a href="/reg.html" className="auth__reg">
                Зарегистрироваться
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Login
