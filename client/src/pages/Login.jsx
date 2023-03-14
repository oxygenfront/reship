import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Navigate } from 'react-router-dom'
import { fetchAuth, selectIsAuth } from '../redux/slices/authSlice'

const Login = () => {
  const [authForm, setAuthForm] = useState({
    email: '',
    password: '',
  })

  const updateAuthForm = (e) => {
    setAuthForm({
      ...authForm,
      [e.target.name]: e.target.value,
    })
  }

  function sendForm(e) {
    e.preventDefault()
    console.log(authForm)
    setAuthForm({
      email: '',
      password: '',
    })
  }

  const dispatch = useDispatch()
  const isAuth = useSelector(selectIsAuth)
  if (isAuth) {
    return <Navigate to="/" />
  }
  const onSubmit = (values) => {
    const data = dispatch(fetchAuth(values))

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
            <img src="./assets/img/input 1.svg" alt="input" />
            Вход в аккаунт ReShip
          </h1>
          <div className="main-form">
            <form onSubmit={onSubmit} className="main-form__form" action="">
              <input
                className="main-form__form-input"
                name="email"
                value={authForm.email}
                onChange={updateAuthForm}
                type="text"
                placeholder="Адресс эл. почты"
              />
              <input
                className="main-form__form-input"
                name="password"
                value={authForm.password}
                onChange={updateAuthForm}
                type="password"
                placeholder="Пароль"
              />
              <button className="buttons__19" type="submit" onClick={sendForm}>
                Выполнить вход
              </button>
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
