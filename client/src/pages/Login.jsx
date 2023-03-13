import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Navigate } from 'react-router-dom'
import { fetchAuth, selectIsAuth } from '../redux/slices/authSlice'

const Login = () => {
  const dispatch = useDispatch()
  const isAuth = useSelector(selectIsAuth)
  if (isAuth) {
    return <Navigate to="/" />
  }
  const onSubmit = async (values) => {
    const data = await dispatch(fetchAuth(values))

    if (!data.payload) {
      return alert('Не удалось авторизоваться')
    }

    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token)
    }
  }
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
              <Link to="/forgot" className="auth__forgot">
                Забыли пароль?
              </Link>
              <Link to="/register" className="auth__reg">
                Зарегистрироваться
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Login
