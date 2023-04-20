import React, { useState } from 'react'
import styles from './AdminPayment.module.sass'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchAcceptPayment,
  fetchGetPayments,
  selectAdminData,
} from '../../redux/slices/adminSlice'

const AdminPayment = ({ id, price, order_id, date_create, status }) => {
  const dispatch = useDispatch()
  const token = localStorage.getItem('token')

  const [isConfirm, setIsConfirm] = useState(Boolean(status))
  async function onClickConfirm(e) {
    e.preventDefault()
    const data = await dispatch(
      fetchAcceptPayment({ token, payment_id: id, order_id })
    )

    if (!data.payload) {
      alert('Не удалось подтвердить оплату')
      return dispatch(fetchGetPayments({ token }))
    }

    if (data.payload) {
      setIsConfirm(true)
      return alert(data.payload.message)
    }
  }
  function timeConverter(UNIX_timestamp) {
    const date = new Date(UNIX_timestamp)

    return date.toLocaleString('ru-US', {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',

      month: 'long',
    })
  }
  return (
    <div className={styles.wrapper}>
      <div className={isConfirm ? styles.container_confirm : styles.container}>
        <div>{id}</div>
        <div className="">Номер заказа: {order_id}</div>
        <div className="">Создан: {timeConverter(date_create)}</div>
        <div className={styles.name}></div>
        <div className={styles.price}>{price} ₽</div>
        <button
          disabled={isConfirm}
          onClick={onClickConfirm}
          className={isConfirm ? styles.btn_confirm : styles.btn}
        >
          {isConfirm ? 'Оплата подтверждена' : 'Подтвердить оплату'}
        </button>
      </div>
    </div>
  )
}

export default AdminPayment
