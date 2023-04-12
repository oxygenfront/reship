import React from 'react'
import styles from './AdminPayment.module.sass'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAcceptPayment, fetchGetPayments, selectAdminData } from '../../redux/slices/adminSlice'

const AdminOrder = ({ id, price, order_id, data_create }) => {
	const dispatch = useDispatch()
	const token = localStorage.getItem('token')
	const {data, status} = useSelector(selectAdminData)
	async function onClickConfirm(e) {
    e.preventDefault();
    const data = await dispatch(fetchAcceptPayment({token, payment_id: id, order_id}));

    if (!data.payload) {
       alert('Не удалось подтвердить оплату')
			 return dispatch(fetchGetPayments({token}))
    }

    if (data.payload) {
      return alert(data.payload.message)
    }

   
  }
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div>{id}</div>
        <div className="">Номер заказа: {order_id}</div>
        <div className="">Создан: {data_create}</div>
        <div className={styles.name}></div>
        <div className={styles.price}>{price} ₽</div>
        <button onClick={onClickConfirm} className={styles.btn}>Подтвердить оплату</button>
      </div>
    </div>
  )
}

export default AdminOrder
