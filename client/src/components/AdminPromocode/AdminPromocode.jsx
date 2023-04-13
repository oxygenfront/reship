import React from 'react'
import styles from './AdminPromocode.module.sass'

const AdminPromocodes = ({ id, promocode, persent, date_end }) => {
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
      <div className={styles.container}>
        <div>{id}</div>
        <div className="">Промокод: {promocode}</div>
        <div className="">Процент: {persent}</div>
        <div className={styles.name}>
          Дата окончания:{timeConverter(date_end)}
        </div>
      </div>
    </div>
  )
}

export default AdminPromocodes
