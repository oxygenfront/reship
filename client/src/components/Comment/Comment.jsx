import React from 'react'
import styles from './Comment.module.sass'
const Comment = ({ anon, author_id, date, rating, text }) => {
  return (
    <div className={styles.reviews__slider_slide_item}>
      <div className={styles.reviews__slider_slide_item_header}>
        <div className={styles.reviews__slider_slide_item_header_left}>
          <div
            className={styles.reviews__slider_slide_item_header_left_img_block}
          >
            <img src="../assets/user_img/default.jpg" alt="user" />
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
          </div>
        </div>
        <div className={styles.reviews__slider_slide_item_header_stars}>
          {[...new Array(rating)].map(() => (
            <img src="/assets/img/star-review.png" alt="star" />
          ))}
        </div>
      </div>
      <div className={styles.reviews__slider_slide_item_description}>
        {text}
      </div>
    </div>
  )
}

export default Comment
