import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addItem } from '../../redux/slices/cartSlice'
import styles from './FavoriteItem.module.sass'
import { Link } from 'react-router-dom'
import { selectItemsData } from '../../redux/slices/itemsSlice'

const FavoriteItem = ({ name, price, image, id }) => {
  const dispatch = useDispatch()
  console.log(name, price, id)
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
          Добавить в корзину
        </button>
      </div>
    </>
  )
}

export default FavoriteItem
