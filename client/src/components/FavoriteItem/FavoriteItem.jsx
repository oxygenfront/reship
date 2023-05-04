import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  addItem,
  minusItem,
  removeItem,
  selectCartItemById,
} from '../../redux/slices/cartSlice'
import styles from './FavoriteItem.module.sass'
import { Link } from 'react-router-dom'

const FavoriteItem = ({ name, price, image, id }) => {
  const dispatch = useDispatch()
  const cartItem = useSelector(selectCartItemById(id))
  const addedCount = cartItem ? cartItem.count : 0
  console.log(name, price, id)
  const [color, setColor] = useState('')
  const onClickAdd = () => {
    const item = {
      id,
      name,
      image,
      price,
      color,
      count: 0,
    }
    dispatch(addItem(item))
  }
  const onClickPlus = () => {
    dispatch(addItem({ id }))
  }
  const onClickRemove = () => {
    dispatch(removeItem(id))
  }

  const onClickMinus = () => {
    dispatch(minusItem(id))
  }

  return (
    <>
      <div className={styles.person__favorites_wrapper_items_item}>
        <Link
          to={`/item/${id}`}
          className={styles.person__favorites_wrapper_items_item_img_wrapper}
        >
          <img
            className={styles.person__favorites_wrapper_items_item_img}
            src={`../assets/products_img/${id}.png`}
            alt="product"
          />
        </Link>

        <Link
          to={`/item/${id}`}
          className={styles.person__favorites_wrapper_items_item_name}
        >
          {name}
        </Link>

        <div
          className={styles.person__favorites_wrapper_items_item_count_block}
        >
          <button
            onClick={addedCount > 1 ? onClickMinus : onClickRemove}
            className={
              styles.person__favorites_wrapper_items_item_count_block_minus
            }
          >
            <div></div>
          </button>
          <div>{addedCount}</div>
          <button
            onClick={addedCount < 1 ? onClickAdd : onClickPlus}
            className={
              styles.person__favorites_wrapper_items_item_count_block_pluses
            }
          >
            <div
              className={
                styles.person__favorites_wrapper_items_item_count_block_pluses_itemv
              }
            ></div>
            <div
              className={
                styles.person__favorites_wrapper_items_item_count_block_pluses_itemh
              }
            ></div>
          </button>
        </div>

        <div className={styles.person__favorites_wrapper_items_item_price}>
          <span>{price} ₽</span>
        </div>

        <div className={styles.person__favorites_wrapper_items_item_buttons}>
          <button
            onClick={onClickAdd}
            className={styles.person__favorites_wrapper_items_item_add_cart}
          >
            В корзину {addedCount > 0 ? addedCount : null}
          </button>

          <Link
            to={'/order'}
            className={styles.person__favorites_wrapper_items_item_buy}
          >
            Приобрести
          </Link>
        </div>
      </div>
    </>
  )
}

export default FavoriteItem
