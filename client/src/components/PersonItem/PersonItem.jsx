import classNames from 'classnames'
import React from 'react'
import styles from './PersonItem.module.sass'

const PersonItem = ({ id, status, image, price, count, name }) => {
  return (
    <div className={styles.person__delivery_history_wrapper_item}>
      <div className={styles.person__delivery_history_wrapper_item_img_block}>
        <img
          className={
            styles.person__delivery_history_wrapper_item_img_block_item
          }
          src={`../assets/products_img/${id}.png`}
          alt="itemPhoto"
        />
      </div>
      <div className={styles.person__delivery_history_wrapper_item_name}>
        <span>{name} </span>
      </div>
      <div className={styles.person__delivery_history_wrapper_item_number}>
        <span>{count}</span>
      </div>
      <div className={styles.person__delivery_history_wrapper_item_price}>
        {price} rub
      </div>
      <div
        className={classNames(
          styles.person__delivery_history_wrapper_item_status,
          styles.person__delivery_history_wrapper_item_status_deliv
        )}
      >
        <span>В пути</span>
      </div>
    </div>
  )
}

export default PersonItem
