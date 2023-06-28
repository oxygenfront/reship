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

const FavoriteItem = ({ name, price, image, id, color }) => {
  const dispatch = useDispatch()
  const cartItem = useSelector(selectCartItemById(id))
  const isAuth = useSelector(selectIsAuth)
  const token = localStorage.getItem('token')
  const addedCount = cartItem ? cartItem.count : 0
  const [navigate, setNavigate] = useState(false)

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
  const onClickRemove = () => {
    dispatch(removeFavorite(id))
  }

  return (
    <div className={styles.favorite__item}>
      <Link to={`/item/${id}`} className={styles.favorite__item_imgBlock}>
        <img src={JSON.parse(image)[0]} alt="product" />
      </Link>
      <div className={styles.favorite__item_columnBlock}>
        <Link to={`/item/${id}`}>
          <div className={styles.favorite__item_columnBlock_upBlock}>
            <span className={styles.favorite__item_columnBlock_upBlock_name}>
              {name}
            </span>
            <span className={styles.favorite__item_columnBlock_upBlock_price}>
              {price} руб
            </span>
          </div>
        </Link>

        <div className={styles.favorite__item_midBlock}>
          <span className={styles.favorite__item_midBlock_color}>{color}</span>
        </div>
        <div className={styles.favorite__item_bottomBlock}>
          <button
            className={styles.favorite__item_bottomBlock_delete}
            onClick={onClickRemove}
          >
            <span>Удалить</span>
          </button>
          {addedCount > 0 ? (
            <div className={styles.favorite__item_bottomBlock_button}>
              <div
                onClick={addedCount > 1 ? onClickMinus : onClickRemove}
                className={styles.favorite__item_bottomBlock_minus_wrapper}
              >
                <div className={styles.favorite__item_bottomBlock_minus}></div>
              </div>
              {addedCount}
              <button
                onClick={onClickAdd}
                className={styles.favorite__item_bottomBlock_pluses}
              >
                <div className={styles.favorite__item_bottomBlock_pluses_block}>
                  <div
                    className={styles.favorite__item_bottomBlock_pluses_itemv}
                  ></div>
                  <div
                    className={styles.favorite__item_bottomBlock_pluses_itemh}
                  ></div>
                </div>
              </button>
            </div>
          ) : (
            <button
              className={styles.favorite__item_bottomBlock_addToCart}
              onClick={onClickAdd}
            >
              В корзину
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default FavoriteItem
