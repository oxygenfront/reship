import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAddPromocode, fetchNewItem } from '../redux/slices/adminSlice'
import { selectUserData } from '../redux/slices/authSlice'
import { Navigate } from 'react-router-dom'

const AdminCreatePromocode = () => {
  const dispatch = useDispatch()

  const { data, status } = useSelector(selectUserData)
  const initialState = {
    promocode: '',
    persent: '',
    date_end: '',

    token: '',
  }
  const [newPromocode, setNewPromocode] = useState({
    promocode: '',
    persent: '',
    date_end: '',
    token: localStorage.getItem('token'),
  })

  function updatePromocode(e) {
    setNewPromocode({
      ...newPromocode,
      [e.target.name]: e.target.value,
    })
  }

  async function sendForm(e) {
    e.preventDefault()
    console.log(newPromocode)
    const data = await dispatch(fetchAddPromocode(newPromocode))
    console.log(data)
    if (!data.payload) {
      return alert('Не удалось создать промокод')
    }
    if (data.payload) {
      return alert('Промокод успешно создан')
    }

    setNewPromocode(initialState)
  }

  if (status === 'success' && data !== null) {
    if (data.admin !== 1) {
      return <Navigate to="/"></Navigate>
    }
  }
  return (
    <section className="auth">
      <div className="container auth__container">
        <h1 className="auth__title">Создание промокода</h1>
        <div className="main-form main-form_order">
          <form className="main-form__form" action="">
            <input
              className="main-form__form-input"
              name="promocode"
              value={newPromocode.promocode}
              onChange={updatePromocode}
              type="text"
              placeholder="Промокод"
            />
            <input
              className="main-form__form-input"
              name="persent"
              placeholder="Процент"
              value={newPromocode.persent}
              onChange={updatePromocode}
              type="text"
            />
            <input
              className="main-form__form-input"
              name="date_end"
              value={newPromocode.date_end}
              onChange={updatePromocode}
              type="text"
              placeholder="Дата окончания(UNIX)"
            />

            <input
              className="main-form__form-btn"
              type="submit"
              value="Создать новый промокод"
              onClick={sendForm}
            />
          </form>
        </div>
      </div>
    </section>
  )
}

export default AdminCreatePromocode
