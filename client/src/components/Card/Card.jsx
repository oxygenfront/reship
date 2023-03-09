import React from 'react'
import styles from './Card.module.sass'

const Card = () => {
  return (
    <div className={styles.catalog__items_block_item}>
      <button className={styles.catalog__items_block_item_img_block}>
        <img src="./assets/img/iphone-catalog.png" alt="iphone" />
      </button>
      <div className={styles.catalog__items_block_item_price}>
        <span>43 000 ₽</span>
        <s>50 000 ₽</s>
      </div>
      <div className={styles.catalog__items_block_item_name}>
        <span>IPhone 11 black 128 GB</span>
      </div>
      <div className={styles.catalog__items_block_item_buttons}>
        <button className={styles.catalog__items_block_item_buttons_item}>
          Купить
        </button>
        <button className={styles.catalog__items_block_item_buttons_item}>
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
