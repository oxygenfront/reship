import classNames from 'classnames'
import React from 'react'
import styles from './PersonItem.module.sass'

const PersonItem = ({ id, status, image, price, count, name }) => {
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
          <img src="../assets/products_img/1.png" alt="" />
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
            Logitech G Pro
          </div>
          <div
            className={
              styles.personal__middle_block_latest_orders_items_block_item_up_info_color
            }
          >
            Черная
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
            6 800 руб
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
          1шт
        </div>
      </div>
    </div>
  )
}

export default PersonItem
