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
              spaceBetween={60}
              // centeredSlides={true}
              slidesPerView="auto"
              speed={1000}
              navigation
            >
              <SwiperSlide className="delpay__slider_item">
                <span className="delpay__slider_item_step">Шаг1</span>
                <p className="delpay__slider_item_description">
                  Зарегистрируйте аккаунт<br></br>в нашем интернет-магазине
                </p>
              </SwiperSlide>
              <SwiperSlide className="delpay__slider_item">
                <span className="delpay__slider_item_step">Шаг2</span>
                <p className="delpay__slider_item_description">
                  Добавьте интересующий вас<br></br> товар в корзину
                </p>
              </SwiperSlide>
              <SwiperSlide className="delpay__slider_item">
                <span className="delpay__slider_item_step">Шаг3</span>
                <p className="delpay__slider_item_description">
                  Перейдите в нее для дальнейшего оформления
                </p>
              </SwiperSlide>
              <SwiperSlide className="delpay__slider_item">
                <span className="delpay__slider_item_step">Шаг4</span>
                <p className="delpay__slider_item_description">
                  Заполните требуемые поля <br></br>и произведите оплату с
                  <br></br> помощью удобного способа
                </p>
              </SwiperSlide>
              <SwiperSlide className="delpay__slider_item">
                <span className="delpay__slider_item_step">Шаг5</span>
                <p className="delpay__slider_item_description">
                  Заказ оформлен! Отследить его<br></br> вы сможете в личном
                  кабинете<br></br>
                  ReShipа
                </p>
              </SwiperSlide>
              <SwiperSlide className="delpay__slider_item">
                <span className="delpay__slider_item_step">Шаг6</span>
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

          <Swiper
            className="reviews__slider"
            modules={[Navigation]}
            navigation
            speed={1300}
            spaceBetween={70}
          >
            <SwiperSlide className="reviews__slider-slide">
              <div className="reviews__slider-slide_two-items">
                <Comment></Comment>
                <Comment></Comment>
              </div>
              <div className="reviews__slider-slide_one-item">
                <Comment></Comment>
              </div>
            </SwiperSlide>

            <SwiperSlide className="reviews__slider-slide">
              <div className="reviews__slider-slide_two-items">
                <Comment></Comment>
                <Comment></Comment>
              </div>
              <div className="reviews__slider-slide_one-item">
                <Comment></Comment>
              </div>
            </SwiperSlide>

            <SwiperSlide className="reviews__slider-slide">
              <div className="reviews__slider-slide_two-items">
                <Comment></Comment>
                <Comment></Comment>
              </div>
              <div className="reviews__slider-slide_one-item">
                <Comment></Comment>
              </div>
            </SwiperSlide>

            <SwiperSlide className="reviews__slider-slide">
              <div className="reviews__slider-slide_two-items">
                <Comment></Comment>
                <Comment></Comment>
              </div>
              <div className="reviews__slider-slide_one-item">
                <Comment></Comment>
              </div>
            </SwiperSlide>

            <SwiperSlide className="reviews__slider-slide">
              <div className="reviews__slider-slide_two-items">
                <Comment></Comment>
                <Comment></Comment>
              </div>
              <div className="reviews__slider-slide_one-item">
                <Comment></Comment>
              </div>
            </SwiperSlide>

            <SwiperSlide className="reviews__slider-slide">
              <div className="reviews__slider-slide_two-items">
                <div className="reviews__slider-slide_item">
                  <div className="reviews__slider-slide_item_header">
                    <div className="reviews__slider-slide_item_header-left">
                      <div className="reviews__slider-slide_item_header-left_img-block">
                        <img src="" alt="" />
                      </div>
                      <div className="reviews__slider-slide_item_header-left_title-block">
                        <div className="reviews__slider-slide_item_header-left_title-block_name">
                          Максим Грязев
                        </div>
                        <a href="">Отзыв из Вконтакте</a>
                      </div>
                    </div>
                    <div className="reviews__slider-slide_item_header-stars">
                      <img src="/assets/img/star-review.png" alt="" />
                      <img src="/assets/img/star-review.png" alt="" />
                      <img src="/assets/img/star-review.png" alt="" />
                      <img src="/assets/img/star-review.png" alt="" />
                      <img src="/assets/img/star-review.png" alt="" />
                    </div>
                  </div>
                  <div className="reviews__slider-slide_item_description">
                    Заказывал мышку, шла до МСК 7 дней. Все супер гуд,
                    советую.Отдельный респект филу за то, что отправил мышку на
                    следующий день в 7 утра, хотя заказ оформил в 23 00 по мск.
                  </div>
                </div>
                <div className="reviews__slider-slide_item">
                  <div className="reviews__slider-slide_item_header">
                    <div className="reviews__slider-slide_item_header-left">
                      <div className="reviews__slider-slide_item_header-left_img-block">
                        <img src="" alt="" />
                      </div>
                      <div className="reviews__slider-slide_item_header-left_title-block">
                        <div className="reviews__slider-slide_item_header-left_title-block_name">
                          Максим Грязев
                        </div>
                        <a href="">Отзыв из Вконтакте</a>
                      </div>
                    </div>
                    <div className="reviews__slider-slide_item_header-stars">
                      <img src="/assets/img/star-review.png" alt="" />
                      <img src="/assets/img/star-review.png" alt="" />
                      <img src="/assets/img/star-review.png" alt="" />
                      <img src="/assets/img/star-review.png" alt="" />
                      <img src="/assets/img/star-review.png" alt="" />
                    </div>
                  </div>
                  <div className="reviews__slider-slide_item_description">
                    Заказывал мышку, шла до МСК 7 дней. Все супер гуд,
                    советую.Отдельный респект филу за то, что отправил мышку на
                    следующий день в 7 утра, хотя заказ оформил в 23 00 по мск.
                  </div>
                </div>
              </div>
              <div className="reviews__slider-slide_one-item">
                <div className="reviews__slider-slide_item">
                  <div className="reviews__slider-slide_item_header">
                    <div className="reviews__slider-slide_item_header-left">
                      <div className="reviews__slider-slide_item_header-left_img-block">
                        <img src="" alt="" />
                      </div>
                      <div className="reviews__slider-slide_item_header-left_title-block">
                        <div className="reviews__slider-slide_item_header-left_title-block_name">
                          Максим Грязев
                        </div>
                        <a href="">Отзыв из Вконтакте</a>
                      </div>
                    </div>
                    <div className="reviews__slider-slide_item_header-stars">
                      <img src="/assets/img/star-review.png" alt="" />
                      <img src="/assets/img/star-review.png" alt="" />
                      <img src="/assets/img/star-review.png" alt="" />
                      <img src="/assets/img/star-review.png" alt="" />
                      <img src="/assets/img/star-review.png" alt="" />
                    </div>
                  </div>
                  <div className="reviews__slider-slide_item_description">
                    Заказывал мышку, шла до МСК 7 дней. Все супер гуд,
                    советую.Отдельный респект филу за то, что отправил мышку на
                    следующий день в 7 утра, хотя заказ оформил в 23 00 по мск.
                  </div>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </section>

      <div className="review__banner">
        <div className="container review__banner__container">
          <div className="review__banner-title">
            Ознакомьтесь с отзывами в наших <br /> в социальных сетях
          </div>
          <div className="review__banner-buttons">
            <a href="" className="review__banner-buttons_link">
              Перейти к отзывам
            </a>
            <div href="" className="review__banner-buttons_item">
              2000+ реальных отзывов
            </div>
          </div>

          <div className="review__banner-decoration s"></div>
          <a href="" className="review__banner-decoration m">
            <img src="/assets/img/tg-decor.png" alt="" />
          </a>
          <a href="" className="review__banner-decoration l">
            <img src="/assets/img/vk-decor.png" alt="" />
          </a>
          <a href="" className="review__banner-decoration xl">
            <img src="/assets/img/discord-decor.png" alt="" />
          </a>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default Home
