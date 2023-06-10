import React, { useEffect, useState } from 'react'
import InputMask from 'react-input-mask'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Navigate } from 'react-router-dom'
import {
  fetchAuthMe,
  fetchRegister,
  selectIsAuth,
} from '../redux/slices/authSlice'

import { AddressSuggestions } from 'react-dadata'
const Register = () => {
  const dispatch = useDispatch()
  const isAuth = useSelector(selectIsAuth)
  const [checkPass, setCheckPass] = useState(true)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const [nextPage, setNextPage] = useState(false)
  const [adress, setAdress] = useState('')
  const [regForm, setRegForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    newPassword: '',
    confirmPassword: '',
    birthdate: '',
    adress_delivery: '',
  })
  const timeStamp = new Date(
    regForm.birthdate.toLocaleString().split('-').reverse().join('.')
  ).getTime()
  const form = {
    first_name: regForm.firstName,
    last_name: regForm.lastName,
    password: regForm.confirmPassword,
    email: regForm.email,
    date_of_birth_unix: timeStamp,
    adress_delivery: adress,
  }
  const updateForm = (e) => {
    setRegForm({
      ...regForm,
      [e.target.name]: e.target.value,
    })
  }

  // const handleAdress = (e) => {
  //   console.log(e.target.value)
  //   setRegForm({ ...regForm, country: e.value })
  // }

  const closeError = (e) => {
    e.preventDefault()
    setCheckPass(true)
  }
  
  const sendForm = async (e) => {
    e.preventDefault()
    
    if (regForm.newPassword === regForm.confirmPassword) {
      setCheckPass(true)
      console.log(form)
      const data = await dispatch(fetchRegister({...form, adress_delivery: JSON.stringify({adress})}))
      if (!data.payload) {
        return alert('Не удалось зарегистрироваться')
      }

      if ('token' in data.payload) {
        window.localStorage.setItem('token', data.payload.token)

        await dispatch(fetchAuthMe(data.payload.token))
      }
      setRegForm({
        firstName: '',
        lastName: '',
        email: '',
        password: { newPassword: '', confirmPassword: '' },
        birthdate: '',
        country: '',
      })
    } else {
      setCheckPass(false)
    }
  }

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  if (isAuth) {
    return <Navigate to="/" />
  }
  console.log(adress)
  return (
    <section className="register">
      <div className="container register__container">
        {!nextPage ? (
          <div className="register__wrapper">
            <div className="register__wrapper-title">Регистрация</div>
            <hr className="hr" />
            <form action="">
              <input
                className="register__wrapper-input"
                type="text"
                name="email"
                placeholder="Адрес электронной почты"
                value={regForm.email}
                onChange={updateForm}
              />
              <input
                className="register__wrapper-input"
                type="password"
                name="newPassword"
                placeholder="Пароль"
                value={regForm.newPassword}
                onChange={updateForm}
              />
              <input
                className="register__wrapper-input"
                type="password"
                name="confirmPassword"
                placeholder="Повторите пароль"
                value={regForm.confirmPassword}
                onChange={updateForm}
              />
            </form>
            <div className="register__wrapper-link">
              Уже есть аккаунт? <Link to="/login">Войти</Link>
            </div>

            <div className="register__wrapper-buttons">
              <Link to="/forgot" className="register__wrapper-buttons_forgot">
                Забыл пароль
              </Link>
              <button
                className="register__wrapper-buttons_next"
                onClick={() => setNextPage(!nextPage)}
              >
                Продолжить
              </button>
            </div>
          </div>
        ) : (
          <div className="register__wrapper second-page">
            <div className="register__wrapper-title">Регистрация</div>
            <hr className="hr" />
            <form action="">
              <input
                className="register__wrapper-input second-page sm"
                type="text"
                name="firstName"
                placeholder="Имя"
                value={regForm.firstName}
                onChange={updateForm}
              />
              <input
                className="register__wrapper-input second-page sm"
                type="text"
                name="lastName"
                placeholder="Фамилия"
                value={regForm.lastName}
                onChange={updateForm}
              />
              <InputMask
                mask="99-99-9999"
                className="register__wrapper-input second-page sm db"
                type="text"
                name="birthdate"
                placeholder="XX-XX-XXXX"
                value={regForm.birthdate}
                onChange={updateForm}
              />
              <AddressSuggestions
                className="register__wrapper-input second-page"
                setInputValue={regForm.country}
                token="82173f834fc389954239d4414514d3ce2634ae1e"
                value={adress}
                onChange={(event) => {
                  setAdress(event.value)
                }}
                inputProps={{
                  placeholder: 'Страна, город',
                  value: regForm.country,
                  onChange: (event) => {
                    setAdress(event.value)
                  },
                }}
              />
            </form>
            <div className="register__wrapper-link">
              Уже есть аккаунт? <Link to="/login">Войти</Link>
            </div>

            <div className="register__wrapper-buttons second-page">
              <button
                className="register__wrapper-buttons_prev"
                onClick={() => setNextPage(!nextPage)}
              >
                Назад
              </button>
              <button
                className="register__wrapper-buttons_next second-page"
                onClick={sendForm}
              >
                Готово
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default Register
