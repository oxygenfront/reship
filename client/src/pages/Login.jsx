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
          <div className="auth_wrapper">
            <h1 className="auth__title">Войти</h1>
            <hr className="hr"></hr>
            <form className="auth__form" action="">
              <input
                className="auth__form-input"
                name="email"
                value={authForm.email}
                onChange={updateAuthForm}
                type="text"
                placeholder="Адрес электронной почты"
              />
              <input
                className="auth__form-input"
                name="password"
                value={authForm.password}
                onChange={updateAuthForm}
                type="password"
                placeholder="Пароль"
              />
            </form>
            <div className="auth__links">
              Новый пользователь?
              <Link to="/register" className="auth__reg">
                Зарегистрируйтесь
              </Link>
            </div>
            <div className="auth__bottom">
              <Link to="/forgot" className="auth__reg">
                Забыл пароль
              </Link>
              <button className="auth__button" type="submit" onClick={sendForm}>
                Выполнить вход
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Login
