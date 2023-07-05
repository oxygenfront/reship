import React, { useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs } from 'swiper';
import 'swiper/swiper-bundle.css';

const FullItemSlider = ({ id, image }) => {
  const parsedImage = JSON.parse(image);
  const [currentSlide, setCurrentSlide] = useState(0);
  const swiperRef = useRef(null);

  const handleSlideChange = (swiper) => {
    const currentIndex = swiper.realIndex;
    setCurrentSlide(currentIndex);
  };

  const goToPreviousSlide = () => {
    if (swiperRef.current) {
      const swiperInstance = swiperRef.current.swiper;
      swiperInstance.slidePrev();
      setCurrentSlide(swiperInstance.realIndex);
    }
  };

  const goToNextSlide = () => {
    if (swiperRef.current) {
      console.log(swiperRef.current)
      
      const swiperInstance = swiperRef.current.swiper;
      swiperInstance.slideNext();
      setCurrentSlide(swiperInstance.realIndex);
    }
  };

  return (
    <>
      <div className='fullitem__card-slider_big-wrapper'>
        <img
          src={parsedImage[currentSlide]}
          alt='Большая картинка'
          className='fullitem__card-slider_big-item'
        />
      </div>
      <div className='fullitem__card-slider_small-wrapper_overflow'>
        <Swiper
          className='fullitem__card-slider_small-wrapper'
          modules={[Navigation, Thumbs]}
          slideToClickedSlide
          slidesPerView='auto'
          loop
          spaceBetween={20}
          speed={1000}
          onSlideChange={handleSlideChange}
          ref={swiperRef}
        >
          {parsedImage.map((image, index) => (
            <SwiperSlide
              key={index}
              className='fullitem__card-slider_small-item'
            >
              <img src={image} alt={`Маленькая картинка`} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <button
        onClick={goToPreviousSlide}
        className='fullitem__card-slider_small-wrapper_button-prev'
      ></button>
      <button
        onClick={goToNextSlide}
        className='fullitem__card-slider_small-wrapper_button-next'
      ></button>
    </>
  );
};

export default FullItemSlider;
