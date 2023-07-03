import classNames from 'classnames'
import React from 'react'
import styles from './PersonItem.module.sass'

const PersonItem = ({
  id,
  image,
  status,
  color,
  price,
  count,
  name,
  date_craete,
}) => {
  function timeConverter(UNIX_timestamp) {
    const date = new Date(UNIX_timestamp)

    return date.toLocaleString('ru-US', {
      day: 'numeric',
      year: 'numeric',
      month: 'long',
    })
  }
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
          <img src={JSON.parse(image)[0]} alt="" />
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
          {timeConverter(date_craete).slice(0, -1)}
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
