import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { addItem } from '../../redux/slices/cartSlice'
import styles from './Card.module.sass'

const Card = ({ name, image, price, id, favorite = false }) => {
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
        <span>{name} black 128 GB</span>
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
