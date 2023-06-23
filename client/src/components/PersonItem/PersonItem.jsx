import classNames from 'classnames'
import React from 'react'
import styles from './PersonItem.module.sass'

const PersonItem = ({ id, image, status, color, price, count, name }) => {
  console.log(id)
  return (
    <div
      className={styles.personal__middle_block_latest_orders_items_block_item}
    >
      <div
        className={
          styles.personal__middle_block_latest_orders_items_block_item_up
        }
      >
        <div
          className={
            styles.personal__middle_block_latest_orders_items_block_item_up_img_block
          }
        >
          <img src={image[0]} alt="" />
        </div>
        <div
          className={
            styles.personal__middle_block_latest_orders_items_block_item_up_info
          }
        >
          <div
            className={
              styles.personal__middle_block_latest_orders_items_block_item_up_info_name
            }
          >
            {name}
          </div>
          <div
            className={
              styles.personal__middle_block_latest_orders_items_block_item_up_info_color
            }
          >
            {color}
          </div>
        </div>
        <div
          className={
            styles.personal__middle_block_latest_orders_items_block_item_up_info_more
          }
        >
          <div
            className={
              styles.personal__middle_block_latest_orders_items_block_item_up_info_more_status
            }
          >
            Получено
          </div>
          <div
            className={
              styles.personal__middle_block_latest_orders_items_block_item_up_info_more_price
            }
          >
            {price.toLocaleString()} руб
          </div>
        </div>
      </div>
      <div
        className={
          styles.personal__middle_block_latest_orders_items_block_item_bottom
        }
      >
        <div
          className={
            styles.personal__middle_block_latest_orders_items_block_item_bottom_date
          }
        >
          Сен 26, 2023
        </div>
        <div
          className={
            styles.personal__middle_block_latest_orders_items_block_item_bottom_count
          }
        >
          {count} шт
        </div>
      </div>
    </div>
  )
}

export default PersonItem
