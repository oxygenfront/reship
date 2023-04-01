import classNames from 'classnames'
import React from 'react'
import styles from './PersonItem.module.sass'

const PersonItem = ({ status, image, price, count, title }) => {
  return (
    <div className={styles.person__delivery_history_wrapper_item}>
      <div className={styles.person__delivery_history_wrapper_item_img_block}>
        <img
          className={
            styles.person__delivery_history_wrapper_item_img_block_item
          }
          src="https://placehold.co/116x116"
          alt="itemPhoto"
        />
      </div>
      <div className={styles.person__delivery_history_wrapper_item_name}>
        <span>
          <span>IPhone 11</span> (128 gb)
        </span>
      </div>
      <div className={styles.person__delivery_history_wrapper_item_number}>
        <span>1</span>
      </div>
      <div className={styles.person__delivery_history_wrapper_item_price}>
        43,000 rub
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
