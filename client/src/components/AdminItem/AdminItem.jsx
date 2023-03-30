import React from 'react'

import { Link } from 'react-router-dom'

import styles from './AdminItem.module.sass'

const AdminItem = ({ id, price, image, name }) => {
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
      <Link className={styles.delete}>Удалить товар</Link>
    </div>
  )
}

export default AdminItem
