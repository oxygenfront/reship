import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAddPromocode, fetchNewItem } from '../../redux/slices/adminSlice';
import { selectUserData } from '../../redux/slices/authSlice';
import { Navigate } from 'react-router-dom';
import InputMask from 'react-input-mask';
import styles from './AdminCreatePromocode.module.sass';

const AdminCreatePromocode = () => {
  const dispatch = useDispatch();
  const mask = '99%';
  const { data, status } = useSelector(selectUserData);
  const initialState = {
    promocode: '',
    persent: '',
    date_end: '',
    token: '',
  };
  const [newPromocode, setNewPromocode] = useState({
    promocode: '',
    persent: '',
    date_end: '',
    token: localStorage.getItem('token'),
  });

  function updatePromocode(e) {
    setNewPromocode({
      ...newPromocode,
      [e.target.name]: e.target.value,
    });
  }

  async function sendForm(e) {
    e.preventDefault();
    console.log(newPromocode);
    const data = await dispatch(fetchAddPromocode(newPromocode));
    console.log(data);
    if (!data.payload) {
      return alert('Не удалось создать промокод');
    }
    if (data.payload) {
      return alert('Промокод успешно создан');
    }

    setNewPromocode(initialState);
  }

  if (status === 'success' && data !== null) {
    if (data.admin !== 1) {
      return <Navigate to='/'></Navigate>;
    }
  }
  return (
    <section className={styles.wrapper}>
      <div className={styles.title}>Создание промокода</div>
      <form action='' className={styles.form_wrapper}>
        <input
          className={styles.form_input}
          name='promocode'
          value={newPromocode.promocode}
          onChange={updatePromocode}
          type='text'
          placeholder='Промокод'
        />
        <InputMask
          className={styles.form_input}
          mask={mask}
          maskChar={null}
          name='persent'
          maskPlaceholder='X%'
          placeholder='01, 02, 10, 20, 99'
          value={newPromocode.persent}
          onChange={updatePromocode}
          type='text'
        />
        <InputMask
          mask='99-99-9999'
          className={styles.form_input}
          type='text'
          name='date_end'
          placeholder='XX-XX-XXXX'
          value={newPromocode.date_end}
          onChange={updatePromocode}
        />

        <input
          className={styles.form_button}
          type='submit'
          value='Создать новый промокод'
          onClick={sendForm}
        />
      </form>
    </section>
  );
};

export default AdminCreatePromocode;
