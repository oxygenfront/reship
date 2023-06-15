import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  addItem,
  minusItem,
  removeItem,
  selectCartItemById,
} from '../../redux/slices/cartSlice'
import styles from './FavoriteItem.module.sass'
import { Link, Navigate } from 'react-router-dom'
import { fetchAuthMe, selectIsAuth } from '../../redux/slices/authSlice'
import {
  clearFavorite,
  fetchDeleteFavorite,
  removeFavorite,
} from '../../redux/slices/favoriteSlice'

const FavoriteItem = ({ name, price, image, id }) => {
  const dispatch = useDispatch()
  const cartItem = useSelector(selectCartItemById(id))
  const isAuth = useSelector(selectIsAuth)
  const token = localStorage.getItem('token')
  const addedCount = cartItem ? cartItem.count : 0
  const [navigate, setNavigate] = useState(false)
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

  const onClickMinus = () => {
    dispatch(minusItem(id))
  }
  const onClickDelete = () => {
    dispatch(removeFavorite(id))
    console.log('delete')
  }

  return (
    <>
      <div className={styles.person__favorites_wrapper_items_item}>
        <div className={styles.person__favorites_wrapper_items_item_left}>
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
        </div>

        <div className={styles.person__favorites_wrapper_items_item_right}>
          <div className={styles.person__favorites_wrapper_items_item_price}>
            <span>{price} руб</span>
          </div>
          <div className={styles.person__favorites_wrapper_items_item_buttons}>
            <button
              onClick={onClickDelete}
              className={styles.person__favorites_wrapper_items_item_delete}
            >
              Удалить
            </button>
            <button
              onClick={onClickAdd}
              className={styles.person__favorites_wrapper_items_item_add_cart}
            >
              В корзину {addedCount > 0 ? addedCount : null}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default FavoriteItem
