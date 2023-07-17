import React from 'react'
import styles from './Comment.module.sass'

const Comment = ({
  anon,
  first_name,
  last_name,
  author_id,
  date,
  rating,
  text,
}) => {
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
              {first_name.slice(0, 1).toUpperCase() + first_name.slice(1)}{' '}
              {last_name.slice(0, 1).toUpperCase() + last_name.slice(1)}
            </div>
          </div>
        </div>
        <div className={styles.reviews__slider_slide_item_header_stars}>
          {[...new Array(rating)].map((_, index) => (
            <img key={index} src="../assets/img/star 14.png" alt="star" />
          ))}
          {[...new Array(5 - Number(rating))].map((_, index) => {
            return (
              <img key={index} src="../assets/img/star 16.png" alt="star" />
            )
          })}
        </div>
      </div>
      <div className={styles.reviews__slider_slide_item_description}>
        {text}
      </div>
    </div>
  )
}

export default Comment
