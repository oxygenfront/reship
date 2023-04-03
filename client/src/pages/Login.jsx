import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Navigate } from 'react-router-dom'
import { fetchAuth, fetchAuthMe, selectIsAuth } from '../redux/slices/authSlice'

const Login = () => {
  const dispatch = useDispatch()
  const isAuth = useSelector(selectIsAuth)
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

  async function sendForm(e) {
    e.preventDefault()
    const data = await dispatch(fetchAuth(authForm))

    if (!data.payload) {
      return alert('Не удалось авторизоваться')
    }

    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token)
      dispatch(fetchAuthMe(data.payload.token))
    }

    setAuthForm({
      email: '',
      password: '',
    })
  }

  if (isAuth) {
    return <Navigate to="/" />
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
            <form className="main-form__form" action="">
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
