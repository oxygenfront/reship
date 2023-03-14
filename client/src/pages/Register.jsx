import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, Navigate } from 'react-router-dom'
import { selectIsAuth } from '../redux/slices/authSlice'

const Register = () => {
  const isAuth = useSelector(selectIsAuth)
  const [checkPass, setCheckPass] = useState(true)

  const [regForm, setRegForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    newPassword: '',
    confirmPassword: '',
  })

  const updateForm = (e) => {
    setRegForm({
      ...regForm,
      [e.target.name]: e.target.value,
    })
  }

  const closeError = (e) => {
    e.preventDefault()
    setCheckPass(true)
  }

  const sendForm = (e) => {
    e.preventDefault()
    if (regForm.newPassword === regForm.confirmPassword) {
      setCheckPass(true)
      setRegForm({
        firstName: '',
        lastName: '',
        email: '',
        newPassword: '',
        confirmPassword: '',
      })
    } else {
      setCheckPass(false)
    }
  }
  if (isAuth) {
    return <Navigate to="/" />
  }
  return (
    <section className="auth">
      <div className="container auth__container">
        <h1 className="auth__title auth__title-reg">
          <img src="./assets/img/reg.svg" alt="reg" />
          Добро пожаловать в ReShip!
        </h1>
        <div className="main-form">
          <form className="main-form__form main-form__grid" action="">
            <input
              className="main-form__form-input main-form__grid-input"
              type="text"
              name="firstName"
              value={regForm.firstName}
              onChange={updateForm}
              placeholder="Имя"
            />

            {checkPass ? (
              <input
                className="main-form__form-input main-form__grid-input"
                name="newPassword"
                value={regForm.newPassword}
                onChange={updateForm}
                type="password"
                placeholder="Придумайте пароль"
              />
            ) : (
              <div className="main-form__form-input main-form__grid-input incorrectPass">
                <div>Пароли не совпадают</div>
                <button onClick={closeError}>
                  <img src="../assets/img/Error Form.png" alt="" />
                </button>
              </div>
            )}

            <input
              className="main-form__form-input main-form__grid-input"
              name="lastName"
              value={regForm.lastName}
              onChange={updateForm}
              type="text"
              placeholder="Фамилия"
            />

            {checkPass ? (
              <input
                className="main-form__form-input main-form__grid-input"
                name="confirmPassword"
                value={regForm.confirmPassword}
                onChange={updateForm}
                type="password"
                placeholder="Повторите пароль"
              />
            ) : (
              <div className="main-form__form-input main-form__grid-input incorrectPass">
                <div>Пароли не совпадают</div>
                <button onClick={closeError}>
                  <img src="../assets/img/Error Form.png" alt="" />
                </button>
              </div>
            )}

            <input
              className="main-form__form-input main-form__grid-input"
              name="email"
              value={regForm.email}
              onChange={updateForm}
              type="text"
              placeholder="Адресс эл. почты"
            />
            <button
              className="buttons__19 main-form__grid-input-btn"
              type="submit"
              onClick={sendForm}
            >
              Создать аккаунт
            </button>
            <label className="main-form__form__label main-form__grid-input-label">
              <p>
                Регистрируя аккаунт, вы принимаете
                <a href="#"> пользовательское соглашение</a> и даете согласие на
                обработку персональных данных
              </p>
            </label>
          </form>

          <div className="auth__links auth__links-auth">
            <p className="auth__forgot">Уже есть аккаунт?</p>
            <Link to="/login" className="auth__reg">
              Войти
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Register
