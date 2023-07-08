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
import { selectIsAuth, selectUserData } from '../../redux/slices/authSlice'
import {
  addFavorite,
  removeFavorite,
  selectFavorites,
} from '../../redux/slices/favoriteSlice'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper'

const Card = ({ name, image, price, id, old_price, view, description }) => {
  const dispatch = useDispatch()
  const cartItem = useSelector(selectCartItemById(id))
  const isAuth = useSelector(selectIsAuth)
  const { favorites } = useSelector(selectFavorites)
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
    const ids = favorites.map((item) => item.id)

    setIsFavorite(ids.includes(Number(id)))
  }, [])

  const onChangeFavorite = () => {
    // if (!isAuth) {
    //   console.log('not auth')
    //   return setNavigate(true)
    // }
    if (!isFavorite) {
      dispatch(
        addFavorite({
          id,
          name,
          image,
          price,
          color,
        })
      )

      return setIsFavorite(true)
    }
    if (isFavorite) {
      dispatch(removeFavorite(id))

      return setIsFavorite(false)
    }
  }
  if (navigate) {
    return <Navigate to="/login"></Navigate>
  }
  return (
    <>
      {view === 'grid' ? (
        <div className={styles.main_catalog__products_wrapper_item}>
          {/* <div className={styles.main_catalog__products_wrapper_item_category}>
            <span>Хит продаж</span>
          </div> */}
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
          <Link to={`/item/${id}`}>
            {' '}
            <Swiper
              className={styles.main_catalog__products_wrapper_item_slider}
              modules={[Pagination]}
              pagination={{ clickable: true }}
              centeredSlides={true}
            >
              {JSON.parse(image).map((image, index) => (
                <SwiperSlide
                  key={index}
                  className={
                    styles.main_catalog__products_wrapper_item_slider_slide
                  }
                  style={{
                    backgroundImage: `url('${image}')`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                  }}
                ></SwiperSlide>
              ))}
            </Swiper>
          </Link>

          <Link
            to={`/item/${id}`}
            className={styles.main_catalog__products_wrapper_item_title}
          >
            {name}
          </Link>
          <div
            className={styles.main_catalog__products_wrapper_item_bottom_block}
          >
            <span className={styles.main_catalog__products_wrapper_item_price}>
              от {price} руб
            </span>
            {addedCount > 0 ? (
              <div
                className={styles.main_catalog__products_wrapper_item_button}
              >
                <button
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
                </button>
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
              </div>
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
            <img src={JSON.parse(image)[0]} alt="" />
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

export default React.memo(Card)
