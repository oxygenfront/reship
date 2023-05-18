import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import {
  addItem,
  minusItem,
  removeItem,
  selectCartItemById,
} from '../redux/slices/cartSlice'
import {
  fetchFullItem,
  selectFullItemData,
} from '../redux/slices/fullItemSlice'
import {
  fetchAuthMe,
  selectIsAuth,
  selectUserData,
} from '../redux/slices/authSlice'
import {
  fetchAddFavorite,
  fetchDeleteFavorite,
} from '../redux/slices/favoriteSlice'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Thumbs, Navigation } from 'swiper'
import 'swiper/css'
import 'swiper/css/bundle'

const FullItem = () => {
  const [openFull, setOpenFull] = useState(false)
  const { id } = useParams()
  const { item, status } = useSelector(selectFullItemData)
  const dispatch = useDispatch()
  const isAuth = useSelector(selectIsAuth)
  const token = localStorage.getItem('token')
  const { data, userStatus = status } = useSelector(selectUserData)
  const [navigate, setNavigate] = useState(false)
  const [thumbsSwiper, setThumbsSwiper] = useState(null)
  const [isFavorite, setIsFavorite] = useState(false)
  const [parametr, setParametr] = useState('')
  const [color, setColor] = useState('')
  const cartItem = useSelector(selectCartItemById(item.id))
  const addedCount = cartItem ? cartItem.count : 0
  const onClickAdd = () => {
    const tovar = {
      id: item.id,
      name: item.name,
      image: item.image,
      price: item.price,
      parametr,
      color,
      count: 0,
    }
    dispatch(addItem(tovar))
  }
  const onClickMinus = () => {
    dispatch(minusItem(item.id))
  }
  const onClickRemove = () => {
    dispatch(removeItem(item.id))
  }

  useEffect(() => {
    if (userStatus === 'success' && isAuth) {
      const ids = data.favorites.map((item) => item.product_id)

      setIsFavorite(ids.includes(Number(id)))
    }
  }, [data])
  const onChangeFavorite = async () => {
    if (!isAuth) {
      console.log('not auth')
      return setNavigate(true)
    }
    if (!isFavorite) {
      const data = await dispatch(
        fetchAddFavorite({ product_id: Number(id), token })
      )
      if (!data.payload) {
        return alert('Не удалось добавить товар в избранные')
      } else {
        dispatch(fetchAuthMe(token))
        return setIsFavorite(true)
      }
    }
    if (isFavorite) {
      const data = await dispatch(
        fetchDeleteFavorite({ product_id: Number(id), token })
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
  useEffect(() => {
    dispatch(fetchFullItem({ id }))
  }, [])
  if (navigate) {
    return <Navigate to="/login"></Navigate>
  }

  const renderStatus = Boolean(status === 'success')
  return (
    <div className="fullitem">
      <div className="fullitem__card-wrapper">
        <div className="fullitem__card-breadcrumb container"></div>
        <div className="fullitem__card container">
          <div className="fullitem__card-sliders">
            <Swiper
              className="fullitem__card-slider_big-wrapper"
              modules={[Thumbs]}
              spaceBetween={60}
              slidesPerView={1}
              speed={1000}
              onSwiper={setThumbsSwiper}
            >
              <SwiperSlide className="fullitem__card-slider_big-item">
                <img src={`../assets/products_img/${id}.png`} alt="" />
              </SwiperSlide>
              <SwiperSlide className="fullitem__card-slider_big-item">
                <img src={`../assets/products_img/${id}.png`} alt="" />
              </SwiperSlide>
              <SwiperSlide className="fullitem__card-slider_big-item">
                <img src={`../assets/products_img/${id}.png`} alt="" />
              </SwiperSlide>
              <SwiperSlide className="fullitem__card-slider_big-item">
                <img src={`../assets/products_img/${id}.png`} alt="" />
              </SwiperSlide>
              <SwiperSlide className="fullitem__card-slider_big-item">
                <img src={`../assets/products_img/${id}.png`} alt="" />
              </SwiperSlide>
              <SwiperSlide className="fullitem__card-slider_big-item">
                <img src={`../assets/products_img/${id}.png`} alt="" />
              </SwiperSlide>
              <SwiperSlide className="fullitem__card-slider_big-item">
                <img src={`../assets/products_img/${id}.png`} alt="" />
              </SwiperSlide>
              <SwiperSlide className="fullitem__card-slider_big-item">
                <img src={`../assets/products_img/${id}.png`} alt="" />
              </SwiperSlide>
            </Swiper>
            <Swiper
              className="fullitem__card-slider_small-wrapper"
              modules={[Navigation, Thumbs]}
              navigation
              loop
              centeredSlides
              slideToClickedSlide
              thumbs={{ swiper: thumbsSwiper }}
              slidesPerView={3}
              spaceBetween={15}
              speed={1000}
            >
              <SwiperSlide className="fullitem__card-slider_small-item">
                <img src={`../assets/products_img/${id}.png`} alt="" />
              </SwiperSlide>
              <SwiperSlide className="fullitem__card-slider_small-item">
                <img src={`../assets/products_img/${id}.png`} alt="" />
              </SwiperSlide>
              <SwiperSlide className="fullitem__card-slider_small-item">
                <img src={`../assets/products_img/${id}.png`} alt="" />
              </SwiperSlide>
              <SwiperSlide className="fullitem__card-slider_small-item">
                <img src={`../assets/products_img/${id}.png`} alt="" />
              </SwiperSlide>
              <SwiperSlide className="fullitem__card-slider_small-item">
                <img src={`../assets/products_img/${id}.png`} alt="" />
              </SwiperSlide>
              <SwiperSlide className="fullitem__card-slider_small-item">
                <img src={`../assets/products_img/${id}.png`} alt="" />
              </SwiperSlide>
              <SwiperSlide className="fullitem__card-slider_small-item">
                <img src={`../assets/products_img/${id}.png`} alt="" />
              </SwiperSlide>
              <SwiperSlide className="fullitem__card-slider_small-item">
                <img src={`../assets/products_img/${id}.png`} alt="" />
              </SwiperSlide>
            </Swiper>
          </div>
          <div className="fullitem__card_info-wrapper">
            <div className="fullitem__card_info-name">{item.name}</div>
            <div className="fullitem__card_info-params">
              <div className="fullitem__card_info-params_block">
                <p>Переключатели</p>
                <div className="fullitem__card_info-params_block-wrapper">
                  <button className="fullitem__card_info-params_block_button">
                    <span>br</span>
                  </button>
                  <button className="fullitem__card_info-params_block_button noItem">
                    <span>r</span>
                  </button>
                </div>
              </div>
              <div className="fullitem__card_info-params_block">
                <p>Раскладка</p>
                <div className="fullitem__card_info-params_block-wrapper">
                  <button className="fullitem__card_info-params_block_text">
                    Русская
                  </button>
                  <button className="fullitem__card_info-params_block_text">
                    Английская
                  </button>
                </div>
              </div>
            </div>
            <div className="fullitem__card_info-bottom">
              <span>{item.price} руб</span>
              {addedCount > 0 ? (
                <div className="fullitem__card_info-bottom_buttons">
                  <Link
                    className="fullitem__card_info-bottom_buttons_cart"
                    to="/cart"
                  >
                    Перейти<br></br> в корзину
                  </Link>

                  <div className={'fullitem__card_info-bottom_buttons_button'}>
                    <div
                      onClick={addedCount > 1 ? onClickMinus : onClickRemove}
                      className={
                        'fullitem__card_info-bottom_buttons_button_minus_wrapper'
                      }
                    >
                      <div
                        className={
                          'fullitem__card_info-bottom_buttons_button_minus'
                        }
                      ></div>
                    </div>
                    {addedCount}
                    <button
                      onClick={onClickAdd}
                      className={
                        'fullitem__card_info-bottom_buttons_button_pluses'
                      }
                    >
                      <div
                        className={
                          'fullitem__card_info-bottom_buttons_button_pluses_block'
                        }
                      >
                        <div
                          className={
                            'fullitem__card_info-bottom_buttons_button_pluses_itemv'
                          }
                        ></div>
                        <div
                          className={
                            'fullitem__card_info-bottom_buttons_button_pluses_itemh'
                          }
                        ></div>
                      </div>
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  className="fullitem__card_info-bottom_btn"
                  to="/cart"
                  onClick={onClickAdd}
                >
                  В корзину
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FullItem
