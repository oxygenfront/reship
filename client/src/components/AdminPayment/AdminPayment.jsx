import React, { useState } from 'react';
import styles from './AdminPayment.module.sass';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchAcceptPayment,
  fetchGetPayments,
  selectAdminData,
} from '../../redux/slices/adminSlice';

const AdminPayment = ({ id, price, order_id, date_create, status }) => {
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');

  const [uuid, setUuid] = useState('');
  const [isConfirm, setIsConfirm] = useState(Boolean(status));
  async function onClickConfirm(e) {
    e.preventDefault();
    const data = await dispatch(fetchAcceptPayment({ payment_id: id, uuid }));

    if (!data.payload) {
      alert('Не удалось подтвердить оплату');
      return dispatch(fetchGetPayments({ token }));
    }

    if (data.payload) {
      setIsConfirm(true);
      return alert(data.payload.message);
    }
  }
  function timeConverter(UNIX_timestamp) {
    const date = new Date(UNIX_timestamp);

    return date.toLocaleString('ru-US', {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',

      month: 'long',
    });
  }
  return (
    <div className={isConfirm ? styles.container_confirm : styles.container}>
      <div className={styles.number_order}>Номер заказа: {order_id}</div>
      <div className={styles.date_order}>
        Создан: {timeConverter(date_create)}
      </div>
      <div className={styles.name}></div>
      <div className={styles.price}>{price} ₽</div>
      {!isConfirm ? (
        <input
          value={uuid}
          onChange={(e) => setUuid(e.target.value)}
          className={isConfirm ? styles.uuid : styles.uuid_confirmed}
          placeholder='uuid'
          type='text'
          name=''
          id=''
        />
      ) : (
        <div>{uuid}</div>
      )}
      <button
        disabled={isConfirm}
        onClick={onClickConfirm}
        className={isConfirm ? styles.btn_confirm : styles.btn}
      >
        {isConfirm ? 'Оплата подтверждена' : 'Подтвердить оплату'}
      </button>
      <button className={styles.more}>Подробности заказа</button>
    </div>
  );
};

export default AdminPayment;
