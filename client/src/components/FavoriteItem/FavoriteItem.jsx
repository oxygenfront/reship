import React from 'react'
import { useDispatch } from 'react-redux'
import { addItem } from '../../redux/slices/cartSlice'
import styles from './FavoriteItem.module.sass'

const FavoriteItem = ({ name, price, image, id }) => {
  const dispatch = useDispatch()
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

  return (
    <div className={styles.person__favorites_wrapper_items_item}>
      <img
        className={styles.person__favorites_wrapper_items_item_img}
        src="https://placehold.co/300"
      />
      <div className={styles.person__favorites_wrapper_items_item_name}>
        Iphone 11 pro (128)
      </div>
      <div className={styles.person__favorites_wrapper_items_item_price}>
        <span>Всего за 44,999 rub</span>
      </div>
      <button
        onClick={onClickAdd}
        className={styles.person__favorites_wrapper_items_item_add_cart}
      >
        Добавить в корзину
      </button>
    </div>
  )
}

export default FavoriteItem
