import React, { useEffect, useState } from 'react'
import styles from './DeliveryItem.module.sass'

const DeliveryItem = ({ id, count, name, price, trackNumber }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className={styles.person__delivery_items_item}>
      <div className={styles.person__delivery_items_item_img}>
        <img src={`../assets/products_img/${id}.png`} alt="product" />
      </div>
      <div className={styles.person__delivery_items_item_name}>
        <span>
          <span>{name}</span>
        </span>
      </div>
      <div className={styles.person__delivery_items_item_number}>
        <span>{count}</span>
      </div>
      <div className={styles.person__delivery_history_wrapper_item_price}>
        {price} rub
      </div>
      <div className={styles.person__delivery_history_wrapper_item_buttons}>
        <div className={styles.person__delivery_history_wrapper_item_status}>
          <span>Отследить</span>
        </div>
        <div className={styles.person__delivery_history_wrapper_item_status}>
          <span>Копировать трек</span>
        </div>
      </div>
    </div>
  )
}

export default DeliveryItem
