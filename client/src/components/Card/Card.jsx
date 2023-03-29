import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { addItem, selectCartItemById } from '../../redux/slices/cartSlice'
import styles from './Card.module.sass'

const Card = ({ name, image, price, id, favorite = false }) => {
  const dispatch = useDispatch()
  const cartItem = useSelector(selectCartItemById(id))
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
  const addedCount = cartItem ? cartItem.count : 0
  const [isFavorite, setIsFavorite] = useState(favorite)
  const onChangeFavorite = () => {
    setIsFavorite(!isFavorite)
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
        {/* <s>50 000 ₽</s> */}
      </div>
      <div className={styles.catalog__items_block_item_name}>
        <span>{name}</span>
      </div>
      <div className={styles.catalog__items_block_item_buttons}>
        <button className={styles.catalog__items_block_item_buttons_item}>
          Купить
        </button>
        <button
          onClick={onClickAdd}
          className={styles.catalog__items_block_item_buttons_item}
        >
          В корзину
          {addedCount > 0 ? <i>{addedCount}</i> : null}
        </button>
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
