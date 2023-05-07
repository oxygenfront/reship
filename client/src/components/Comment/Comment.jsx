import React from 'react'
import styles from './Comment.module.sass'
const Comment = () => {
  console.log(styles)
  return (
    <div className={styles.reviews__slider_slide_item}>
      <div className={styles.reviews__slider_slide_item_header}>
        <div className={styles.reviews__slider_slide_item_header_left}>
          <div
            className={styles.reviews__slider_slide_item_header_left_img_block}
          >
            <img src="" alt="" />
          </div>
          <div
            className={
              styles.reviews__slider_slide_item_header_left_title_block
            }
          >
            <div
              className={
                styles.reviews__slider_slide_item_header_left_title_block_name
              }
            >
              Максим Грязев
            </div>
            <a href="">Отзыв из Вконтакте</a>
          </div>
        </div>
        <div className={styles.reviews__slider_slide_item_header_stars}>
          <img src="/assets/img/star-review.png" alt="star" />
          <img src="/assets/img/star-review.png" alt="star" />
          <img src="/assets/img/star-review.png" alt="star" />
          <img src="/assets/img/star-review.png" alt="star" />
          <img src="/assets/img/star-review.png" alt="star" />
        </div>
      </div>
      <div className={styles.reviews__slider_slide_item_description}>
        Заказывал мышку, шла до МСК 7 дней. Все супер гуд, советую.Отдельный
        респект филу за то, что отправил мышку на следующий день в 7 утра, хотя
        заказ оформил в 23 00 по мск.
      </div>
    </div>
  )
}

export default Comment
