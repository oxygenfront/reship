import React from 'react'
import { useDispatch } from 'react-redux'
import { addItem } from '../../redux/slices/cartSlice'
import styles from './Card.module.sass'

const Card = ({ name, image, price, id }) => {
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
    <div className={styles.catalog__items_block_item}>
      <button className={styles.catalog__items_block_item_img_block}>
        <img src={image} alt="iphone" />
      </button>
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
        <button className={styles.catalog__items_block_item_buttons_item}>
          <img
            src="./assets/img/heart-catalog.svg"
            alt="heart"
            width={'18px'}
          />
        </button>
      </div>
    </div>
  )
}

export default Card
