import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Navigation, Pagination, A11y } from 'swiper'
import 'swiper/css'
import { Swiper, SwiperSlide } from 'swiper/react'
import {
  selectFilter,
  setChoosenCategorie,
  setChoosenType,
} from '../redux/slices/fiterSlice'
import {
  fetchHomeItems,
  fetchItems,
  selectItemsData,
} from '../redux/slices/itemsSlice'
import Card from './Card/Card'

function CatalogMain() {
  const dispatch = useDispatch()
  const [active, setActive] = useState(false)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const { items, status, homeItems, homeStatus } = useSelector(selectItemsData)

  const onChangeCategory = useCallback((sort) => {
    dispatch(setChoosenCategorie(sort))
  }, [])

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])
  const { choosenType } = useSelector(selectFilter)

  useEffect(() => {
    dispatch(
      fetchHomeItems({
        choosenType,
      })
    )
  }, [choosenType])

  return (
    <section className="main-catalog">
      <div className="container main-catalog__container">
        <h1 className="main-catalog__title">
          Каталог {windowWidth > 767 || windowWidth <= 575 ? <br /> : null}
          <span>товаров</span>
        </h1>

        <div className="main-catalog__lg-items">
          <div className="main-catalog__lg-items_wrapper">
            <Link
              to="/catalog"
              onClick={() => onChangeCategory('Клавиатуры')}
              className="main-catalog__lg-items-item"
              style={{
                backgroundImage: `url('/assets/img/boards-main-catalog.png')`,

                backgroundRepeat: 'no-repeat',
              }}
            >
              <span>Клавиатуры</span>
            </Link>
          </div>
          <div className="main-catalog__lg-items_wrapper">
            <Link
              onClick={() => onChangeCategory('Микрофоны')}
              to="/catalog"
              style={{
                backgroundImage: `url('/assets/img/microphone-main-catalog.png')`,

                backgroundRepeat: 'no-repeat',
              }}
              className="main-catalog__lg-items-item"
            >
              <span>Микрофоны</span>
            </Link>
          </div>
        </div>

        <hr className="hr" />

        <div className="main-catalog__slider-wrapper">
          <Swiper
            className="main-catalog__slider"
            modules={[Pagination, Navigation, A11y]}
            pagination={{ clickable: true }}
            slidesPerView={
              windowWidth > 1199
                ? 'auto'
                : windowWidth <= 1199 && windowWidth > 991
                ? 3
                : windowWidth <= 991 && windowWidth > 767
                ? 2
                : 1
            }
            spaceBetween={
              windowWidth > 1199
                ? 80
                : windowWidth <= 1199 && windowWidth > 991
                ? 40
                : windowWidth <= 991 && windowWidth > 767
                ? 30
                : 52
            }
            navigation
            speed={700}
          >
            <SwiperSlide className="main-catalog__slider-slide">
              <div className="main-catalog__slider-wrapper">
                <Link
                  onClick={() => onChangeCategory('Мышки')}
                  to="/catalog"
                  className="main-catalog__slider-slide_item"
                  style={{
                    backgroundImage: `url('/assets/img/mouse-main-catalog.png')`,
                    backgroundPosition: 'center',
                    // backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                  }}
                >
                  <div className="main-catalog__slider-sm_title">Мышки</div>
                </Link>
              </div>
            </SwiperSlide>
            <SwiperSlide className="main-catalog__slider-slide">
              <div className="main-catalog__slider-wrapper">
                <Link
                  onClick={() => onChangeCategory('Аксессуары')}
                  to="/catalog"
                  className="main-catalog__slider-slide_item"
                  style={{
                    backgroundImage: `url('/assets/img/accessory-main-catalog.png')`,

                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                  }}
                >
                  <div className="main-catalog__slider-sm_title">
                    Аксессуары
                  </div>
                </Link>
              </div>
            </SwiperSlide>
            <SwiperSlide className="main-catalog__slider-slide">
              <div className="main-catalog__slider-wrapper">
                <Link
                  onClick={() => onChangeCategory('Веб-камеры')}
                  to="/catalog"
                  className="main-catalog__slider-slide_item"
                  style={{
                    backgroundImage: `url('/assets/img/camera-main-catalog.png')`,

                    backgroundPosition: 'center',
                    // backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                  }}
                >
                  <div className="main-catalog__slider-sm_title">
                    Веб-камеры
                  </div>
                </Link>
              </div>
            </SwiperSlide>
            <SwiperSlide className="main-catalog__slider-slide">
              <div className="main-catalog__slider-wrapper">
                <Link
                  onClick={() => onChangeCategory('Наушники')}
                  to="/catalog"
                  className="main-catalog__slider-slide_item"
                  style={{
                    backgroundImage: `url('/assets/img/headphones-main-catalog.png')`,

                    backgroundPosition: 'right',
                    // backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                  }}
                >
                  <div className="main-catalog__slider-sm_title">Наушники</div>
                </Link>
              </div>
            </SwiperSlide>

            <hr className="hr" />
          </Swiper>
        </div>

        <div className="main-catalog__products-buttons">
          <button
            onClick={() => dispatch(setChoosenType('новинки'))}
            className={
              choosenType === 'новинки'
                ? 'main-catalog__products-buttons_item active'
                : 'main-catalog__products-buttons_item'
            }
          >
            Новинки
          </button>
          <button
            onClick={() => dispatch(setChoosenType('популярное'))}
            className={
              choosenType === 'популярное'
                ? 'main-catalog__products-buttons_item active'
                : 'main-catalog__products-buttons_item'
            }
          >
            Популярные
          </button>
          <button
            onClick={() => dispatch(setChoosenType('акции'))}
            className={
              choosenType === 'акции'
                ? 'main-catalog__products-buttons_item active'
                : 'main-catalog__products-buttons_item'
            }
          >
            Акции
          </button>
        </div>
        <hr className="hr" />

        <div className="main-catalog__products-wrapper">
          {homeStatus === 'success' &&
            homeItems
              .slice(0, 6)
              .map((item) => (
                <Card
                  category={item.category}
                  weight={item.weight}
                  image={item.image_link}
                  view={'grid'}
                  id={item.id}
                  price={item.price}
                  key={item.id}
                  name={item.name}
                ></Card>
              ))}
        </div>

        <Link to="/catalog" className="main-catalog__main-category">
          <button>Все {choosenType}</button>
        </Link>

        <hr className="hr" />
      </div>
    </section>
  )
}

export default React.memo(CatalogMain)
