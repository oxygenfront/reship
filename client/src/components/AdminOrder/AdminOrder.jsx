import React from 'react'
import styles from './AdminOrder.module.sass'

const AdminOrder = ({
  id,
  init,
  price,
  number,
  email,
  city,
  street,
  number_home,
  number_flat,
  postal_code,
  status,
  customer_id,
  date_start,
  date_end,
  products,
}) => {
  const adress = [city, street, number_home, number_flat, postal_code]
  
  // console.log(JSON.parse(products))
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
        <div className="">ФИО: {init}</div>
        <div className="">
          Контакты: <div>{number} </div> {email}
        </div>
        <div className={styles.adress}>
          Адрес:{' '}
          {adress.map((item, index) => (
            <div key={index}> {item},</div>
          ))}
        </div>
        <div className="">ID покупателя: {customer_id}</div>
        <div className="">
          Заказ создан: <div>{timeConverter(date_start)}</div>
        </div>
        <div className={styles.name}>
          Товары:
          {JSON.parse(products).map((item) => (
            <div key={item.id}>
              <div>id:{item.id}</div> <div>name:{item.name}</div> count:
              {item.count}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AdminOrder
