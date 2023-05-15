import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Navigate } from 'react-router-dom'
import {
  addItem,
  minusItem,
  removeItem,
  selectCartItemById,
} from '../../redux/slices/cartSlice'
import styles from './Card.module.sass'
import {
  fetchAuthMe,
  selectIsAuth,
  selectUserData,
} from '../../redux/slices/authSlice'
import {
  fetchAddFavorite,
  fetchDeleteFavorite,
} from '../../redux/slices/favoriteSlice'
import classNames from 'classnames'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper'

const Card = ({ name, image, price, id, old_price, view, description }) => {
  const dispatch = useDispatch()
  const cartItem = useSelector(selectCartItemById(id))
  const isAuth = useSelector(selectIsAuth)
  const token = localStorage.getItem('token')
  const { data, status } = useSelector(selectUserData)
  const [navigate, setNavigate] = useState(false)
  const [color, setColor] = useState('')

  const onClickAdd = () => {
    const item = {
      id,
      name,
      image,
      price,
      color,
      count: 0,
    }
    dispatch(addItem(item))
  }
  const onClickPlus = () => {
    dispatch(addItem({ id }))
  }
  const onClickMinus = () => {
    dispatch(minusItem(id))
  }
  const onClickRemove = () => {
    dispatch(removeItem(id))
  }

  const addedCount = cartItem ? cartItem.count : 0

  const [isFavorite, setIsFavorite] = useState(false)
  useEffect(() => {
    if (status === 'success' && isAuth) {
      const ids = data.favorites.map((item) => item.product_id)

      setIsFavorite(ids.includes(Number(id)))
    }
  }, [status])

  const onChangeFavorite = async () => {
    if (!isAuth) {
      console.log('not auth')
      return setNavigate(true)
    }
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
      dispatch(fetchAuthMe(token))
      if (!data.payload) {
        return alert('Не удалось удалить товар из избранных')
      } else {
        dispatch(fetchAuthMe(token))
        return setIsFavorite(false)
      }
    }
  }
  if (navigate) {
    return <Navigate to="/login"></Navigate>
  }
  return (
    <>
      {view === 'grid' ? (
        <div className={styles.main_catalog__products_wrapper_item}>
          <div className={styles.main_catalog__products_wrapper_item_category}>
            <span>Хит продаж</span>
          </div>
          <button
            onClick={onChangeFavorite}
            className={styles.main_catalog__products_wrapper_item_favorite}
          >
            {isFavorite ? (
              <img src="/assets/img/active-heart-main-catalog.png"></img>
            ) : (
              <img src="/assets/img/heart-main-catalog.png"></img>
            )}
          </button>
          <Swiper
            className={styles.main_catalog__products_wrapper_item_slider}
            modules={[Pagination]}
            pagination={{ clickable: true }}
            centeredSlides={true}
          >
            <SwiperSlide
              className={
                styles.main_catalog__products_wrapper_item_slider_slide
              }
              style={{
                backgroundImage: `url('/assets/products_img/${id}.png')`,
                backgroundSize: 'cover',
              }}
            ></SwiperSlide>
            <SwiperSlide
              style={{
                backgroundImage: `url('/assets/products_img/${id}.png')`,
                backgroundSize: 'cover',
              }}
              className={
                styles.main_catalog__products_wrapper_item_slider_slide
              }
            ></SwiperSlide>
            <SwiperSlide
              style={{
                backgroundImage: `url('/assets/products_img/${id}.png')`,
                backgroundSize: 'cover',
              }}
              className={
                styles.main_catalog__products_wrapper_item_slider_slide
              }
            ></SwiperSlide>
          </Swiper>
          <div className={styles.main_catalog__products_wrapper_item_title}>
            {name}
          </div>
          <div
            className={styles.main_catalog__products_wrapper_item_bottom_block}
          >
            <span className={styles.main_catalog__products_wrapper_item_price}>
              от {price} руб
            </span>
            {addedCount > 0 ? (
              <button
                className={styles.main_catalog__products_wrapper_item_button}
              >
                <div
                  onClick={addedCount > 1 ? onClickMinus : onClickRemove}
                  className={
                    styles.main_catalog__products_wrapper_item_button_minus_wrapper
                  }
                >
                  <div
                    className={
                      styles.main_catalog__products_wrapper_item_button_minus
                    }
                  ></div>
                </div>
                <span>{addedCount}</span>
                <button
                  onClick={onClickAdd}
                  className={
                    styles.main_catalog__products_wrapper_item_button_pluses
                  }
                >
                  <div
                    className={
                      styles.main_catalog__products_wrapper_item_button_pluses_block
                    }
                  >
                    <div
                      className={
                        styles.main_catalog__products_wrapper_item_button_pluses_itemv
                      }
                    ></div>
                    <div
                      className={
                        styles.main_catalog__products_wrapper_item_button_pluses_itemh
                      }
                    ></div>
                  </div>
                </button>
              </button>
            ) : (
              <button
                onClick={onClickAdd}
                className={styles.main_catalog__products_wrapper_item_button}
              >
                В корзину
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="catalog__main_item">
          <Link to={`/item/${id}`} className="catalog__main_item_left">
            <img src={`../assets/products_img/${id}.png`} alt="" />
          </Link>
          <div className="catalog__main_item_mid">
            <Link to={`/item/${id}`} className="catalog__main_item_mid-title">
              {name}
            </Link>
            <div className="catalog__main_item_mid-subtitle">{description}</div>
          </div>
          <div className="catalog__main_item_right">
            <div className="catalog__main_item_right-price">от {price} руб</div>
            <div className="catalog__main_item_right-rating">
              <img src="../assets/img/star-review.png" alt="" />
              <span>4.5</span>
              <span>5 отзывов</span>
            </div>
            {addedCount > 0 ? (
              <div
                className={styles.main_catalog__products_wrapper_item_button}
              >
                <div
                  onClick={addedCount > 1 ? onClickMinus : onClickRemove}
                  className={
                    styles.main_catalog__products_wrapper_item_button_minus_wrapper
                  }
                >
                  <div
                    className={
                      styles.main_catalog__products_wrapper_item_button_minus
                    }
                  ></div>
                </div>
                {addedCount}
                <button
                  onClick={onClickAdd}
                  className={
                    styles.main_catalog__products_wrapper_item_button_pluses
                  }
                >
                  <div
                    className={
                      styles.main_catalog__products_wrapper_item_button_pluses_block
                    }
                  >
                    <div
                      className={
                        styles.main_catalog__products_wrapper_item_button_pluses_itemv
                      }
                    ></div>
                    <div
                      className={
                        styles.main_catalog__products_wrapper_item_button_pluses_itemh
                      }
                    ></div>
                  </div>
                </button>
              </div>
            ) : (
              <button
                onClick={onClickAdd}
                className="catalog__main_item_right-add"
              >
                В корзину
              </button>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default Card
