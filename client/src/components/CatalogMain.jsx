import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Navigation, Pagination, A11y } from 'swiper';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { setChoosenCategorie } from '../redux/slices/fiterSlice';

function CatalogMain() {
  const dispatch = useDispatch();
  const [active, setActive] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const onChangeCategory = useCallback((sort) => {
    dispatch(setChoosenCategorie(sort));
  }, []);

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section className='main-catalog'>
      <div className='container main-catalog__container'>
        <h1 className='main-catalog__title'>
          Каталог <br />
          <span>товаров</span>
        </h1>

        <div className='main-catalog__lg-items'>
          <Link
            className='main-catalog__lg-items-item'
            style={{
              backgroundImage: `url('/assets/img/boards-main-catalog.png')`,
              backgroundColor: '#DBDBDC',
            }}
          >
            <span>Клавиатуры</span>
          </Link>
          <Link
            style={{
              backgroundImage: `url('/assets/img/microphone-main-catalog.png')`,
              backgroundColor: '#DBDBDC',
            }}
            className='main-catalog__lg-items-item'
          >
            <span>Микрофоны</span>
          </Link>
        </div>

        <hr className='hr' />

        <div className='main-catalog__slider-wrapper'>
          <Swiper
            className='main-catalog__slider'
            modules={[Pagination, Navigation, A11y]}
            pagination={{ clickable: true }}
            slidesPerView='auto'
            spaceBetween={60}
            navigation
            speed={1000}
          >
            <SwiperSlide className='main-catalog__slider-slide'>
              <Link
                className='main-catalog__slider-slide_item'
                style={{
                  backgroundImage: `url('/assets/img/mouse-main-catalog.png')`,
                  backgroundColor: '#DBDBDC',
                }}
              >
                <div className='main-catalog__slider-sm_title'>Мышки</div>
              </Link>
            </SwiperSlide>
            <SwiperSlide className='main-catalog__slider-slide'>
              <Link
                className='main-catalog__slider-slide_item'
                style={{
                  backgroundImage: `url('/assets/img/accessory-main-catalog.png')`,
                  backgroundColor: '#DBDBDC',
                }}
              >
                <div className='main-catalog__slider-sm_title'>Аксессуары</div>
              </Link>
            </SwiperSlide>
            <SwiperSlide className='main-catalog__slider-slide'>
              <Link
                className='main-catalog__slider-slide_item'
                style={{
                  backgroundImage: `url('/assets/img/camera-main-catalog.png')`,
                  backgroundColor: '#DBDBDC',
                }}
              >
                <div className='main-catalog__slider-sm_title'>Веб-камеры</div>
              </Link>
            </SwiperSlide>
            <SwiperSlide className='main-catalog__slider-slide'>
              <Link
                className='main-catalog__slider-slide_item'
                style={{
                  backgroundImage: `url('/assets/img/headphones-main-catalog.png')`,
                  backgroundColor: '#DBDBDC',
                }}
              >
                <div className='main-catalog__slider-sm_title'>Наушники</div>
              </Link>
            </SwiperSlide>

            <hr className='hr' />
          </Swiper>
        </div>

        <div className='main-catalog__products-buttons'>
          <button className='main-catalog__products-buttons_item active'>
            Новинки
          </button>
          <button className='main-catalog__products-buttons_item'>
            Популярные
          </button>
          <button className='main-catalog__products-buttons_item'>Акции</button>
        </div>
        <hr className='hr' />

        <div className='main-catalog__products-wrapper'>
          <div className='main-catalog__products-wrapper-item'>
            <div className='main-catalog__products-wrapper-item_category'>
              <span>Хит продаж</span>
            </div>
            <button
              onClick={() => setActive(!active)}
              className='main-catalog__products-wrapper-item_favorite'
            >
              {active ? (
                <img src='/assets/img/active-heart-main-catalog.png'></img>
              ) : (
                <img src='/assets/img/heart-main-catalog.png'></img>
              )}
            </button>
            <Swiper
              className='main-catalog__products-wrapper-item_slider'
              modules={[Pagination]}
              pagination={{ clickable: true }}
              centeredSlides={true}
            >
              <SwiperSlide
                className='main-catalog__products-wrapper-item_slider_slide'
                style={{
                  backgroundImage: `url('/assets/img/pro-x-main-catalog.png')`,
                }}
              ></SwiperSlide>
              <SwiperSlide
                style={{
                  backgroundImage: `url('/assets/img/pro-x-main-catalog.png')`,
                }}
                className='main-catalog__products-wrapper-item_slider_slide'
              ></SwiperSlide>
              <SwiperSlide
                style={{
                  backgroundImage: `url('/assets/img/pro-x-main-catalog.png')`,
                }}
                className='main-catalog__products-wrapper-item_slider_slide'
              ></SwiperSlide>
            </Swiper>
            <div className='main-catalog__products-wrapper-item_title'>
              Title
            </div>
            <div className='main-catalog__products-wrapper-item_bottom-block'>
              <span className='main-catalog__products-wrapper-item_price'>
                от 1111 руб
              </span>
              <button className='main-catalog__products-wrapper-item_button'>
                В корзину
              </button>
            </div>
          </div>
          <div className='main-catalog__products-wrapper-item'>
            <div className='main-catalog__products-wrapper-item_category'>
              <span>Хит продаж</span>
            </div>
            <button
              onClick={() => setActive(!active)}
              className='main-catalog__products-wrapper-item_favorite'
            >
              {active ? (
                <img src='/assets/img/active-heart-main-catalog.png'></img>
              ) : (
                <img src='/assets/img/heart-main-catalog.png'></img>
              )}
            </button>
            <Swiper
              className='main-catalog__products-wrapper-item_slider'
              modules={[Pagination]}
              pagination={{ clickable: true }}
              centeredSlides={true}
            >
              <SwiperSlide
                className='main-catalog__products-wrapper-item_slider_slide'
                style={{
                  backgroundImage: `url('/assets/img/pro-x-main-catalog.png')`,
                }}
              ></SwiperSlide>
              <SwiperSlide
                style={{
                  backgroundImage: `url('/assets/img/pro-x-main-catalog.png')`,
                }}
                className='main-catalog__products-wrapper-item_slider_slide'
              ></SwiperSlide>
              <SwiperSlide
                style={{
                  backgroundImage: `url('/assets/img/pro-x-main-catalog.png')`,
                }}
                className='main-catalog__products-wrapper-item_slider_slide'
              ></SwiperSlide>
            </Swiper>
            <div className='main-catalog__products-wrapper-item_title'>
              Title
            </div>
            <div className='main-catalog__products-wrapper-item_bottom-block'>
              <span className='main-catalog__products-wrapper-item_price'>
                от 1111 руб
              </span>
              <button className='main-catalog__products-wrapper-item_button'>
                В корзину
              </button>
            </div>
          </div>
          <div className='main-catalog__products-wrapper-item'>
            <div className='main-catalog__products-wrapper-item_category'>
              <span>Хит продаж</span>
            </div>
            <button
              onClick={() => setActive(!active)}
              className='main-catalog__products-wrapper-item_favorite'
            >
              {active ? (
                <img src='/assets/img/active-heart-main-catalog.png'></img>
              ) : (
                <img src='/assets/img/heart-main-catalog.png'></img>
              )}
            </button>
            <Swiper
              className='main-catalog__products-wrapper-item_slider'
              modules={[Pagination]}
              pagination={{ clickable: true }}
              centeredSlides={true}
            >
              <SwiperSlide
                className='main-catalog__products-wrapper-item_slider_slide'
                style={{
                  backgroundImage: `url('/assets/img/pro-x-main-catalog.png')`,
                }}
              ></SwiperSlide>
              <SwiperSlide
                style={{
                  backgroundImage: `url('/assets/img/pro-x-main-catalog.png')`,
                }}
                className='main-catalog__products-wrapper-item_slider_slide'
              ></SwiperSlide>
              <SwiperSlide
                style={{
                  backgroundImage: `url('/assets/img/pro-x-main-catalog.png')`,
                }}
                className='main-catalog__products-wrapper-item_slider_slide'
              ></SwiperSlide>
            </Swiper>
            <div className='main-catalog__products-wrapper-item_title'>
              Title
            </div>
            <div className='main-catalog__products-wrapper-item_bottom-block'>
              <span className='main-catalog__products-wrapper-item_price'>
                от 1111 руб
              </span>
              <button className='main-catalog__products-wrapper-item_button'>
                В корзину
              </button>
            </div>
          </div>
          <div className='main-catalog__products-wrapper-item'>
            <div className='main-catalog__products-wrapper-item_category'>
              <span>Хит продаж</span>
            </div>
            <button
              onClick={() => setActive(!active)}
              className='main-catalog__products-wrapper-item_favorite'
            >
              {active ? (
                <img src='/assets/img/active-heart-main-catalog.png'></img>
              ) : (
                <img src='/assets/img/heart-main-catalog.png'></img>
              )}
            </button>
            <Swiper
              className='main-catalog__products-wrapper-item_slider'
              modules={[Pagination]}
              pagination={{ clickable: true }}
              centeredSlides={true}
            >
              <SwiperSlide
                className='main-catalog__products-wrapper-item_slider_slide'
                style={{
                  backgroundImage: `url('/assets/img/pro-x-main-catalog.png')`,
                }}
              ></SwiperSlide>
              <SwiperSlide
                style={{
                  backgroundImage: `url('/assets/img/pro-x-main-catalog.png')`,
                }}
                className='main-catalog__products-wrapper-item_slider_slide'
              ></SwiperSlide>
              <SwiperSlide
                style={{
                  backgroundImage: `url('/assets/img/pro-x-main-catalog.png')`,
                }}
                className='main-catalog__products-wrapper-item_slider_slide'
              ></SwiperSlide>
            </Swiper>
            <div className='main-catalog__products-wrapper-item_title'>
              Title
            </div>
            <div className='main-catalog__products-wrapper-item_bottom-block'>
              <span className='main-catalog__products-wrapper-item_price'>
                от 1111 руб
              </span>
              <button className='main-catalog__products-wrapper-item_button'>
                В корзину
              </button>
            </div>
          </div>
          <div className='main-catalog__products-wrapper-item'>
            <div className='main-catalog__products-wrapper-item_category'>
              <span>Хит продаж</span>
            </div>
            <button
              onClick={() => setActive(!active)}
              className='main-catalog__products-wrapper-item_favorite'
            >
              {active ? (
                <img src='/assets/img/active-heart-main-catalog.png'></img>
              ) : (
                <img src='/assets/img/heart-main-catalog.png'></img>
              )}
            </button>
            <Swiper
              className='main-catalog__products-wrapper-item_slider'
              modules={[Pagination]}
              pagination={{ clickable: true }}
              centeredSlides={true}
            >
              <SwiperSlide
                className='main-catalog__products-wrapper-item_slider_slide'
                style={{
                  backgroundImage: `url('/assets/img/pro-x-main-catalog.png')`,
                }}
              ></SwiperSlide>
              <SwiperSlide
                style={{
                  backgroundImage: `url('/assets/img/pro-x-main-catalog.png')`,
                }}
                className='main-catalog__products-wrapper-item_slider_slide'
              ></SwiperSlide>
              <SwiperSlide
                style={{
                  backgroundImage: `url('/assets/img/pro-x-main-catalog.png')`,
                }}
                className='main-catalog__products-wrapper-item_slider_slide'
              ></SwiperSlide>
            </Swiper>
            <div className='main-catalog__products-wrapper-item_title'>
              Title
            </div>
            <div className='main-catalog__products-wrapper-item_bottom-block'>
              <span className='main-catalog__products-wrapper-item_price'>
                от 1111 руб
              </span>
              <button className='main-catalog__products-wrapper-item_button'>
                В корзину
              </button>
            </div>
          </div>
          <div className='main-catalog__products-wrapper-item'>
            <div className='main-catalog__products-wrapper-item_category'>
              <span>Хит продаж</span>
            </div>
            <button
              onClick={() => setActive(!active)}
              className='main-catalog__products-wrapper-item_favorite'
            >
              {active ? (
                <img src='/assets/img/active-heart-main-catalog.png'></img>
              ) : (
                <img src='/assets/img/heart-main-catalog.png'></img>
              )}
            </button>
            <Swiper
              className='main-catalog__products-wrapper-item_slider'
              modules={[Pagination]}
              pagination={{ clickable: true }}
              centeredSlides={true}
            >
              <SwiperSlide
                className='main-catalog__products-wrapper-item_slider_slide'
                style={{
                  backgroundImage: `url('/assets/img/pro-x-main-catalog.png')`,
                }}
              ></SwiperSlide>
              <SwiperSlide
                style={{
                  backgroundImage: `url('/assets/img/pro-x-main-catalog.png')`,
                }}
                className='main-catalog__products-wrapper-item_slider_slide'
              ></SwiperSlide>
              <SwiperSlide
                style={{
                  backgroundImage: `url('/assets/img/pro-x-main-catalog.png')`,
                }}
                className='main-catalog__products-wrapper-item_slider_slide'
              ></SwiperSlide>
            </Swiper>
            <div className='main-catalog__products-wrapper-item_title'>
              Title
            </div>
            <div className='main-catalog__products-wrapper-item_bottom-block'>
              <span className='main-catalog__products-wrapper-item_price'>
                от 1111 руб
              </span>
              <button className='main-catalog__products-wrapper-item_button'>
                В корзину
              </button>
            </div>
          </div>
          
        </div>

        <div className='main-catalog__main-category'>
          <button>Все новинки</button>
        </div>

        <hr className='hr' />

        {/* {windowWidth > 991 ? (
          <div className="main-catalog__preview">
            <Link
              to="/catalog"
              onClick={() => onChangeCategory('мышки')}
              value={'мышки'}
              className="main-catalog__preview-lg"
            >
              <div className="main-catalog__preview-lg_title">
                <span>Мышки</span>
              </div>
              <img
                className="main-catalog__preview-lg_img"
                src="./assets/img/apple1.png"
                alt="apple"
              />
            </Link>
            <div className="main-catalog__preview-sm">
              <Link
                onClick={() => onChangeCategory('микрофоны')}
                to="/catalog"
                className="main-catalog__preview-sm-item"
              >
                <img
                  src="./assets/img/free-icon-microphone-7548497 1.svg"
                  alt="microphone"
                />
                <span>Микрофоны</span>
              </Link>
              <Link
                onClick={() => onChangeCategory('мышки')}
                to="/catalog"
                className="main-catalog__preview-sm-item"
              >
                <img
                  src="./assets/img/free-icon-mouse-7545452 1.svg"
                  alt="mouse"
                />
                <span>Мышки</span>
              </Link>
            </div>
            <div className="main-catalog__preview-sm">
              <Link
                onClick={() => onChangeCategory('наушники')}
                to="/catalog"
                className="main-catalog__preview-sm-item"
              >
                <img
                  src="./assets/img/free-icon-headphone-1785480 1.svg"
                  alt="headphones"
                />
                <span>Наушники</span>
              </Link>
              <Link
                onClick={() => onChangeCategory('access')}
                to="/catalog"
                className="main-catalog__preview-sm-item"
              >
                <img src="./assets/img/smartwatch 1.svg" alt="smartwatch" />
                <span>Аксессуары</span>
              </Link>
            </div>
            <Link
              onClick={() => onChangeCategory('клавиатуры')}
              to="/catalog"
              className="main-catalog__preview-lg"
            >
              <div className="main-catalog__preview-lg_title">
                <span>Клавиатуры</span>
              </div>
              <img
                className="main-catalog__preview-lg_img"
                src="./assets/img/board1.png"
                alt="board"
              />
            </Link>
          </div>
        ) : null}
        {windowWidth > 575 && windowWidth <= 991 ? (
          <div className="main-catalog__preview">
            <div className="main-catalog__preview_lg-wrapper">
              <Link
                to="/catalog"
                onClick={() => onChangeCategory('apple')}
                value={'apple'}
                className="main-catalog__preview-lg"
              >
                <div className="main-catalog__preview-lg_title">
                  <span>Apple</span>
                </div>
                <img
                  className="main-catalog__preview-lg_img"
                  src="./assets/img/apple1.png"
                  alt="apple"
                />
              </Link>
              <Link
                onClick={() => onChangeCategory('клавиатуры')}
                to="/catalog"
                className="main-catalog__preview-lg"
              >
                <div className="main-catalog__preview-lg_title">
                  <span>Клавиатуры</span>
                </div>
                <img
                  className="main-catalog__preview-lg_img"
                  src="./assets/img/board1.png"
                  alt="board"
                />
              </Link>
            </div>
            <div className="main-catalog__preview-sm">
              <Link
                onClick={() => onChangeCategory('микрофоны')}
                to="/catalog"
                className="main-catalog__preview-sm-item"
              >
                <img
                  src="./assets/img/free-icon-microphone-7548497 1.svg"
                  alt="microphone"
                />
                <span>Микрофоны</span>
              </Link>
              <Link
                onClick={() => onChangeCategory('мышки')}
                to="/catalog"
                className="main-catalog__preview-sm-item"
              >
                <img
                  src="./assets/img/free-icon-mouse-7545452 1.svg"
                  alt="mouse"
                />
                <span>Мышки</span>
              </Link>
              <Link
                onClick={() => onChangeCategory('наушники')}
                to="/catalog"
                className="main-catalog__preview-sm-item"
              >
                <img
                  src="./assets/img/free-icon-headphone-1785480 1.svg"
                  alt="headphones"
                />
                <span>Наушники</span>
              </Link>
              <Link
                onClick={() => onChangeCategory('access')}
                to="/catalog"
                className="main-catalog__preview-sm-item"
              >
                <img src="./assets/img/smartwatch 1.svg" alt="smartwatch" />
                <span>Аксессуары</span>
              </Link>
            </div>
          </div>
        ) : null}
        {windowWidth <= 575 ? (
          <div className="main-catalog__preview">
            <Link
              to="/catalog"
              onClick={() => onChangeCategory('apple')}
              value={'apple'}
              className="main-catalog__preview-lg"
            >
              <div className="main-catalog__preview-lg_title">
                <span>Apple</span>
              </div>
              <img
                className="main-catalog__preview-lg_img"
                src="./assets/img/apple1.png"
                alt="apple"
              />
            </Link>
            <Link
              onClick={() => onChangeCategory('клавиатуры')}
              to="/catalog"
              className="main-catalog__preview-lg"
            >
              <div className="main-catalog__preview-lg_title">
                <span>Клавиатуры</span>
              </div>
              <img
                className="main-catalog__preview-lg_img"
                src="./assets/img/board1.png"
                alt="board"
              />
            </Link>
            <div className="main-catalog__preview-sm">
              <Link
                onClick={() => onChangeCategory('микрофоны')}
                to="/catalog"
                className="main-catalog__preview-sm-item"
              >
                <img
                  src="./assets/img/free-icon-microphone-7548497 1.svg"
                  alt="microphone"
                />
                <span>Микрофоны</span>
              </Link>
              <Link
                onClick={() => onChangeCategory('мышки')}
                to="/catalog"
                className="main-catalog__preview-sm-item"
              >
                <img
                  src="./assets/img/free-icon-mouse-7545452 1.svg"
                  alt="mouse"
                />
                <span>Мышки</span>
              </Link>
            </div>
            <div className="main-catalog__preview-sm">
              <Link
                onClick={() => onChangeCategory('наушники')}
                to="/catalog"
                className="main-catalog__preview-sm-item"
              >
                <img
                  src="./assets/img/free-icon-headphone-1785480 1.svg"
                  alt="headphones"
                />
                <span>Наушники</span>
              </Link>
              <Link
                onClick={() => onChangeCategory('акссесуары')}
                to="/catalog"
                className="main-catalog__preview-sm-item"
              >
                <img src="./assets/img/smartwatch 1.svg" alt="smartwatch" />
                <span>Аксессуары</span>
              </Link>
            </div>
          </div>
        ) : null} */}
      </div>
    </section>
  );
}

export default CatalogMain;
