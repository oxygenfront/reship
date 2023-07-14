import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'

function Forgot() {
  const navigate = useNavigate()
  const [forgotForm, setForgotForm] = useState({
    email: '',
  })

  const updateForm = (e) => {
    setForgotForm({
      ...forgotForm,
      [e.target.name]: e.target.value,
    })
  }

  const sendForm = (e) => {
    e.preventDefault()
    console.log(forgotForm)
    setForgotForm({
      email: '',
    })

    navigate('/forgot/message')
  }
  return (
    <section className="auth">
      <div className="container auth__container">
        <h1 className="auth__title_forgot">Забыли пароль?</h1>
        <div className="main-form__forgot">
          <form className="main-form__form" action="">
            <input
              className="main-form__form-input"
              name="email"
              value={forgotForm.email}
              onChange={updateForm}
              type="text"
              placeholder="Адрес эл. почты"
            />

            <button className="buttons__19" type="submit" onClick={sendForm}>
              Восстановить пароль
            </button>
          </form>
          <div className="auth__links">
            <Link to="/login" className="auth__forgot">
              Войти в аккаунт
            </Link>
            <Link to="/register" className="auth__reg">
              Зарегистрироваться
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Forgot
