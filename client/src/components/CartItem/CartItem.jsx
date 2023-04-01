import classNames from 'classnames'
import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { addItem, minusItem, removeItem } from '../../redux/slices/cartSlice'
import styles from './CartItem.module.sass'

const CartItem = ({ id, price, image, count, name }) => {
  const dispatch = useDispatch()
  const onClickPlus = () => {
    dispatch(addItem({ id }))
  }
  const onClickMinus = () => {
    dispatch(minusItem(id))
  }
  const onClickRemove = () => {
    dispatch(removeItem(id))
  }

  return (
    <>
      <div
        className={classNames(
          styles.person__delivery_items_item,
          styles.cart__delivery_items_item
        )}
      >
        <Link
          to={`/item/${id}`}
          className={styles.cart__delivery_items_item_block_img}
        >
          <img
            onClick={() => console.log(id)}
            src={image}
            alt="item"
            className={classNames(
              styles.person__delivery_items_item_img,
              styles.cart__delivery_items_item_block_img_img
            )}
          />
        </Link>

        <Link
          to={`/item/${id}`}
          className={classNames(
            styles.person__delivery_items_item_name,
            styles.cart__delivery_items_item_name
          )}
        >
          {name}
        </Link>

        <div
          className={classNames(
            styles.person__delivery_items_item_count,
            styles.cart__delivery_items_item_count
          )}
        >
          <div className={styles.cart__delivery_items_item_count_wrapper}>
            <button
              onClick={count === 1 ? onClickRemove : onClickMinus}
              className={styles.cart__delivery_items_item_count_minus}
            >
              <div></div>
            </button>
            <div
              className={classNames(
                styles.person__delivery_items_item_count_number_block,
                styles.cart__delivery_items_item_count_number_block
              )}
            >
              <span
                className={classNames(
                  styles.person__delivery_items_item_count_number_block_item,
                  styles.cart__delivery_items_item_count_number_block_item
                )}
              >
                {count}
              </span>
            </div>
            <button
              onClick={onClickPlus}
              className={styles.cart__delivery_items_item_count_pluses}
            >
              <div
                className={styles.cart__delivery_items_item_count_pluses_block}
              >
                <div
                  className={
                    styles.cart__delivery_items_item_count_pluses_itemv
                  }
                ></div>
                <div
                  className={
                    styles.cart__delivery_items_item_count_pluses_itemh
                  }
                ></div>
              </div>
            </button>
          </div>
        </div>

        <div
          className={classNames(
            styles.person__delivery_items_item_price,
            styles.cart__delivery_items_item_price
          )}
        >
          {price * count} ₽
        </div>
      </div>
    </>
  )
}

export default CartItem
