import React, { useState } from 'react'
import { Navigation, Thumbs } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

const FullItemSlider = ({ id, image }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null)
  console.log(JSON.parse(image)[0])
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
        {JSON.parse(image).map((image) => (
          <SwiperSlide key={image} className="fullitem__card-slider_big-item">
            <img src={image} alt="" />
          </SwiperSlide>
        ))}
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
        {JSON.parse(image).map((image) => (
          <SwiperSlide key={image} className="fullitem__card-slider_small-item">
            <img src={image} alt="" />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  )
}

export default FullItemSlider
