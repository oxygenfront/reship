import React, { useEffect, useState } from 'react'
import { CatalogMain, Comment, Footer, Menu, Slider } from '../components'
import Accordeon from '../components/Accordeon'
import { SwiperSlide, Swiper } from 'swiper/react'
import { Navigation } from 'swiper'
const Home = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])
  return (
    <>
      <Slider />

      <CatalogMain />

      <section className="delpay" id="delpay">
        <div className="container delpay__container">
          <div className="delpay__title">
            Доставка <br /> и <span>оплата</span>
          </div>
          <p className="delpay__suptitle">
            Расскажем вам поэтапно как оформить заказ!
          </p>

          <div className="delpay__slider-wrapper">
            <Swiper
              className="delpay__slider"
              modules={[Navigation]}
              spaceBetween={
                windowWidth > 1199
                  ? 60
                  : windowWidth <= 1199 && windowWidth > 991
                  ? 40
                  : windowWidth <= 991 && windowWidth > 767
                  ? 40
                  : 50
              }
              // centeredSlides={true}
              slidesPerView={windowWidth <= 991 ? 1 : 'auto'}
              speed={1000}
              navigation
            >
              <SwiperSlide className="delpay__slider_item">
                <span className="delpay__slider_item_step">Шаг 1</span>
                <p className="delpay__slider_item_description">
                  Зарегистрируйте аккаунт<br></br>в нашем интернет-магазине
                </p>
              </SwiperSlide>
              <SwiperSlide className="delpay__slider_item">
                <span className="delpay__slider_item_step">Шаг 2</span>
                <p className="delpay__slider_item_description">
                  Добавьте интересующий вас<br></br> товар в корзину
                </p>
              </SwiperSlide>
              <SwiperSlide className="delpay__slider_item">
                <span className="delpay__slider_item_step">Шаг 3</span>
                <p className="delpay__slider_item_description">
                  Перейдите в нее для дальнейшего оформления
                </p>
              </SwiperSlide>
              <SwiperSlide className="delpay__slider_item">
                <span className="delpay__slider_item_step">Шаг 4</span>
                <p className="delpay__slider_item_description">
                  Заполните требуемые поля <br></br>и произведите оплату с
                  <br></br> помощью удобного способа
                </p>
              </SwiperSlide>
              <SwiperSlide className="delpay__slider_item">
                <span className="delpay__slider_item_step">Шаг 5</span>
                <p className="delpay__slider_item_description">
                  Заказ оформлен! Отследить его<br></br> вы сможете в личном
                  кабинете<br></br>
                  ReShipа
                </p>
              </SwiperSlide>
              <SwiperSlide className="delpay__slider_item">
                <span className="delpay__slider_item_step">Шаг 6</span>
                <p className="delpay__slider_item_description">
                  Заказ оформлен! Отследить его<br></br> вы сможете в личном
                  кабинете<br></br>
                  ReShipа
                </p>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </section>

      <Accordeon />

      <section className="reviews">
        <div className="container reviews__container">
          <div className="reviews__title">
            Что о нас <span>говорят?</span>
          </div>

          <div className="reviews__slider-wrapper">
            <Swiper
              className="reviews__slider"
              modules={[Navigation]}
              navigation
              speed={1300}
              spaceBetween={70}
            >
              <SwiperSlide className="reviews__slider-slide">
                {windowWidth > 991 ? (
                  <>
                    <div className="reviews__slider-slide_two-items">
                      <Comment
                        text={'Тестовый комментарий'}
                        first_name={'test'}
                        last_name={'test'}
                        rating={5}
                      ></Comment>
                      <Comment
                        text={'Тестовый комментарий'}
                        first_name={'test'}
                        last_name={'test'}
                        rating={5}
                      ></Comment>
                    </div>
                    <div className="reviews__slider-slide_one-item">
                      <Comment
                        text={'Тестовый комментарий'}
                        first_name={'test'}
                        last_name={'test'}
                        rating={5}
                      ></Comment>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="reviews__slider-slide_two-items">
                      <Comment
                        text={'Тестовый комментарий'}
                        first_name={'test'}
                        last_name={'test'}
                        rating={5}
                      ></Comment>
                      <Comment
                        text={'Тестовый комментарий'}
                        first_name={'test'}
                        last_name={'test'}
                        rating={5}
                      ></Comment>
                      <Comment
                        text={'Тестовый комментарий'}
                        first_name={'test'}
                        last_name={'test'}
                        rating={5}
                      ></Comment>
                    </div>
                  </>
                )}
              </SwiperSlide>
              <SwiperSlide className="reviews__slider-slide">
                {windowWidth > 991 ? (
                  <>
                    <div className="reviews__slider-slide_two-items">
                      <Comment
                        text={'Тестовый комментарий'}
                        first_name={'test'}
                        last_name={'test'}
                        rating={5}
                      ></Comment>
                      <Comment
                        text={'Тестовый комментарий'}
                        first_name={'test'}
                        last_name={'test'}
                        rating={5}
                      ></Comment>
                    </div>
                    <div className="reviews__slider-slide_one-item">
                      <Comment
                        text={'Тестовый комментарий'}
                        first_name={'test'}
                        last_name={'test'}
                        rating={5}
                      ></Comment>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="reviews__slider-slide_two-items">
                      <Comment
                        text={'Тестовый комментарий'}
                        first_name={'test'}
                        last_name={'test'}
                        rating={5}
                      ></Comment>
                      <Comment
                        text={'Тестовый комментарий'}
                        first_name={'test'}
                        last_name={'test'}
                        rating={5}
                      ></Comment>
                      <Comment
                        text={'Тестовый комментарий'}
                        first_name={'test'}
                        last_name={'test'}
                        rating={5}
                      ></Comment>
                    </div>
                  </>
                )}
              </SwiperSlide>
              <SwiperSlide className="reviews__slider-slide">
                {windowWidth > 991 ? (
                  <>
                    <div className="reviews__slider-slide_two-items">
                      <Comment
                        text={'Тестовый комментарий'}
                        first_name={'test'}
                        last_name={'test'}
                        rating={5}
                      ></Comment>
                      <Comment
                        text={'Тестовый комментарий'}
                        first_name={'test'}
                        last_name={'test'}
                        rating={5}
                      ></Comment>
                    </div>
                    <div className="reviews__slider-slide_one-item">
                      <Comment
                        text={'Тестовый комментарий'}
                        first_name={'test'}
                        last_name={'test'}
                        rating={5}
                      ></Comment>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="reviews__slider-slide_two-items">
                      <Comment
                        text={'Тестовый комментарий'}
                        first_name={'test'}
                        last_name={'test'}
                        rating={5}
                      ></Comment>
                      <Comment
                        text={'Тестовый комментарий'}
                        first_name={'test'}
                        last_name={'test'}
                        rating={5}
                      ></Comment>
                      <Comment
                        text={'Тестовый комментарий'}
                        first_name={'test'}
                        last_name={'test'}
                        rating={5}
                      ></Comment>
                    </div>
                  </>
                )}
              </SwiperSlide>
              <SwiperSlide className="reviews__slider-slide">
                {windowWidth > 991 ? (
                  <>
                    <div className="reviews__slider-slide_two-items">
                      <Comment
                        text={'Тестовый комментарий'}
                        first_name={'test'}
                        last_name={'test'}
                        rating={5}
                      ></Comment>
                      <Comment
                        text={'Тестовый комментарий'}
                        first_name={'test'}
                        last_name={'test'}
                        rating={5}
                      ></Comment>
                    </div>
                    <div className="reviews__slider-slide_one-item">
                      <Comment
                        text={'Тестовый комментарий'}
                        first_name={'test'}
                        last_name={'test'}
                        rating={5}
                      ></Comment>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="reviews__slider-slide_two-items">
                      <Comment
                        text={'Тестовый комментарий'}
                        first_name={'test'}
                        last_name={'test'}
                        rating={5}
                      ></Comment>
                      <Comment
                        text={'Тестовый комментарий'}
                        first_name={'test'}
                        last_name={'test'}
                        rating={5}
                      ></Comment>
                      <Comment
                        text={'Тестовый комментарий'}
                        first_name={'test'}
                        last_name={'test'}
                        rating={5}
                      ></Comment>
                    </div>
                  </>
                )}
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </section>

      {/* <div className='review__banner'>
        <div className='container review__banner__container'>
          <div className='review__banner-title'>
            Ознакомьтесь с отзывами в наших {windowWidth > 991 ? <br /> : null}{' '}
            в социальных сетях
          </div>
          <div className='review__banner-buttons'>
            <a href='/' className='review__banner-buttons_link'>
              Перейти к отзывам
            </a>
            <div href='' className='review__banner-buttons_item'>
              2000+ реальных отзывов
            </div>
          </div>

          <div className='review__banner-decoration s'></div>
          <a href='' className='review__banner-decoration m'>
            <img src='/assets/img/tg-decor.png' alt='' />
          </a>
          <a href='' className='review__banner-decoration l'>
            <img src='/assets/img/vk-decor.png' alt='' />
          </a>
          <a href='' className='review__banner-decoration xl'>
            <img src='/assets/img/discord-decor.png' alt='' />
          </a>
        </div>
      </div> */}
    </>
  )
}

export default Home
