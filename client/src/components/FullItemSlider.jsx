import React, { useState } from 'react'
import { Navigation, Thumbs } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

const FullItemSlider = ({ id }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null)
  return (
    <>
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
    </>
  )
}

export default FullItemSlider
