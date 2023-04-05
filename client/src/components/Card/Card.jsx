import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  addItem,
  fetchAddCartItem,
  selectCartItemById,
} from '../../redux/slices/cartSlice'
import styles from './Card.module.sass'
import { fetchAuthMe, selectUserData } from '../../redux/slices/authSlice'
import {
  fetchAddFavorite,
  fetchDeleteFavorite,
} from '../../redux/slices/favoriteSlice'
import classNames from 'classnames'

const Card = ({ name, image, price, id, old_price }) => {
  const dispatch = useDispatch()
  const cartItem = useSelector(selectCartItemById(id))
  const token = localStorage.getItem('token')
  const { data, status } = useSelector(selectUserData)
  const onClickAdd = () => {
    const item = {
      id,
      name,
      image,
      price,
      count: 0,
    }
    dispatch(addItem(item))
  }
  // const onClickAdd = async () => {
  //   await dispatch(fetchAddCartItem({ product_id: id, token }))
  // }
  const addedCount = cartItem ? cartItem.count : 0
  const [isFavorite, setIsFavorite] = useState(false)
  useEffect(() => {
    if (status === 'success') {
      setIsFavorite(data.favorites.includes(Number(id)))
    }
  }, [status])

  const onChangeFavorite = async () => {
    if (!isFavorite) {
      const data = await dispatch(fetchAddFavorite({ product_id: id, token }))
      if (!data.payload) {
        return alert('Не удалось добавить товар в избранные')
      } else {
        dispatch(fetchAuthMe(token))
        return setIsFavorite(true)
      }
    }
    if (isFavorite) {
      const data = await dispatch(
        fetchDeleteFavorite({ product_id: id, token })
      )
      if (!data.payload) {
        return alert('Не удалось удалить товар из избранных')
      } else {
        dispatch(fetchAuthMe(token))
        return setIsFavorite(false)
      }
    }
  }
  return (
    <div className={styles.catalog__items_block_item}>
      <Link
        to={`/item/${id}`}
        className={styles.catalog__items_block_item_img_block}
      >
        <img src={image} alt="iphone" />
      </Link>
      <div className={styles.catalog__items_block_item_price}>
        <span>{price} ₽</span>
        {old_price !== price ? <s>{old_price} ₽</s> : null}
      </div>
      <div className={styles.catalog__items_block_item_name}>
        <span>{name}</span>
      </div>
      <div className={styles.catalog__items_block_item_buttons}>
        <button className={styles.catalog__items_block_item_buttons_item}>
          Купить
        </button>
        {addedCount > 0 ? (
          <button
            onClick={onClickAdd}
            className={classNames(
              styles.catalog__items_block_item_buttons_item,
              styles.catalog__items_block_item_buttons_item_added
            )}
          >
            В корзине <span>{addedCount}</span>
          </button>
        ) : (
          <button
            onClick={onClickAdd}
            className={styles.catalog__items_block_item_buttons_item}
          >
            В корзину
          </button>
        )}
        <button
          onClick={onChangeFavorite}
          className={styles.catalog__items_block_item_buttons_item}
        >
          <img
            src={
              isFavorite
                ? './assets/img/heart-catalog.svg'
                : './assets/img/heart-empty.svg'
            }
            alt="heart"
            width={'18px'}
          />
        </button>
      </div>
    </div>
  )
}

export default Card
