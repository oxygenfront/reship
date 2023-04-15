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
import { selectItemsData } from '../../redux/slices/itemsSlice'

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
          />
        </Link>

        <Link
          to={`/item/${id}`}
          className={styles.person__favorites_wrapper_items_item_name}
        >
          {name}
        </Link>
        <div className={styles.person__favorites_wrapper_items_item_price}>
          <span>Всего за {price} rub</span>
        </div>
        <button
          onClick={onClickAdd}
          className={styles.person__favorites_wrapper_items_item_add_cart}
        >
          Добавить в корзину {addedCount > 0 ? addedCount : null}
        </button>
      </div>
    </>
  )
}

export default FavoriteItem
