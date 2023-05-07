import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Navigate } from 'react-router-dom'
import { addItem, selectCartItemById } from '../../redux/slices/cartSlice'
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

const Card = ({ name, image, price, id, old_price }) => {
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
          className={styles.main_catalog__products_wrapper_item_slider_slide}
          style={{
            backgroundImage: `url('/assets/products_img/${id}.png')`,
            backgroundSize: 250,
          }}
        ></SwiperSlide>
        <SwiperSlide
          style={{
            backgroundImage: `url('/assets/products_img/${id}.png')`,
            backgroundSize: 250,
          }}
          className={styles.main_catalog__products_wrapper_item_slider_slide}
        ></SwiperSlide>
        <SwiperSlide
          style={{
            backgroundImage: `url('/assets/products_img/${id}.png')`,
            backgroundSize: 250,
          }}
          className={styles.main_catalog__products_wrapper_item_slider_slide}
        ></SwiperSlide>
      </Swiper>
      <div className={styles.main_catalog__products_wrapper_item_title}>
        {name}
      </div>
      <div className={styles.main_catalog__products_wrapper_item_bottom_block}>
        <span className={styles.main_catalog__products_wrapper_item_price}>
          от {price} руб
        </span>
        <button
          onClick={onClickAdd}
          className={styles.main_catalog__products_wrapper_item_button}
        >
          В корзину
          <span>{addedCount > 0 ? addedCount : null}</span>
        </button>
      </div>
    </div>
  )
}

export default Card
