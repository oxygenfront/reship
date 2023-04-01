import React from 'react'
import styles from './DeliveryItem.module.sass'

const DeliveryItem = ({ name, price, trackNumber }) => {
  return (
    <div className={styles.person__delivery_items_item}>
      <img
        className={styles.person__delivery_items_item_img}
        src="https://placehold.co/136x136"
        alt=""
      />
      <div className={styles.person__delivery_items_item_name}>
        <span>
          <span>IPhone 11</span> <br />
          black <span>(128 gb)</span>
        </span>
      </div>
      <div className={styles.person__delivery_items_item_number}>
        <span>1</span>
      </div>
      <div className={styles.person__delivery_history_wrapper_item_price}>
        43,000 rub
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
