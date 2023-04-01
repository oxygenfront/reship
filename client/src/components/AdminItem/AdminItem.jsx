import React from 'react'

import { Link } from 'react-router-dom'

import styles from './AdminItem.module.sass'
import { fetchDeleteItem } from '../../redux/slices/adminSlice'
import { useDispatch } from 'react-redux'

const AdminItem = ({ id, price, image, name }) => {
  const dispatch = useDispatch()

  const onClickDelete = () => {
    if (window.confirm('Вы действительно хотите удалить товар?')) {
      dispatch(fetchDeleteItem({ id }))
    }
  }
  return (
    <div className={styles.wrapper}>
      <Link to={`/admin/${id}`} className={styles.change}>
        Изменить товар
      </Link>
      <div className={styles.container}>
        <div className={styles.image}>
          <img src={image} alt="img" />
        </div>

        <div className={styles.name}>{name}</div>
        <div className={styles.price}>{price} ₽</div>
      </div>
      <button onClick={onClickDelete} className={styles.delete}>
        Удалить товар
      </button>
    </div>
  )
}

export default AdminItem
